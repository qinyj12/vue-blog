import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import animate from 'animate.css'
import mavonEditor from 'mavon-editor'
import 'mavon-editor/dist/css/index.css'
import vuescroll from 'vuescroll'
import axios from 'axios'
import VueAxios from 'vue-axios'

Vue.config.productionTip = false;
Vue.use(ElementUI);
Vue.use(animate);
Vue.use(mavonEditor)
Vue.use(vuescroll)
Vue.prototype.$vuescrollConfig = {
  bar: {
    background: 'seagreen',
    onlyShowBarOnScroll: true,
    keepShow: true,
  },
  rail: {
     gutterOfSide: '2px',
    keepShow: true
  }
};
Vue.use(VueAxios, axios)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
