<template>
    <v-card-text>
        <v-container>
            <v-row>
                <v-col cols="12">
                    <v-text-field
                        label="Name*"
                        required
                        v-model="folderModel.name"
                    ></v-text-field>
                </v-col>
                <v-col cols="12" sm="6">
                    <v-select
                        :items="folderIcons"
                        label="Icon*"
                        required
                        v-model="folderModel.icon"
                    ></v-select>
                </v-col>
            </v-row>
        </v-container>
        <small>*indicates required field</small>
    </v-card-text>
    <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="blue-darken-1" variant="text" @click="closeFolder">
            Close
        </v-btn>
        <v-btn color="blue-darken-1" variant="text" @click="saveFolder">
            Save
        </v-btn>
    </v-card-actions>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import FolderInterface from '@/types/FolderInterface'

export default defineComponent({
    name: 'EditFolderForm',
    emits: ['saveFolder', 'closeFolder'],
    setup(props, { emit }) {
        const folderModel = ref<FolderInterface>({
            id: 0,
            name: '',
            icon: 'mdi-folder',
            order: 1,
            created_at: new Date(),
            updated_at: new Date(),
        })
        const folderIcons = ref([
            'mdi-folder',
            'mdi-folder-multiple',
            'mdi-folder-home',
            'mdi-folder-image',
        ])

        function saveFolder() {
            emit('saveFolder', folderModel.value)
        }
        function closeFolder() {
            emit('closeFolder')
        }
        return { saveFolder, closeFolder, folderModel, folderIcons }
    },
})
</script>

<style scoped></style>
