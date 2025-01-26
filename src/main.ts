import { createApp } from 'vue'
import { createPinia } from 'pinia'

import router from './router'

import 'ant-design-vue/dist/reset.css'
import './style.css'

import App from './App.vue'
import { VMdEditor, VMdPreview } from './config/MarkdownConfig'

const app = createApp(App)
app.use(createPinia())
  .use(router)
  .use(VMdEditor)
  .use(VMdPreview)
app.directive('draggable', Drag)
app
  .mount('#app')


// just for test
import * as test from './services/tests/index'
import Drag from './directives/drag'
test