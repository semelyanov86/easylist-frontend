<template>
    <HomeLayout />
</template>

<script lang="ts">
import HomeLayout from '@/templates/HomeLayout.vue'
import { defineComponent, onMounted } from 'vue'
import { useAppStore } from '@/store/app'
import { doUserInfo } from '@/services/Api'
import UserInterface from '@/types/UserInterface'
import { mapUserDataFromResponse } from '@/services/ResponseDataMapper'

export default defineComponent({
    name: 'Home',
    components: {
        HomeLayout,
    },
    setup() {
        const storage = useAppStore()
        onMounted(() => {
            if (!storage.user || !storage.user.id) {
                doUserInfo()
                    .then((response) => {
                        const user = mapUserDataFromResponse(response)
                        storage.setUser(user)
                    })
                    .catch((error) => {
                        console.log(error)
                        storage.setErrorFromAxios(error)
                    })
            }
        })
    },
})
</script>
