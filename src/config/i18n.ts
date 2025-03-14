import { createI18n } from 'vue-i18n';
import en from '../assets/locals/en.json'
import zh from '../assets/locals/zh.json'


const i18n = createI18n({
  locale: 'zh',
  fallbackLocale: 'en',
  messages: {
    en,
    zh
  }
});

export default i18n
