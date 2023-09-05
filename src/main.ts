import { createSSRApp } from 'vue';
import '@vingogo/uni-ui/lib/style.css';
import App from './App.vue';
import { createPinia } from 'pinia';

// 1.导入Vant组件，这里的‘vant’就是我们上面新导入的vant的目录

const store = createPinia();

export function createApp() {
    const app = createSSRApp(App);
    app.use(store);
    return {
        app,
    };
}
