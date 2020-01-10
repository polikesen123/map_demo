import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import 'mapbox-gl/dist/mapbox-gl.css'


import mapBoxGl from 'mapbox-gl'
Vue.prototype.mbgl = mapBoxGl

import Vue2MapboxGL from 'vue2mapbox-gl';
 
// You might want to import the relevant css, for example:
import 'mapbox-gl/dist/mapbox-gl.css';
// for the v-mapbox-geocoder
import '@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css';
 
// Use the plugin
Vue.use(Vue2MapboxGL);

import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI);

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
