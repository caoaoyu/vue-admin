import Vue from 'vue';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue/dist/bootstrap-vue.css';
import BootstrapVue from 'bootstrap-vue';
import App from './App.vue';
import router from './router';
import store from './store/index';
import cookie from 'vue-cookies';

Vue.use(BootstrapVue);

Vue.config.productionTip = false;
new Vue({
    router,
    store,
    //监听路由检查登录
    watch: {
        $route: 'checkLogin'
    },
    created() {
        this.checkLogin();
    },
    methods: {
        checkLogin() {
            const name = cookie.get('name');
            console.log(name, '--------')
            if (name) {
                // this.$router.push('home');
            } else {
                this.$router.push('login');
            }
        }
    },
    render: (h) => h(App)
}).$mount('#app');