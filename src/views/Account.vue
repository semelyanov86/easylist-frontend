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

<script>
import AccountCard from '@/components/organisms/AccountCard.vue'
import { ref } from 'vue'
import AccountEditCard from '@/components/organisms/AccountEditCard.vue'
import MessagesBlock from '@/components/molecules/MessagesBlock.vue'
import AccountPasswordCard from '@/components/organisms/AccountPasswordCard.vue'

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
        return { mode }
    },
}
</script>

<style scoped></style>
