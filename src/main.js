import { createApp } from "vue";
// scss
import "./style/style.scss";
// bootstrap
import * as bootstrap from "bootstrap";
// axios
import axios from "axios";
// router
import { router } from "./router";
import App from "./App.vue";
// importazione icon components
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
// importazione libreria fontawesome
import { library } from "@fortawesome/fontawesome-svg-core";

// icone
// different style
import { faStar as farFaStar } from "@fortawesome/free-regular-svg-icons";
// regular
import {
  faCircleQuestion,
  faUser,
  faFileLines,
} from "@fortawesome/free-regular-svg-icons";
// solid
import {
  faHouse,
  faBars,
  faMagnifyingGlass,
  faShieldHalved,
  faCircleInfo,
  faLocationDot,
  faStethoscope,
  faArrowRightToBracket,
  faAddressCard,
  faStar,
} from "@fortawesome/free-solid-svg-icons";
library.add(
  faHouse,
  faBars,
  faMagnifyingGlass,
  faCircleQuestion,
  faUser,
  faCircleInfo,
  faLocationDot,
  faStethoscope,
  faStar,
  farFaStar,
  faFileLines,
  faArrowRightToBracket,
  faAddressCard,
  faShieldHalved
);

createApp(App)
  .component("font-awesome-icon", FontAwesomeIcon)
  .use(router)
  .mount("#app");
