const router = require('express').Router();
const mysql = require('mysql');
const async = require('async');
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'user',
    password: '111111',
    database: 'admin',
    port: 3308
});

router.all('*', (req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,HEAD,DELETE,OPTIONS,POST,PUT');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
    res.header('Content-Type', 'application/json;charset=utf-8');
    next();
});

router.get('/index', (req, res) => {
    console.log('--------------');
    return res.json({ name: 1 });
});
// 用户登陆
router.post('/login', (req, res) => {
    const { name, pwd } = req.body;
    const statement = `SELECT * FROM user WHERE phone='${name}' AND pwd='${pwd}' AND state = 1`;

    connection.query(statement, (err, result) => {
        if (err || result.length < 1) {
            res.json({ error: true, msg: '账户或者密码错误' });
        } else {
            res.json({
                success: true,
                user: result[0]
            });
        }
    });
});

// 获取用户
router.post('/getMember', (req, res) => {
    const { phone } = req.body;

    if (!phone) {
        res.json({ error: true, msg: '缺少传递值' });
        return;
    }

    const statement = `SELECT * FROM user WHERE phone != ${phone}`;

    connection.query(statement, (err, result) => {
        if (err) {
            console.log('[ADD MEMBER] - ', err.message);
            res.json({ error: true, msg: '服务器错误' });
        } else {
            res.json({ success: true, data: result });
        }
    });
});
// 添加用户
router.post('/addMember', (req, res) => {
    const { name, sex, phone, pwd, create_time } = req.body;

    if (!name || !phone || !pwd) {
        res.json({ error: true, msg: '缺少传递值' });
        return;
    }
    const statement = `SELECT * FROM user WHERE phone = ${phone}`;
    const statement_1 = `INSERT IGNORE INTO user(name,phone,pwd, sex, create_time) VALUES('${name}', '${phone}', '${pwd}', '${sex}', '${create_time}')`;
    const statement_2 = `INSERT INTO operation_logs(content, create_time) VALUES ('${phone} 添加了 ${phone}', '${create_time}')`;

    async.waterfall(
        [
            (next) => {
                connection.query(statement, (err, data) => {
                    console.log(data);
                    next(err, data);
                });
            },
            (dataA, next) => {
                var user = JSON.parse(JSON.stringify(dataA))[0] || {};
                if (dataA.length > 0 && Object.keys(user).length > 0) {
                    console.log('dataA------', dataA);
                    next('账户已经存在');
                    return;
                }
                connection.query(statement_1, next);
            },
            (dataA, dataB, next) => {
                console.log('dataB', dataB);
                connection.query(statement_2, next);
            }
        ],
        function(err, result) {
            if (err) {
                console.log('[ADD MEMBER] - ', err);
                res.json({ error: true, msg: err });
            } else {
                res.json({ success: true });
            }
        }
    );
});

// 删除用户
router.post('/removeMember', (req, res) => {
    const { uid, phone } = req.body;
    if (!uid) {
        return res.json({
            error: true,
            msg: { uid: '缺少传递值' }
        });
    }

    const statement = `UPDATE user SET state = 2 WHERE id = ${uid}`;

    connection.query(statement, (err) => {
        if (err) {
            console.log('REMOVE MEMBER - ', err.message);
            res.json({ error: true, msg: '服务器错误' });
        } else {
            res.json({ success: true });
        }
    });

    const statement_1 = `INSERT INFO operation_logs(content) VALUES (${phone} 删除了 ${phone})`;

    connection.query(statement_1, (err) => {
        err && console.log('INSERT LOGS - ', err.message);
    });
});

