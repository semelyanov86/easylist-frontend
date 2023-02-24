<template>
    <HomeLayout />
</template>

<script lang="ts">
import HomeLayout from '@/templates/HomeLayout.vue'
import { defineComponent, onMounted } from 'vue'
import { useAppStore } from '@/store/app'
import { doUserInfo } from '@/services/Api'
import UserInterface from '@/types/UserInterface'

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
                        const user: UserInterface = {
                            id: response.data.data.id,
                            email: response.data.data.attributes.email,
                            name: response.data.data.attributes.name,
                            created_at:
                                response.data.data.attributes.created_at,
                        }
                        storage.setUser(user)
                    })
                    .catch((error) => {
                        console.log(error)
                        storage.setErrorFromAxios(error)
                    })
            }
        })
        return {
            storage,
        }
    },
})
</script>
