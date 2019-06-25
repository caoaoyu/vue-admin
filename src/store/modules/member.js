import api from '../api';
import router from '../../router';
import store from '../../store/index';

const APP = {
    state: {
        data: []
    },
    actions: {
        get_member({ commit, state }, payload) {
            commit('show_loading', null, { root: true });
            return new Promise((resolve, reject) => {
                api
                    .FetchMember(state, payload)
                    .then((data) => {
                        commit('set_member', data);
                        commit('hide_loading', null, { root: true });
                        resolve();
                    })
                    .catch((error) => {
                        reject();
                        commit('hide_loading', error);
                    });
            });
        },
        add_member({ commit, state }, payload) {
            commit('show_loading', null, { root: true });
            return new Promise((resolve, reject) => {
                api
                    .AddMember(state, payload)
                    .then(() => {
                        commit('hide_loading', null, { root: true });
                        resolve();
                    })
                    .catch((error) => {
                        reject(error);
                        console.log(error);
                        commit('hide_loading', error);
                    });
            });
        },
        edit_member({ commit, state }, payload) {
            commit('show_loading', null, { root: true });
            api
                .EditMember(state, payload)
                .then((data) => {
                    store.dispatch('get_member', { id: payload.uid });
                })
                .catch((error) => {
                    commit('hide_loading', error);
                });
        },
        search_member({ commit, state }, payload) {
            commit('show_loading', null, { root: true });
            return new Promise((resolve, reject) => {
                api
                    .SearchMember(state, payload)
                    .then((data) => {
                        commit('set_member', data);
                        commit('hide_loading');
                        resolve();
                    })
                    .catch((error) => {
                        reject(error);
                        commit('hide_loading', error);
                    });
            });
        },
        remove_member({ commit, state }, payload) {
            commit('show_loading', null, { root: true });
            api
                .RemoveMember(state, payload)
                .then((data) => {
                    store.dispatch('get_member', { id: payload.uid });
                })
                .catch((error) => {
                    commit('hide_loading', error);
                });
        }
    },
    mutations: {
        set_member(state, data) {
            state.data = data;
        }
    }
};

export default APP;
