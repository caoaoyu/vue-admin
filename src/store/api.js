import axios from 'axios';
import lodash from 'lodash';
import config from '../util/common';
import md5 from 'md5';

const api = {
    // 登录后台
    login: (state, payload) => {
        payload.pwd = md5(payload);
        return new Promise((resolve, reject) => {
            axios
                .post(`${config.api_path}/login`, payload)
                .then((res) => {
                    resolve(res.data.user);
                })
                .catch(reject);
            return {};
        });
    },
    // 获取用户
    get_member: (state, payload) => {
        return new Promise((resolve, reject) => {
            axios
                .post(`${config.api_path}/getMember`, payload)
                .then((res) => {
                    if (res.data.error) {
                        reject(res.data.error);
                    } else {
                        resolve(res.data.data);
                    }
                })
                .catch(reject);
            return {};
        });
    },
    //添加用户
    AddMember: (state, payload) => {
        payload.pwd = md5(payload.pwd);

        return new Promise((resolve, reject) => {
            axios
                .post(`${config.api_path}/addMember`, payload)
                .then((res) => {
                    if (res.data.error) {
                        reject(res.data.error);
                    } else {
                        resolve(res.data.data);
                    }
                })
                .catch(reject);
            return {};
        });
    },
    //添加用户
    EditMember: (state, payload) => {
        const cond = {
            sex: payload.sex,
            name: payload.name,
            id: payload.id
        };

        console.log(state);
        // return new Promise((resolve, reject) => {
        //     axios
        //         .post(`${config.api_path}/editMember`, cond)
        //         .then((res) => {
        //             if (res.data.error) {
        //                 reject(res.data.error);
        //             } else {
        //                 resolve(res.data.data);
        //             }
        //         })
        //         .catch(reject);
        //     return {};
        // });
    }
};
export default api;
