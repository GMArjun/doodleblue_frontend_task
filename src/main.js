import Vue from 'vue'
import Vuelidate from 'vuelidate'
import App from './App.vue'
import { library } from "@fortawesome/fontawesome-svg-core";
import { faStar, faBan, faThumbsUp, faChevronDown } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import VuePaginate from 'vue-paginate'
import "./assets/css/tailwind.css";
import "./assets/scss/products.scss";
library.add(faStar, faBan, faThumbsUp, faChevronDown);
Vue.component("font-awesome-icon", FontAwesomeIcon);
Vue.use(Vuelidate);
Vue.use(VuePaginate);
Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')
