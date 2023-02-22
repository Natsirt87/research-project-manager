import { createApp } from "vue";
import App from "./App.vue";
import './index.css';
import router from "./router";

const app = createApp(App);

app.use(router);

const meta = document.createElement("meta");
meta.name = "naive-ui-style";
document.head.appendChild(meta);

app.mount("#app");
