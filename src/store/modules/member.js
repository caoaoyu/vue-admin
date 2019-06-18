import api from '../api';
import router from '../../router';

const APP = {
    state: {
        data: []
    },
    actions: {
        get_member({ commit, state }, payload) {
            commit('show_loading', null, { root: true });
            api
                .get_member(state, payload)
                .then((data) => {
                    commit('set_member', data);
                    commit('hide_loading', null, { root: true });
                })
                .catch((error) => {
                    commit('hide_loading', error);
                });
        },
        add_member({ commit, state }, payload) {
            commit('show_loading', null, { root: true });
            api
                .AddMember(state, payload)
                .then((data) => {
                    commit('add_member_success', data);
                    commit('hide_loading', null, { root: true });
                })
                .catch((error) => {
                    commit('hide_loading', error);
                });
        },
        edit_member({ commit, state }, payload) {
            commit('show_loading', null, { root: true });
            api
                .EditMember(state, payload)
                .then((data) => {
                    dispatch('get_member');
                    commit('hide_loading', null, { root: true });
                })
                .catch((error) => {
                    commit('hide_loading', error);
                });
        }
    },
    mutations: {
        set_member(state, data) {
            state.data = data;
        },
        add_member_success(state, data) {
            router.push('/home');
        }
    }
};

export default APP;
