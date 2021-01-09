import { createApp } from "vue";
import App from "./App.vue";
import store from "./store";
import "./assets/css/main.css";
const app = createApp(App);
app.config.productionTip = true;
app.config.devtools = true;
app.use(store);
app.mount("#app");
