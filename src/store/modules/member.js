import api from '../api';

const APP = {
    state: {
        data: {}
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
        }
    },
    mutations: {
        set_member(state, data) {
            state.data = data;
        }
    }
};

export default APP;
