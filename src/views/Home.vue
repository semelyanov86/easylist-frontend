<template>
    <HomeLayout />
</template>

<script lang="ts">
import HomeLayout from '@/templates/HomeLayout.vue'
import { defineComponent } from 'vue'
import { useAppStore } from '@/store/app'

export default defineComponent({
    name: 'Home',
    components: {
        HomeLayout,
    },
    setup() {
        const storage = useAppStore
        console.log(storage)
        return {
            storage,
        }
    },
})
</script>
