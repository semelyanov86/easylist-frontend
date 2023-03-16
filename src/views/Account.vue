<template>
    <v-container>
        <messages-block></messages-block>
        <account-card
            v-if="mode === 'main'"
            @change-name="mode = 'name'"
            @change-password="mode = 'password'"
        ></account-card>
        <account-edit-card
            v-if="mode === 'name'"
            @cancel="mode = 'main'"
        ></account-edit-card>
        <account-password-card
            v-if="mode === 'password'"
            @cancel="mode = 'main'"
        ></account-password-card>
    </v-container>
</template>

<script lang="ts">
import AccountCard from '@/components/organisms/AccountCard.vue'
import { onMounted, ref } from 'vue'
import AccountEditCard from '@/components/organisms/AccountEditCard.vue'
import MessagesBlock from '@/components/molecules/MessagesBlock.vue'
import AccountPasswordCard from '@/components/organisms/AccountPasswordCard.vue'
import { useAppStore } from '@/store/app'
import { doUserInfo } from '@/services/Api'
import { mapUserDataFromResponse } from '@/services/ResponseDataMapper'

export default {
    name: 'Account',
    components: {
        AccountPasswordCard,
        MessagesBlock,
        AccountEditCard,
        AccountCard,
    },
    setup() {
        const mode = ref('main')
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
        return { mode }
    },
}
</script>

<style scoped></style>
