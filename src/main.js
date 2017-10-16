// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import Mint from 'mint-ui';
import 'mint-ui/lib/style.css';
import ElementUI from 'element-ui'
import '../theme/index.css'
import {post,fetch,patch,put} from './util/http'
import axios from 'axios'
import {getCookie,setCookie,delCookie} from './util/util'
import { InfiniteScroll } from 'mint-ui';
Vue.use(InfiniteScroll);

Vue.config.productionTip = false
Vue.use(Mint);
Vue.use(ElementUI);

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})
