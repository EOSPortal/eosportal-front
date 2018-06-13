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
import cn from './i18n/cn_CN.json'
import de from './i18n/de_DE.json'
import kr from './i18n/kr_KOR.json'
import no from './i18n/no_NO.json'
import se from './i18n/se_SE.json'
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
    },
    cn: {
      lang: cn
    },
    de: {
      lang: de
    },
    kr: {
      lang: kr
    },
    no: {
      lang: no
    },
    se: {
      lang: se
    }
  }
})
