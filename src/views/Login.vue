<template>
  <AuthLayout>
    <login-block @do="submit" />
  </AuthLayout>
</template>

<script lang="ts">
import AuthLayout from "@/templates/AuthLayout.vue";
import SignInInterface from "@/types/SignInInterface";
import LoginBlock from "@/components/organisms/LoginBlock.vue";
import {useAppStore} from "@/store/app";
import {doAuth} from "@/services/Api";
import TokenInterface from "@/types/TokenInterface";
import {defineComponent, inject} from 'vue'
import router from "@/router";
import {VueCookies} from "vue-cookies";

    export default defineComponent({
        name: 'Login',
      components: {
        LoginBlock,
        AuthLayout,
      },
      setup() {
        const storage = useAppStore()
        const $cookies = inject<VueCookies>('$cookies');
          const submit = function (values: SignInInterface) {
            doAuth(values).then((response) => {
              const token: TokenInterface = {
                token: response.data.data.attributes.token,
                expiry: response.data.data.attributes.expiry
              };
              storage.setToken(token.token)
              // save info to cookie
              let date = new Date();
              date.setTime(token.expiry);

              $cookies?.set("_site_data", token, token.expiry, '/', undefined, true)

              router.push({ name: 'Home' });
            }).catch((error) => {
              console.log(error)
              storage.setErrorFromAxios(error)
            })
          }

        return {
          submit,
        }
      }
    });
</script>
