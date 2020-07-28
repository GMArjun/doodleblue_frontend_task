import Vue from 'vue'
import App from './App.vue'
import "./assets/css/tailwind.css";
import "./assets/scss/products.scss";

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')
