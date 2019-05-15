import api from './api';
import cookie from 'vue-cookies';
import router from '../router';

const APP = {
    state: {
        user: {}
    },
    actions: {
        show_loading({ commit, state }) {
            commit('show_loading');
        },
        hide_loading({ commit, state }) {
            commit('hide_loading');
        },
        layout({ commit, state }) {
            commit('layout');
        },
        login({ commit, state }, payload) {
            commit('show_loading');
            api
                .login(state, payload)
                .then((user) => {
                    commit('login_success', user);
                    commit('hide_loading');
                })
                .catch((error) => {
                    commit('hide_loading');
                    commit('show_toast');
                });
        }
    },
    mutations: {
        login_success(state, user) {
            state.user = user;
            cookie.set('name', user.phone);
            cookie.set('pwd', user.pwd);
            console.log(router)
            router.push('/home');
        },
        layout(state) {
            console.log('登出');
        },
        login(state) {
            console.log('登陆');
        },
        show_loading(state) {
            state.loading = true;
            console.log('show');
        },
        hide_loading(state) {
            state.loading = false;
            console.log('hide');
        },
        show_toast(state) {
            state.toast = true;
            console.log('show');
        },
        hide_toast(state) {
            state.toast = false;
            console.log('hide');
        }
    }
};

export default APP;
