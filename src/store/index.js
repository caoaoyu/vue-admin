import Vue from 'vue';
import Vuex from 'vuex';
import app from './app';
import member from './modules/member';
// import createLogger from 'logger';

Vue.use(Vuex);

const debug = process.env.NODE_ENV !== 'production';

export default new Vuex.Store({
    modules: {
        app,
        member
    },
    strict: debug
    // plugins: debug ? [ createLogger() ] : []
});
