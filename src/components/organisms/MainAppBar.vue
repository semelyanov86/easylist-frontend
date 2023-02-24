<template>
    <v-app-bar id="app-bar" absolute app color="transparent" flat height="75">
        <atom-toolbar-title class="hidden-sm-and-down font-weight-light"
            >EasyList</atom-toolbar-title
        >

        <atom-spacer />
        <app-bar-menu></app-bar-menu>
    </v-app-bar>
</template>

<script lang="ts">
import AppBarMenu from '@/components/molecules/AppBarMenu.vue'
import AtomToolbarTitle from '@/components/atoms/AtomToolbarTitle.vue'
import AtomSpacer from '@/components/atoms/AtomSpacer.vue'

export default {
    name: 'MainAppBar',
    components: {
        AppBarMenu,
        AtomToolbarTitle,
        AtomSpacer,
    },
}
</script>

<style scoped></style>
