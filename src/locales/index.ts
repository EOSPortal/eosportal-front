/**
 * Import Dependency
 */

import Vue from 'vue'
import VueI18n from 'vue-i18n'
/**
 * Import Language
 */
import en from './i18n/en_US.json'
import es from './i18n/es_ES.json'

/**
 * Config
 */
Vue.use(VueI18n)

/**
 * Export
 */
export default new VueI18n({
  locale: 'en',
  messages: {
    en: {
      lang: en
    },
    es: {
      lang: es
    }
  }
})