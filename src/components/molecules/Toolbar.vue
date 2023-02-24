<template>
    <v-toolbar color="secondary">
        <v-btn
            variant="text"
            icon="mdi-arrow-left"
            v-if="showBackButton"
        ></v-btn>
        <atom-toolbar-title><slot></slot></atom-toolbar-title>

        <atom-spacer />

        <v-btn variant="text" icon="mdi-magnify"></v-btn>

        <v-btn variant="text" icon="mdi-plus"></v-btn>
    </v-toolbar>
</template>

<script lang="ts">
import AtomToolbarTitle from '@/components/atoms/AtomToolbarTitle.vue'
import AtomSpacer from '@/components/atoms/AtomSpacer.vue'

export default {
    name: 'Toolbar',
    components: {
        AtomToolbarTitle,
        AtomSpacer,
    },
    props: {
        showBackButton: Boolean,
    },
}
</script>

<style scoped></style>