// // 注册用户
// router.post('/registered', (req, res) => {
//     const { account, password, sex, time } = req.body;
//     const uid = md5(account, password, time);
//     const s1 = `INSERT INTO user(name, account, password, sex, createTime, uid)
//     VALUES('${account}', '${account}', '${password}', ${sex}, ${time}, '${uid}')`;
//     const s2 = `SELECT * FROM user WHERE account = '${account}'`;
//     connection.query(s2, (err, info) => {
//         if (info) {
//             res.json({ error: true, msg: '账号已经存在' });
//         } else {
//             connection.query(s1, (err) => {
//                 err ? res.json({ error: true, msg: '服务器错误' }) : res.json({ success: true });
//                 if (err) console.log('[INSERT ERROR] - ', err.message);
//             });
//         }
//     });
// });
// // 获取留言数据
// router.get('/get', (req, res) => {
//     const { page, type, find_context } = req.query;
//     var start = (page - 1) * 7;
//     const d1 = type == 0 ? '' : `where message.state=${type}`;
//     const d2 = find_context ? `${type == 0 ? 'where' : 'and'} context like "%${find_context}%"` : '';
//     const p1 = new Promise((resolve, reject) => {
//         const v = `select * from message left join user on (message.uid = user.uid) ${d1} ${d2} order by id desc limit ${start},7`;
//         connection.query(v, (err, result) => (err ? reject(err) : resolve(result)));
//     });
//     const p2 = new Promise((resolve, reject) => {
//         const v = `SELECT COUNT(*) AS total from message left join user on (message.uid = user.uid) ${d1} ${d2}`;
//         connection.query(v, (err, result) => (err ? reject(err) : resolve(result)));
//     });

//     Promise.all([ p1, p2 ])
//         .then((vul) => {
//             const comments = vul[0];
//             const total = vul[1];
//             comments.forEach((e) => (e.reply = JSON.parse(e.reply)));
//             res.json({
//                 comments,
//                 pages_max: Math.ceil(JSON.parse(JSON.stringify(total))[0].total / 7)
//             });
//         })
//         .catch((e) => {
//             res.json({
//                 error: true,
//                 errmsg: error
//             });
//         });
// });

// router.post('/update', (req, res) => {
//     if (!req.body.context) res.json({ error: true, msg: '缺少留言' });
//     const update = `UPDATE message SET context='${req.body.context}' WHERE id =${req.body.id}`;
//     connection.query(update, (err) => {
//         err ? res.json({ error: true, msg: '更新留言失败' }) : res.json({ success: true });
//         if (err) console.log('update ERROR] - ', err.message);
//     });
// });
// router.post('/reply', (req, res) => {
//     if (!req.body.reply) res.json({ error: '缺少 context' });
//     const update = `UPDATE message SET reply='${req.body.reply}' WHERE id =${req.body.id}`;
//     connection.query(update, (err) => {
//         err ? res.json({ error: true, msg: '回复留言失败' }) : res.json({ success: true });
//         if (err) console.log('update ERROR] - ', err.message);
//     });
// });

// router.post('/add', (req, res) => {
//     const { state, context, create_time, id } = req.body;
//     if (!state || !context || !create_time) return res.json({ error: true, msg: '缺少传递值' });
//     if (!id) return res.json({ error: true, msg: '缺少用户信息' });

//     const addSql = `INSERT INTO message(state,context,create_time, uid, reply) VALUES(${state}, '${context}', ${create_time}, '${id}', [])`;
//     connection.query(addSql, (err) => {
//         err ? res.json({ error: true, msg: '服务器错误' }) : res.json({ success: true });
//         if (err) console.log('[INSERT ERROR] - ', err.message);
//     });
// });

// router.post('/find', (req, res) => {
//     const { find_context } = req.body;
//     if (!find_context) return res.json({ error: true, msg: '缺少传递值' });
//     const findSql1 = `SELECT * FROM message WHERE context REGEXP '${find_context}' AND state=${req.body.type || 1}`;
//     const findSql2 = `SELECT COUNT(*) AS total FROM message WHERE context REGEXP '${find_context}' AND state=${req.body.type || 1}`;

//     const f1 = new Promise((resolve, reject) => {
//         connection.query(findSql1, (error, result) => {
//             error ? reject(error) : resolve(result);
//         });
//     });
//     const f2 = new Promise((resolve, reject) => {
//         connection.query(findSql2, (error, result) => {
//             error ? reject(error) : resolve(result);
//         });
//     });

//     Promise.all([ f1, f2 ])
//         .then((result) => {
//             const comments = result[0];
//             const total = result[1];
//             comments.map((e) => (e.reply = JSON.parse(e.reply)));
//             res.json({
//                 comments,
//                 pages_max: Math.ceil(JSON.parse(JSON.stringify(total))[0].total / 7)
//             });
//         })
//         .catch((error) => {
//             throw new Error(error);
//         });
// });

// router.delete('/delete', (req, res) => {
//     const update = `UPDATE message SET state=2 WHERE id =${req.body.id}`;
//     connection.query(update, function(err, result) {
//         err ? res.json({ error: true, msg: '删除留言失败' }) : res.json({ success: true });
//         if (err) console.log('update ERROR] - ', err.message);
//     });
// });

module.exports = router;
