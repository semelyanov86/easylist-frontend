<template>
    <router-view />
</template>

<script lang="ts">
import { useAppStore } from '@/store/app'
import { inject, onBeforeMount, onMounted } from 'vue'
import { VueCookies } from 'vue-cookies'
import TokenInterface from './types/TokenInterface'
import { doUserInfo } from '@/services/Api'
import UserInterface from '@/types/UserInterface'
import { mapUserDataFromResponse } from '@/services/ResponseDataMapper'

export default {
    setup() {
        const storage = useAppStore()
        const $cookies = inject<VueCookies>('$cookies')
        onBeforeMount(() => {
            if (storage.token == '') {
                const tokenData = $cookies?.get('_site_data') as TokenInterface
                if (tokenData) {
                    storage.setToken(tokenData.token)
                }
            }
        })
    },
}
</script>
