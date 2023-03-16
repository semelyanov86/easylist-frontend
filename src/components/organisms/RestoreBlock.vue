<template>
    <v-row>
        <v-col lg="12" xl="12" cols="12">
            <atom-large-logo></atom-large-logo>
            <h2 class="font-weight-bold mt-4">{{ $t('login.restore') }}</h2>
            <atom-text-six :text="$t('login.restore-text')" />
            <restore-form @do-restore="submit"></restore-form>

            <div class="d-flex justify-end">
                <atom-btn
                    @click="$router.push('/login')"
                    variant="text"
                    color="primary"
                >
                    {{ $t('general.back') }}
                </atom-btn>
            </div>
        </v-col>
    </v-row>
</template>

<script lang="ts">
import AtomLargeLogo from '@/components/atoms/AtomLargeLogo.vue'
import AtomTextSix from '@/components/atoms/AtomTextSix.vue'
import AtomBtn from '@/components/atoms/AtomBtn.vue'
import RestoreForm from '@/components/molecules/RestoreForm.vue'
import { defineComponent } from 'vue'
import router from '@/router'
import { passwordReset } from '@/services/Api'
import { useAppStore } from '@/store/app'
import SignInInterface from '@/types/SignInInterface'

export default defineComponent({
    name: 'RestoreBlock',
    components: { RestoreForm, AtomBtn, AtomTextSix, AtomLargeLogo },
    setup() {
        const storage = useAppStore()
        function submit(values: SignInInterface) {
            passwordReset(values.email)
                .then(() => {
                    storage.message = 'Please check your mailbox'
                    router.push({ name: 'Login' })
                })
                .catch((error) => {
                    console.log(error)
                    storage.setErrorFromAxios(error)
                })
        }
        return { submit }
    },
})
</script>

<style scoped></style>
