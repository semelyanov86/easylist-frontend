import i18n from '@/i18n'
import { inject, nextTick } from 'vue'
import LanguageInterface from '@/types/LanguageInterface'
import { NavigationGuardNext, RouteLocationNormalized } from 'vue-router'
import { VueCookies } from 'vue-cookies'
import { app } from '@/main.js'

const Trans = {
    get defaultLocale(): string {
        return import.meta.env.VITE_DEFAULT_LOCALE
    },

    get supportedLocales(): LanguageInterface[] {
        return [
            { title: 'English', value: 'en' },
            { title: 'Russian', value: 'ru' },
            { title: 'German', value: 'de' },
        ]
    },

    get currentLocale(): string {
        return i18n.global.locale.value
    },

    set currentLocale(newLocale: string) {
        i18n.global.locale.value = newLocale
    },

    async switchLanguage(newLocale: string) {
        await Trans.loadLocaleMessages(newLocale)
        Trans.currentLocale = newLocale
        localStorage.setItem('_locale', newLocale)
        app.config.globalProperties.$cookies?.set(
            '_locale',
            newLocale,
            '180d',
            '/',
            undefined,
            false
        )
    },

    async loadLocaleMessages(locale: string) {
        if (!i18n.global.availableLocales.includes(locale)) {
            const messages = await import(`@/i18n/locales/${locale}.json`)
            i18n.global.setLocaleMessage(locale, messages.default)
        }

        return nextTick()
    },

    isLocaleSupported(locale: string): boolean {
        return (
            Trans.supportedLocales.find(
                (lang: LanguageInterface) => lang.value == locale
            ) != undefined
        )
    },

    getUserLocale() {
        const locale = window.navigator.language || Trans.defaultLocale

        return {
            locale: locale,
            localeNoRegion: locale.split('-')[0],
        }
    },

    getPersistedLocale() {
        const persistedLocale = localStorage.getItem('_locale')

        if (persistedLocale && Trans.isLocaleSupported(persistedLocale)) {
            return persistedLocale
        } else {
            return null
        }
    },

    guessDefaultLocale(): string {
        const coockieLocale =
            app.config.globalProperties.$cookies?.get('_locale')
        console.log(coockieLocale)
        if (coockieLocale) {
            return coockieLocale
        }

        const userPersistedLocale = Trans.getPersistedLocale()
        if (userPersistedLocale) {
            return userPersistedLocale
        }

        const userPreferredLocale = Trans.getUserLocale()

        if (Trans.isLocaleSupported(userPreferredLocale.locale)) {
            return userPreferredLocale.locale
        }

        if (Trans.isLocaleSupported(userPreferredLocale.localeNoRegion)) {
            return userPreferredLocale.localeNoRegion
        }

        return Trans.defaultLocale
    },
    async routeMiddleware(
        to: RouteLocationNormalized,
        _from: RouteLocationNormalized,
        next: NavigationGuardNext
    ) {
        let paramLocale = to.params.locale

        if (!paramLocale) {
            paramLocale = Trans.guessDefaultLocale()
        }

        if (typeof paramLocale != 'string') {
            paramLocale = paramLocale[0]
        }

        if (!Trans.isLocaleSupported(paramLocale)) {
            return next(Trans.guessDefaultLocale())
        }

        await Trans.switchLanguage(paramLocale)

        return next()
    },
    i18nRoute(to: RouteLocationNormalized) {
        return {
            ...to,
            params: {
                locale: Trans.currentLocale,
                ...to.params,
            },
        }
    },
}

export default Trans
