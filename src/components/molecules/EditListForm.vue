<template>
    <v-card-text>
        <v-container>
            <v-row>
                <v-col cols="12" v-if="!moveToFolderMode">
                    <v-text-field
                        label="Name*"
                        required
                        v-model="listModel.name"
                    ></v-text-field>
                </v-col>
                <v-col cols="12" sm="6">
                    <v-select
                        :items="storage.getAllFolders"
                        label="Folder*"
                        item-title="name"
                        item-value="id"
                        required
                        v-model="listModel.folder_id"
                    ></v-select>
                </v-col>
                <v-col cols="12" sm="6" v-if="!moveToFolderMode">
                    <atom-icon-select
                        v-model="listModel.icon"
                    ></atom-icon-select>
                </v-col>
            </v-row>
        </v-container>
        <small>*indicates required field</small>
    </v-card-text>
    <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="blue-darken-1" variant="text" @click="closeList">
            Close
        </v-btn>
        <v-btn color="blue-darken-1" variant="text" @click="saveList">
            Save
        </v-btn>
    </v-card-actions>
</template>

<script lang="ts">
import { computed, defineComponent, onMounted, ref } from 'vue'
import { getFolderById, getListById } from '@/services/Api'
import { useAppStore } from '@/store/app'
import ListInterface from '@/types/ListInterface'
import AtomIconSelect from '@/components/atoms/AtomIconSelect.vue'

export default defineComponent({
    name: 'EditListForm',
    emits: ['saveList', 'closeList'],
    props: {
        listId: Number,
      moveToFolderMode: Boolean,
    },
    components: {
        AtomIconSelect,
    },
    setup(props, { emit }) {
        const storage = useAppStore()

        const listModel = ref<ListInterface>({
            id: 0,
            name: '',
            icon: 'mdi-view-list',
            order: 1,
            created_at: new Date(),
            updated_at: new Date(),
            folder_id: 1,
            link: null,
            items_count: 0,
        })

        onMounted(function () {
            if (!props.listId || props.listId < 1) {
                return
            }
            storage.loading = true
            getListById(props.listId)
                .then((response) => {
                    listModel.value.id = props.listId ?? 0
                    listModel.value.icon = response.data.data.attributes.icon
                    listModel.value.name = response.data.data.attributes.name
                    listModel.value.folder_id =
                        response.data.data.attributes.folder_id
                    listModel.value.order = response.data.data.attributes.order
                    listModel.value.created_at = new Date(
                        response.data.data.attributes.created_at
                    )
                    listModel.value.updated_at = new Date(
                        response.data.data.attributes.updated_at
                    )

                    if (
                        listModel.value.id &&
                        typeof listModel.value.id === 'number'
                    ) {
                        listModel.value.id = listModel.value.id.toString()
                    }

                    storage.loading = false
                })
                .catch((error) => {
                    console.log(error)
                    storage.setErrorFromAxios(error)
                    storage.loading = false
                })
        })

        function saveList() {
            emit('saveList', listModel.value)
        }
        function closeList() {
            emit('closeList')
        }

        return { saveList, closeList, listModel, storage }
    },
})
</script>

<style scoped></style>
