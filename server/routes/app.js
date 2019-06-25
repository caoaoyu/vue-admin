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
const create_time = Math.round(new Date().getTime() / 1000);

router.all('*', (req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,HEAD,DELETE,OPTIONS,POST,PUT');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
    res.header('Content-Type', 'application/json;charset=utf-8');
    next();
});

router.get('/index', (req, res) => {
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
router.post('/fetchMember', (req, res) => {
    const { id } = req.body;

    if (!id) {
        res.json({ error: true, msg: '缺少传递值' });
        return;
    }

    const statement = `SELECT id,name,phone,sex FROM user WHERE id != ${id} AND status = 1`;

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
    const { name, sex, pwd, phone, uid } = req.body;

    if (!name || !pwd || !phone) {
        res.json({ error: true, msg: '缺少传递值' });
        return;
    }
    const statement = `SELECT * FROM user WHERE phone = ${phone} AND status = 1`;
    const statement_1 = `INSERT INTO user(name, phone, pwd, sex, create_time) VALUES('${name}', '${phone}', '${pwd}', '${sex}', '${create_time}')`;

    async.waterfall(
        [
            (next) => connection.query(statement, (err, result) => next(err, result)),
            (dataA, next) => {
                const user = JSON.parse(JSON.stringify(dataA))[0] || {};
                if (dataA.length > 0 && Object.keys(user).length > 0) {
                    next('账户已经存在');
                    return;
                }
                connection.query(statement_1, (err, result) => next(err, result));
            }
        ],
        function(err, result) {
            if (err) {
                console.log('[ADD MEMBER] - ', err);
                res.json({ error: true, msg: err });
            } else {
                addLogsWithUser(uid, 'add', name);
                res.json({ success: true });
            }
        }
    );
});

// 删除用户
router.post('/removeMember', (req, res) => {
    const { uid, id, name } = req.body;
    if (!uid || !id) {
        return res.json({
            error: true,
            msg: { uid, phone, id }
        });
    }

    const statement = `DELETE FROM user WHERE id = ${id}`;

    connection.query(statement, (err) => {
        if (err) {
            console.log('REMOVE MEMBER - ', err.message);
            res.json({ error: true, msg: '服务器错误' });
        } else {
            addLogsWithUser(uid, 'del', name);
            res.json({ success: true });
        }
    });
});
// 搜索用户
router.post('/searchMember', (req, res) => {
    const { key, uid } = req.body;

    const statement = `SELECT * FROM user WHERE id != '${uid}' AND status = '1' AND phone LIKE '%${key}%'`;

    connection.query(statement, (err, results) => {
        if (err) {
            console.log('REMOVE MEMBER - ', err.message);
            res.json({ error: true, msg: '服务器错误' });
        } else {
            console.log(results);
            res.json({ success: true, data: results });
        }
    });
});
// 编辑用户
router.post('/editMember', (req, res) => {
    const { id, name, sex, uid } = req.body;
    if (!id || !name || !sex || !uid) {
        return res.json({
            error: true,
            msg: { id: '缺少传递值' }
        });
    }

    const statement = `UPDATE user SET name='${name}', sex='${sex}' WHERE id = '${id}'`;

    connection.query(statement, (err, datas) => {
        if (err) {
            console.log('EDIT MEMBER - ', err.message);
            res.json({ error: true, msg: '服务器错误' });
        } else {
            addLogsWithUser(uid, 'edit', id);
            res.json({ success: true });
        }
    });
});

const addLogsWithUser = (id, target, other) => {
    const statement = `SELECT  name as uname, phone FROM user WHERE id = ${id}`;

    if (!target || !id) return '缺少参数';

    async.waterfall(
        [
            (next) => connection.query(statement, (err, result) => next(err, result)),
            (dataA, next) => {
                const obj = JSON.parse(JSON.stringify(dataA))[0];

                Object.keys(obj).length < 1 && next('用户不存在');

                let { uname, phone } = obj;
                console.log(obj);

                let first = `INSERT INTO operation_logs(content, create_time) VALUES ('${uname != '' ? uname : phone}`;
                const statements = {
                    add: `${first} 添加了 ${other}', '${create_time}')`,
                    edit: `${first} 编辑了 ${other}', '${create_time}')`,
                    del: `${first}  删除了 ${other}', '${create_time}')`
                };

                if (!statements[target]) {
                    next(`缺少事件${target}`);
                } else {
                    connection.query(statements[target], next);
                }
            }
        ],
        function(err, dataA, dataB) {
            if (err) {
                console.log(err);
            } else {
            }
        }
    );
};

module.exports = router;
