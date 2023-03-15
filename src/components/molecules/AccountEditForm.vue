<template>
    <v-form v-model="valid">
        <v-container>
            <v-row>
                <v-col cols="12" md="4">
                    <v-text-field
                        v-model="name"
                        :rules="nameRules"
                        :counter="10"
                        :label="$t('account.name')"
                        required
                    ></v-text-field>
                </v-col>

                <v-col cols="12" md="4">
                    <v-text-field
                        v-model="email"
                        :rules="emailRules"
                        :label="$t('account.email')"
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
import { defineComponent, ref } from 'vue'
import { useAppStore } from '@/store/app'
import { useI18n } from 'vue-i18n'
import { updateUserName } from '@/services/Api'
import { mapUserDataFromResponse } from '@/services/ResponseDataMapper'

export default defineComponent({
    name: 'AccountEditForm',
    emits: ['cancel'],
    setup(_, { emit }) {
        const storage = useAppStore()
        const { t } = useI18n()
        const valid = ref(false)
        const name = ref(storage.user.name)
        const nameRules = ref([
            (value: string) => {
                if (value) return true

                return t('account.name-required')
            },
            (value: string) => {
                if (value?.length <= 30) return true

                return t('account.name-limit')
            },
        ])
        const email = ref(storage.user.email)
        const emailRules = ref([
            (value: string) => {
                if (value) return true

                return t('account.email-required')
            },
            (value: string) => {
                if (/.+@.+\..+/.test(value)) return true

                return t('account.email-valid')
            },
        ])

        function onUpdate() {
            storage.loading = true
            updateUserName(name.value, email.value)
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
        return { name, nameRules, emailRules, email, valid, onUpdate }
    },
})
</script>

<style scoped></style>
