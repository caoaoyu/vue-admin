import axios from 'axios';
import lodash from 'lodash';
import config from '../util/common';
import md5 from 'md5';

const api = {
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
    }
};
export default api;
