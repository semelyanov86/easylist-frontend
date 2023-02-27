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
                    <atom-icon-select
                        v-model="folderModel.icon"
                    ></atom-icon-select>
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
import { defineComponent, onMounted, ref } from 'vue'
import FolderInterface from '@/types/FolderInterface'
import { getFolderById } from '@/services/Api'
import { useAppStore } from '@/store/app'
import AtomIconSelect from '@/components/atoms/AtomIconSelect.vue'

export default defineComponent({
    name: 'EditFolderForm',
    emits: ['saveFolder', 'closeFolder'],
    props: {
        folderId: Number,
    },
    components: {
        AtomIconSelect,
    },
    setup(props, { emit }) {
        const storage = useAppStore()

        const folderModel = ref<FolderInterface>({
            id: 0,
            name: '',
            icon: 'mdi-folder',
            order: 1,
            created_at: new Date(),
            updated_at: new Date(),
        })

        onMounted(function () {
            if (!props.folderId || props.folderId < 1) {
                return
            }
            storage.loading = true
            getFolderById(props.folderId)
                .then((response) => {
                    folderModel.value.id = props.folderId ?? 0
                    folderModel.value.icon = response.data.data.attributes.icon
                    folderModel.value.name = response.data.data.attributes.name
                    folderModel.value.order =
                        response.data.data.attributes.order
                    folderModel.value.created_at = new Date(
                        response.data.data.attributes.created_at
                    )
                    folderModel.value.updated_at = new Date(
                        response.data.data.attributes.updated_at
                    )

                    if (
                        folderModel.value.id &&
                        typeof folderModel.value.id === 'number'
                    ) {
                        folderModel.value.id = folderModel.value.id.toString()
                    }

                    storage.loading = false
                })
                .catch((error) => {
                    console.log(error)
                    storage.setErrorFromAxios(error)
                    storage.loading = false
                })
        })

        function saveFolder() {
            emit('saveFolder', folderModel.value)
        }
        function closeFolder() {
            emit('closeFolder')
        }
        return { saveFolder, closeFolder, folderModel }
    },
})
</script>

<style scoped></style>
