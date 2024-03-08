import { createApp } from 'vue'
// scss
import './style/style.scss'
// bootstrap
import * as bootstrap from 'bootstrap'
// axios
import axios from 'axios'
// router
import { router } from './router'
import App from './App.vue'
// importazione icon components
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
// importazione libreria fontawesome
import { library } from "@fortawesome/fontawesome-svg-core";

// icone
// regular 
import { faCircleQuestion, faUser, faStar, faFileLines } from "@fortawesome/free-regular-svg-icons";
// solid 
import { faHouse, faBars, faMagnifyingGlass, faCircleInfo, faLocationDot, faStethoscope } from "@fortawesome/free-solid-svg-icons";
library.add(faHouse, faBars, faMagnifyingGlass, faCircleQuestion, faUser, faCircleInfo, faLocationDot, faStethoscope, faStar, faFileLines)

createApp(App).component("font-awesome-icon", FontAwesomeIcon).use(router).mount('#app')
