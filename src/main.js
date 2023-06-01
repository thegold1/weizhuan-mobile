import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import store from "@/store/index.js";
import '@/assets/styles/index.scss';
import 'vant/es/toast/style';
import 'vant/es/dialog/style';
// import './permission';
import { useRemSize } from "@/hooks";
// 注册指令
import plugins from './plugins' // plugins

useRemSize();
window.onresize = function() {
    useRemSize();
}

const app = createApp(App);

app.use(router);

app.use(store);

app.use(plugins);

app.mount('#app');
