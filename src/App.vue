<template>
  <router-view />
</template>

<script lang="ts">
  import {useAppStore} from "@/store/app";
  import {inject, onBeforeMount} from "vue";
  import {VueCookies} from "vue-cookies";
  import TokenInterface from "./types/TokenInterface";

  export default {
    setup() {
      const storage = useAppStore()
      const $cookies = inject<VueCookies>('$cookies');
      onBeforeMount(() => {
        if (storage.token == '') {
          const tokenData = $cookies?.get('_site_data') as TokenInterface
          if (tokenData) {
            storage.setToken(tokenData.token)
          }
        }
      })
    }
  }
</script>
