import { name, version } from '../../package.json'
import plugin from './plugin'
import lang from './modules/lang'
import formsModule from './store/forms'
import VueTheMask from 'vue-the-mask'
import VueShortkey from 'vue-shortkey'

const awemaPlugin = {

    name, version,

    install(AWEMA) {
        Vue.use(VueShortkey)
        Vue.use(VueTheMask)
        Vue.use(plugin)
        AWEMA._store.registerModule('forms', formsModule)
        AWEMA.lang = lang
    }
}

if (window && ('AWEMA' in window)) {
    AWEMA.use(awemaPlugin)
} else {
    window.__awema_plugins_stack__ = window.__awema_plugins_stack__ || []
    window.__awema_plugins_stack__.push(awemaPlugin)
}
