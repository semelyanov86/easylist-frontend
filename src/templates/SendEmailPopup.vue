<template>
    <v-dialog v-model="isEmailOpen" activator="parent" width="100%">
        <email-form-card
            :default-email="storage.user.email"
            @send-form="sendEmail"
            @close-form="closeEmailPopup"
        ></email-form-card>
    </v-dialog>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue'
import { useAppStore } from '@/store/app'
import { sendEmailRequest } from '@/services/Api'
import EmailFormCard from '@/components/organisms/EmailFormCard.vue'

export default defineComponent({
    name: 'SendEmailPopup',
    components: { EmailFormCard },
    emits: ['closeEmailPopup'],
    props: {
        emailDialog: Boolean,
    },
    setup(props, { emit }) {
        const storage = useAppStore()
        const isEmailOpen = computed({
            get: () => props.emailDialog,
            set: (value) => value,
        })

        function sendEmail(email: string) {
            storage.loading = true
            if (!storage.selectedList) {
                return false
            }
            sendEmailRequest(storage.selectedList.id, email)
                .then((response) => {
                    storage.message = 'Email successfully sent!'
                    storage.loading = false
                    closeEmailPopup()
                })
                .catch((error) => {
                    console.log(error)
                    storage.setErrorFromAxios(error)
                    closeEmailPopup()
                    storage.loading = false
                })
        }

        function closeEmailPopup() {
            emit('closeEmailPopup', false)
        }
        return {
            isEmailOpen,
            closeEmailPopup,
            sendEmail,
            storage,
        }
    },
})
</script>

<style scoped></style>
