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
                    commit('set_user', user);
                    commit('hide_loading');
                })
                .catch((error) => {
                    commit('hide_loading', error);
                    commit('login_error', error);
                });
        }
    },
    mutations: {
        set_user(state, user) {
            console.log('set_user', state, user);
            state.user = user;
            cookie.set('name', user.phone);
            cookie.set('pwd', user.pwd);
            localStorage.setItem('user', JSON.stringify(user));
        },
        login_success() {
            router.push('/home');
        },
        login_error() {
            store.commit('show_toast', '请重新登录');
            router.push('/login');
        },
        layout(state) {
            console.log('登出');
            localStorage.clear();
            router.push('/login');
            state.user = {};
        },
        login(state) {
            console.log('登陆');
        },
        show_loading(state) {
            state.loading = true;
            console.log('show_loading');
        },
        hide_loading(state, error) {
            state.loading = false;
            console.log('hide_loading', error);
        },
        show_toast(state) {
            state.toast = true;
            console.log('show_toast');
        },
        hide_toast(state) {
            state.toast = false;
            console.log('hide_toast');
        }
    }
};

export default APP;
