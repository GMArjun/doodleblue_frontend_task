import Vue from 'vue'
import Vuelidate from 'vuelidate'
import App from './App.vue'
import { library } from "@fortawesome/fontawesome-svg-core";
import { faStar, faBan, faThumbsUp } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import "./assets/css/tailwind.css";
import "./assets/scss/products.scss";
library.add(faStar, faBan, faThumbsUp);
Vue.component("font-awesome-icon", FontAwesomeIcon);
Vue.use(Vuelidate)
Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')
