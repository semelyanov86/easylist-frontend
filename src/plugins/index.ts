/**
 * plugins/index.ts
 *
 * Automatically included in `./src/main.ts`
 */

// Plugins
import { loadFonts } from './webfontloader'
import vuetify from './vuetify'
import pinia from '../store'
import VueCookies from 'vue-cookies'
import router from '../router'

// Types
import type { App } from 'vue'

export function registerPlugins(app: App) {
    loadFonts()
    app.use(VueCookies, { expires: '7d' }).use(pinia).use(vuetify).use(router)
}
