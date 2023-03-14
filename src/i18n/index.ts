import { createI18n } from 'vue-i18n'
import en from '@/i18n/locales/en.json'
import ru from '@/i18n/locales/ru.json'
import de from '@/i18n/locales/de.json'

export default createI18n({
    locale: import.meta.env.VITE_DEFAULT_LOCALE,
    fallbackLocale: import.meta.env.VITE_FALLBACK_LOCALE,
    allowComposition: true,
    legacy: false,
    messages: {
        en,
        ru,
        de,
    },
    globalInjection: true,
})
