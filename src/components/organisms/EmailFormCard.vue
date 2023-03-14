<template>
    <v-card>
        <atom-card-title>{{$t('lists.email-title')}}</atom-card-title>
        <email-form
            :default-email="defaultEmail"
            @send-email="sendForm"
            @close-form="$emit('closeForm')"
        ></email-form>
    </v-card>
</template>

<script lang="ts">
import AtomCardTitle from '@/components/atoms/AtomCardTitle.vue'
import { defineComponent } from 'vue'
import EmailForm from '@/components/molecules/EmailForm.vue'

export default defineComponent({
    name: 'EmailFormCard',
    components: { EmailForm, AtomCardTitle },
    emits: ['sendForm', 'closeForm'],
    props: {
        defaultEmail: String,
    },
    setup(props, { emit }) {
        function sendForm(email: string) {
            emit('sendForm', email)
        }
        return {
            sendForm,
        }
    },
})
</script>

<style scoped></style>
