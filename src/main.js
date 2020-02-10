import Vue from 'vue'
import App from './App'
import ElementUI from 'element-ui'
import router from './router'
import AxiosInstance from "./utils/axios-utils";
import 'element-ui/lib/theme-chalk/index.css'

Vue.config.productionTip = false
Vue.prototype.$axios = AxiosInstance;
Vue.use(ElementUI);
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  render: h => h(App)
})
