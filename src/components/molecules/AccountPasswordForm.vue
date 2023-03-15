<template>
    <v-form v-model="valid">
        <v-container>
            <v-row>
                <v-col cols="12" md="4">
                    <v-text-field
                        v-model="password"
                        :rules="passwordRules"
                        :counter="8"
                        :label="$t('account.password')"
                        type="password"
                        required
                    ></v-text-field>
                </v-col>

                <v-col cols="12" md="4">
                    <v-text-field
                        v-model="confirm"
                        :rules="confirmRules"
                        :label="$t('account.password-confirm')"
                        type="password"
                        required
                    ></v-text-field>
                </v-col>
            </v-row>
        </v-container>
        <v-card-actions>
            <v-btn @click="$emit('cancel')">{{ $t('general.close') }}</v-btn>
            <v-btn @click="onUpdate">{{ $t('general.save') }}</v-btn>
        </v-card-actions>
    </v-form>
</template>

<script lang="ts">
import { useAppStore } from '@/store/app'
import { useI18n } from 'vue-i18n'
import { ref } from 'vue'
import { defineComponent } from 'vue'
import { updateUserPassword } from '@/services/Api'
import { mapUserDataFromResponse } from '@/services/ResponseDataMapper'

export default defineComponent({
    name: 'AccountPasswordForm',
    emits: ['cancel'],
    setup(_, { emit }) {
        const storage = useAppStore()
        const { t } = useI18n()
        const valid = ref(false)
        const password = ref('')
        const confirm = ref('')
        const passwordRules = ref([
            (value: string) => {
                if (value) return true

                return t('account.password-required')
            },
            (value: string) => {
                if (value?.length > 8) return true

                return t('account.password-length')
            },
        ])
        const confirmRules = ref([
            (value: string) => {
                if (value == password.value) return true

                return t('account.confirm-error')
            },
        ])

        function onUpdate() {
            updateUserPassword(password.value)
                .then((response) => {
                    const user = mapUserDataFromResponse(response)
                    storage.setUser(user)
                    storage.message = t('account.success-update')
                    emit('cancel')
                    storage.loading = false
                })
                .catch((error) => {
                    storage.loading = false
                    console.log(error)
                    storage.setErrorFromAxios(error)
                })
        }
        return {
            password,
            confirm,
            passwordRules,
            confirmRules,
            valid,
            onUpdate,
        }
    },
})
</script>

<style scoped></style>
