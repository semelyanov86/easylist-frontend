<template>
  <HelloWorld />
</template>

<script lang="ts">
  import HelloWorld from '@/components/HelloWorld.vue'
  import { defineComponent } from 'vue'
  import {useAppStore} from "@/store/app";

  export default defineComponent({
    name: 'Home',
    components: {
      HelloWorld,
    },
    setup() {
      const storage = useAppStore
      console.log(storage)
      return {
        storage
      }
    }
  })
</script>
