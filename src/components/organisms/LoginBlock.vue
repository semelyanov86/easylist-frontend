<template>
    <v-row>
        <v-col lg="12" xl="12" cols="12">
            <atom-img
                src="http://127.0.0.1:4000/static/img/logo-light.svg"
                lazy-src="http://127.0.0.1:4000/static/img/logo-light.svg"
                aspect-ratio="1"
                height="125"
                width="125"
                style="align-content: center"
            >
            </atom-img>
            <h2 class="font-weight-bold mt-4">{{$t('login.sign-in')}}</h2>
            <atom-text-six
                :text="$t('login.start-using')"
            />
            <v-container>
                <v-responsive>
                    <sign-in-form @do="submit"></sign-in-form>
                </v-responsive>
            </v-container>

            <div class="d-flex justify-end">
                <atom-btn variant="text" color="primary">
                    {{$t('login.forgot-password')}}
                </atom-btn>
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
import { defineComponent } from 'vue'

export default defineComponent({
    name: 'LoginBlock',
    emits: ['submit', 'do'],
    components: {
        AtomBtn,
        SignInForm,
        AtomImg,
        AtomTextSix,
    },
    setup(props: any, { emit }) {
        const submit = function (values: SignInInterface) {
            emit('do', values)
        }

        return {
            submit,
        }
    },
})
</script>

<style scoped></style>
