import Vue from 'vue'
import './plugins/axios'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify';
import './plugins/element.js'
import qs from 'qs';
import AppProp from './plugins/properties.js';

Vue.prototype.$qs = qs;
Vue.prototype.$appProp = AppProp;
Vue.config.productionTip = false

new Vue({
    router,
    store,
    vuetify,
    render: h => h(App)
}).$mount('#app')
