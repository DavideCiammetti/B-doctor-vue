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
import { faHouse, faCircleInfo } from "@fortawesome/free-solid-svg-icons";
library.add(faHouse, faCircleInfo)

createApp(App).component("font-awesome-icon", FontAwesomeIcon).use(router).mount('#app')
