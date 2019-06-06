import Vue from 'vue';
import Router from 'vue-router';
import Login from './views/Login.vue';
import Home from './views/Home.vue';
import Logs from './views/Logs.vue';
import Pages from './views/Pages.vue';
import store from './store/index';

Vue.use(Router);

const router = new Router({
    routes: [
        {
            path: '/home',
            name: 'home',
            component: Home
        },
        {
            path: '/login',
            name: 'login',
            component: Login
        },
        {
            path: '/logs',
            name: 'logs',
            component: Logs
        },
        {
            path: '/pages',
            name: 'pages',
            component: Pages
        }
        // {
        //     path: '/about',
        //     name: 'about',
        //     // route level code-splitting
        //     // this generates a separate chunk (about.[hash].js) for this route
        //     // which is lazy-loaded when the route is visited.
        //     component: () => import(/* webpackChunkName: "about" */ './views/About.vue')
        // }
    ]
});

router.beforeEach(function(to, from, next) {
    const user = JSON.parse(localStorage.getItem('user'));
    // 未登录
    if (to.name != 'login' && !user) {
        router.push({ name: 'login' });
    }

    // 已登录的情况再去登录页，跳转至首页
    if (to.name == 'login' && user) {
        store.commit('set_user', user);
        router.push({ name: 'home' });
    }

    if (user) {
        store.commit('set_user', user);
    }

    next();
    // console.log(store, user);
    // if (!store.state.user.pwd) {
    //     store.dispatch('login', { name, pwd });
    // } else {
    //     next();
    // }
});

export default router;
