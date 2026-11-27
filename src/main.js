import { createApp } from "vue";
import App from "./App.vue";
import disclosureMotion from "./directives/disclosureMotion";
import "./scss/global.scss";

createApp(App)
	.directive("disclosure-motion", disclosureMotion)
	.mount("#app");
