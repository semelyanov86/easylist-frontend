<template>
    <v-row class="mt-3">
        <v-col>
            <v-card
                :title="$t('account.get-token-title')"
                :subtitle="$t('account.get-token-subtitle')"
                class="px-3 pb-2"
                v-if="token == ''"
            >
                <sign-in-form @do="generateToken"></sign-in-form>
            </v-card>
            <v-card
                :title="$t('account.copy-token-title')"
                :subtitle="$t('account.copy-token-subtitle')"
                class="px-3 pb-2"
                v-else
            >
                <code>{{ token }}</code>
            </v-card>
        </v-col>
    </v-row>
</template>

<script lang="ts">
import SignInForm from '@/components/molecules/SignInForm.vue'
import { defineComponent, ref } from 'vue'
import SignInInterface from '@/types/SignInInterface'
import { doAuth } from '@/services/Api'
import TokenInterface from '@/types/TokenInterface'
import router from '@/router'
import { useAppStore } from '@/store/app'

export default defineComponent({
    name: 'TokenReceiver',
    components: { SignInForm },
    setup() {
        const token = ref('')
        const storage = useAppStore()
        function generateToken(e: SignInInterface) {
            doAuth(e)
                .then((response) => {
                    const resultToken: TokenInterface = {
                        token: response.data.data.attributes.token,
                        expiry: response.data.data.attributes.expiry,
                    }
                    token.value = resultToken.token
                })
                .catch((error) => {
                    console.log(error)
                    storage.setErrorFromAxios(error)
                })
        }
        return { generateToken, token }
    },
})
</script>

<style scoped></style>
