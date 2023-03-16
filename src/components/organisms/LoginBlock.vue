<template>
    <v-row>
        <v-col lg="12" xl="12" cols="12">
            <atom-large-logo></atom-large-logo>
            <h2 class="font-weight-bold mt-4">{{ $t('login.sign-in') }}</h2>
            <atom-text-six :text="$t('login.start-using')" />
            <sign-in-form @do="submit"></sign-in-form>

            <div class="d-flex justify-end">
                <router-link to="/restore">
                    <atom-btn variant="text" color="primary">
                        {{ $t('login.forgot-password') }}
                    </atom-btn>
                </router-link>
            </div>
        </v-col>
    </v-row>
</template>

<script lang="ts">
import SignInForm from '@/components/molecules/SignInForm.vue'
import SignInInterface from '@/types/SignInInterface'
import AtomBtn from '@/components/atoms/AtomBtn.vue'
import AtomImg from '@/components/atoms/AtomImg.vue'
import AtomTextSix from '@/components/atoms/AtomTextSix.vue'
import { defineComponent, ref } from 'vue'
import AtomLargeLogo from '@/components/atoms/AtomLargeLogo.vue'
import AtomDivider from '@/components/atoms/AtomDivider.vue'

export default defineComponent({
    name: 'LoginBlock',
    emits: ['submit', 'do'],
    components: {
        AtomLargeLogo,
        AtomBtn,
        SignInForm,
        AtomTextSix,
    },
    setup(_, { emit }) {
        const mode = ref('login')
        const submit = function (values: SignInInterface) {
            emit('do', values)
        }

        return {
            submit,
            mode,
        }
    },
})
</script>

<style scoped>
a {
    text-decoration: none;
    color: inherit;
}
</style>
