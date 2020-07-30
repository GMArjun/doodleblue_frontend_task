import Vue from 'vue'
import Vuelidate from 'vuelidate'
import App from './App.vue'
import { library } from "@fortawesome/fontawesome-svg-core";
import { faStar, faBan, faThumbsUp, faChevronDown, faBars } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import VuePaginate from 'vue-paginate'
import VueSidebarUi from 'vue-sidebar-ui';
import VueResize from 'vue-resize'
import 'vue-resize/dist/vue-resize.css'
import 'vue-sidebar-ui/dist/vue-sidebar-ui.css';
import "./assets/css/tailwind.css";
import "./assets/scss/products.scss";
library.add(faStar, faBan, faThumbsUp, faChevronDown,faBars);
Vue.component("font-awesome-icon", FontAwesomeIcon);
Vue.component('VueSidebarUi', VueSidebarUi);
Vue.use(VueResize)
Vue.use(Vuelidate);
Vue.use(VuePaginate);
Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')
