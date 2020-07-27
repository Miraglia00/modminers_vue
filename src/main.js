import '@babel/polyfill'
import 'mutationobserver-shim'
import Vue from 'vue'
import './plugins/axios'
import { BootstrapVue, IconsPlugin, ModalPlugin } from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import 'bootswatch/dist/darkly/bootstrap.min.css';
import App from './App.vue'
import router from './router'
import store from './store/index';
import cookies from 'vue-cookies'
import vuescroll from 'vuescroll';

Vue.config.productionTip = false

Vue.use(BootstrapVue)
Vue.use(IconsPlugin)
Vue.use(ModalPlugin)
Vue.use(cookies)

Vue.use(vuescroll, {ops: {
}
});

cookies.config('12h')

new Vue({
  router,
  store: store,
  render: h => h(App)
}).$mount('#app')
