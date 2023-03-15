<template>
    <v-btn class="text-capitalize" text>
        <v-icon left>mdi-translate</v-icon>
        {{ activeLang.title }}
        <v-icon small right>mdi-menu-down</v-icon>

        <v-menu activator="parent">
            <v-list>
                <v-list-item
                    v-for="(lang, index) in langs"
                    :key="index"
                    @click="switchLanguage(lang)"
                >
                    <v-list-item-title>{{ lang.title }}</v-list-item-title>
                </v-list-item>
            </v-list>
        </v-menu>
    </v-btn>
</template>

<script lang="ts">
import { onMounted, ref } from 'vue'
import LanguageInterface from '@/types/LanguageInterface'
import { useI18n } from 'vue-i18n'
import Trans from '@/i18n/translation'
import { useRouter } from 'vue-router'

export default {
    name: 'LanguageSwitcher',
    setup() {
        const langs = Trans.supportedLocales
        const languageMenu = ref(true)
        const activeLang = ref<LanguageInterface>({
            title: 'English',
            value: 'en',
        })
        const { t, locale } = useI18n()
        const router = useRouter()

        const switchLanguage = async (language: LanguageInterface) => {
            activeLang.value = language
            const newLocale = language.value
            await Trans.switchLanguage(newLocale)
            try {
                await router.replace({ params: { locale: newLocale } })
            } catch (e) {
                console.log(e)
                router.push('/')
            }
        }

        onMounted(function () {
            const currentLocale = Trans.guessDefaultLocale()
            console.log(currentLocale)
            const localeModel = langs.find(
                (loc: LanguageInterface) => loc.value == currentLocale
            )
            console.log(localeModel)
            if (localeModel) {
                activeLang.value = localeModel
            }
        })

        return { langs, languageMenu, activeLang, switchLanguage }
    },
}
</script>

<style scoped></style>
