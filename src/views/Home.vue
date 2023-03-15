<template>
    <HomeLayout />
</template>

<script lang="ts">
import HomeLayout from '@/templates/HomeLayout.vue'
import { defineComponent, onMounted } from 'vue'
import { useAppStore } from '@/store/app'
import { doUserInfo } from '@/services/Api'
import UserInterface from '@/types/UserInterface'

export default defineComponent({
    name: 'Home',
    components: {
        HomeLayout,
    },
    setup() {},
})
</script>
