import { createApp } from 'vue'
import TDesign from 'tdesign-vue-next';
import App from './App.vue'
import ROSLIB from 'roslib';

// 全局插件
const GlobalPlugin = {
    install(app) {
        app.config.globalProperties.$ros = new ROSLIB.Ros({
            url: 'ws://localhost:9090'
        });
    }
};


createApp(App)
    .use(TDesign)
    .use(GlobalPlugin)
    .mount('#app')

