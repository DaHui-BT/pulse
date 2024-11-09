import { createApp } from 'vue'

import router from './router'

import 'ant-design-vue/dist/reset.css'
import './style.css'

import App from './App.vue'

import VueMarkdownEditor from '@kangc/v-md-editor'
import VMdPreview from '@kangc/v-md-editor/lib/preview'
import '@kangc/v-md-editor/lib/style/base-editor.css'
import vuepressTheme from '@kangc/v-md-editor/lib/theme/vuepress.js'
import githubTheme from '@kangc/v-md-editor/lib/theme/github.js'
import '@kangc/v-md-editor/lib/theme/style/github.css'
// mode
import 'codemirror/mode/markdown/markdown'
import 'codemirror/mode/javascript/javascript'
import 'codemirror/mode/css/css'
import 'codemirror/mode/htmlmixed/htmlmixed'
import 'codemirror/mode/vue/vue'
// edit
import 'codemirror/addon/edit/closebrackets'
import 'codemirror/addon/edit/closetag'
import 'codemirror/addon/edit/matchbrackets'
// placeholder
import 'codemirror/addon/display/placeholder'
// active-line
import 'codemirror/addon/selection/active-line'
// scrollbar
import 'codemirror/addon/scroll/simplescrollbars'
import 'codemirror/addon/scroll/simplescrollbars.css'
// style
import 'codemirror/lib/codemirror.css'

// highlightjs
import hljs from 'highlight.js'

// code highlight line
import createHighlightLinesPlugin from '@kangc/v-md-editor/lib/plugins/highlight-lines/index'
import '@kangc/v-md-editor/lib/plugins/highlight-lines/highlight-lines.css'

// emoji plugin
import createEmojiPlugin from '@kangc/v-md-editor/lib/plugins/emoji/index'
import '@kangc/v-md-editor/lib/plugins/emoji/emoji.css'

VueMarkdownEditor.use(vuepressTheme)
VueMarkdownEditor.use(createEmojiPlugin())
VueMarkdownEditor.use(createHighlightLinesPlugin())
VMdPreview.use(githubTheme, {
  Hljs: hljs,
})


createApp(App)
  .use(router)
  .use(VueMarkdownEditor)
  .use(VMdPreview)
  .mount('#app')


// just for test
import * as test from './services/tests/index'
test