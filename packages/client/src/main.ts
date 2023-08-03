import { createApp } from "vue";
import App from "./App.vue";
import { useRouter } from "@/router";
import { useStore } from "@/store";
import { useElementPlus } from "@/lib/elementPlus";
import emUI from "@/components";
import { userDirective } from "@/directive";
import icons from "@/icons";
import "@/styles/base.scss";
import "virtual:svg-icons-register";

const app = createApp(App);

useRouter(app);
useElementPlus(app);
useStore(app);
userDirective(app);
app.use(emUI);
app.use(icons);
app.mount("#app");
