<template>
    <v-app>
        <default-bar />

        <default-view />
        <core-footer />
    </v-app>
</template>

<script lang="ts" setup>
import DefaultBar from './AppBar.vue'
import DefaultView from './View.vue'
import CoreFooter from '@/components/organisms/CoreFooter.vue'
</script>
