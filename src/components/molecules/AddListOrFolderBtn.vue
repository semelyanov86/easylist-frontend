<template>
    <atom-icon-btn atom-icon="mdi-plus" color="default">
        <v-menu activator="parent">
            <v-list>
                <v-list-item prepend-icon="mdi-folder" @click="onCreateFolder">
                    <v-list-item-title>Create Folder</v-list-item-title>
                </v-list-item>
                <v-list-item prepend-icon="mdi-view-list" @click="onCreateList">
                    <v-list-item-title>Create List</v-list-item-title>
                </v-list-item>
            </v-list>
        </v-menu>
    </atom-icon-btn>
</template>

<script lang="ts">
import AtomIconBtn from '@/components/atoms/AtomIconBtn.vue'
import { defineComponent } from 'vue'

export default defineComponent({
    name: 'AddListOrFolderBtn',
    emits: ['createFolder', 'createList'],
    components: { AtomIconBtn },
    setup(props, { emit }) {
        function onCreateFolder() {
            emit('createFolder')
        }
        function onCreateList() {
            emit('createList')
        }
        return { onCreateFolder, onCreateList }
    },
})
</script>

<style scoped></style>
