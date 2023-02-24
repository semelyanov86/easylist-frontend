<template>
    <atom-icon-btn atom-icon="mdi-dots-horizontal">
        <v-menu activator="parent">
            <v-list>
                <v-list-item>
                    <v-list-item-title>Edit Folder</v-list-item-title>
                </v-list-item>
            </v-list>
        </v-menu>
    </atom-icon-btn>
</template>

<script lang="ts">
import AtomIconBtn from '@/components/atoms/AtomIconBtn.vue'

export default {
    name: 'FolderSubmenu',
    components: {
        AtomIconBtn,
    },
}
</script>

<style scoped></style>
