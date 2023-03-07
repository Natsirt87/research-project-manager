import { createApp } from "vue";
import App from "./App.vue";
import './index.css';
import router from "./router";
import { createVuestic } from 'vuestic-ui'
import 'vuestic-ui/styles/essential.css';
import "material-design-icons-iconfont/dist/material-design-icons.min.css";

const app = createApp(App);

app.use(router);


app.use(createVuestic());
app.mount("#app");
