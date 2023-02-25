<template>
    <v-dialog v-model="isFolderOpen" activator="parent" width="auto">
        <edit-folder-card
            @save-folder="saveFolder"
            @close-folder="closeFolder"
        ></edit-folder-card>
    </v-dialog>
</template>

<script lang="ts">
import { computed, ref } from 'vue'
import { defineComponent } from 'vue'
import EditFolderCard from '@/components/organisms/EditFolderCard.vue'
import FolderInterface from '@/types/FolderInterface'

export default defineComponent({
    name: 'CreateListOrFolder',
    components: { EditFolderCard },
    emits: ['closeFolderDialog'],
    props: {
        folderDialog: Boolean,
        folderId: Number,
    },
    setup(props, { emit }) {
        const isFolderOpen = computed({
            get: () => props.folderDialog,
            set: (value) => emit('closeFolderDialog', value),
        })

        function saveFolder(folder: FolderInterface) {
            emit('closeFolderDialog', false)
        }

        function closeFolder() {
            emit('closeFolderDialog', false)
        }

        return { isFolderOpen, saveFolder, closeFolder }
    },
})
</script>

<style scoped></style>
