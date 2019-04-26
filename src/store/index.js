import Vue from 'vue';
import Vuex from 'vuex';
import user from './modules/user';
import app from './app';
// import createLogger from 'logger';

Vue.use(Vuex);

const debug = process.env.NODE_ENV !== 'production';

export default new Vuex.Store({
    modules: {
        app,
        user
    },
    strict: debug
    // plugins: debug ? [ createLogger() ] : []
});
