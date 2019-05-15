import Vue from 'vue';
import Router from 'vue-router';
import Login from './views/Login.vue';
import Home from './views/Home.vue';
import Menu from './components/menu.vue';
import cookie from 'vue-cookies';

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
    const name = cookie.get('name');
    // 未登录
    if (to.name != 'login' && !name) {
        router.push({ name: 'login' });
        next({ path: '/login' });
        // 已登录的情况再去登录页，跳转至首页
    } else if (to.name === 'login' && name) {
        // next({ path: '/home' });
        next();
    } else {
        next();
    }
});

export default router;
