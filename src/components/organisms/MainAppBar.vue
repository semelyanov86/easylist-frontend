<template>
    <v-app-bar id="app-bar" absolute app color="transparent" flat height="75">
        <router-link to="/"
            ><v-img
                :width="40"
                :height="40"
                :src="logo"
                :alt="$t('nav.easylist')"
            ></v-img
        ></router-link>
        <atom-toolbar-title
            @click="$router.push('/')"
            class="hidden-sm-and-down font-weight-light"
        >
            {{ $t('nav.easylist') }}
        </atom-toolbar-title>

        <app-bar-menu @sign-out="onSignOut"></app-bar-menu>
    </v-app-bar>
</template>

<script lang="ts">
import AppBarMenu from '@/components/molecules/AppBarMenu.vue'
import AtomToolbarTitle from '@/components/atoms/AtomToolbarTitle.vue'
import AtomSpacer from '@/components/atoms/AtomSpacer.vue'
import { computed, inject } from 'vue'
import { useAppStore } from '@/store/app'
import { VueCookies } from 'vue-cookies'
import router from '@/router'

export default {
    name: 'MainAppBar',
    components: {
        AppBarMenu,
        AtomToolbarTitle,
    },
    setup() {
        const storage = useAppStore()
        const $cookies = inject<VueCookies>('$cookies')

        const logo = computed(
            () => import.meta.env.VITE_BASIC_URL + '/static/img/logo-light.svg'
        )

        function onSignOut() {
            storage.setToken('')
            $cookies?.remove('_site_data', '/')
            storage.setDefaultsForData()
            storage.setDefaultItems()
            router.push('/login')
        }
        return { logo, onSignOut }
    },
}
</script>

<style scoped></style>
