import { createApp } from 'vue'
import { createPinia } from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'

import router from './router'

import 'ant-design-vue/dist/reset.css'
import './style.css'

import App from './App.vue'
import { VMdEditor, VMdPreview } from './config/MarkdownConfig'

const pinia = createPinia()
pinia.use(piniaPluginPersistedstate)

const app = createApp(App)
app.use(pinia)
    .use(router)
    .use(VMdEditor)
    .use(VMdPreview)
    .directive('draggable', Drag)
    .mount('#app')


// just for test
import * as test from './services/tests/index'
import Drag from './directives/drag'
test