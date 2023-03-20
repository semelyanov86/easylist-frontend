<template>
    <v-card-text>
        <v-container>
            <v-row>
                <v-col cols="12" v-if="!moveToFolderMode">
                    <v-text-field
                        :label="$t('lists.name')"
                        required
                        autofocus
                        @keyup.enter="saveList"
                        v-model="listModel.name"
                    ></v-text-field>
                </v-col>
                <v-col cols="12" sm="6">
                    <v-select
                        :items="storage.getAllFolders"
                        :label="$t('lists.folder') + '*'"
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
        <small>{{ $t('general.fields-required') }}</small>
    </v-card-text>
    <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="blue-darken-1" variant="text" @click="closeList">
            {{ $t('general.close') }}
        </v-btn>
        <v-btn color="blue-darken-1" variant="text" @click="saveList">
            {{ $t('general.save') }}
        </v-btn>
    </v-card-actions>
</template>

<script lang="ts">
import { computed, defineComponent, onMounted, ref } from 'vue'
import { getFolderById, getListById } from '@/services/Api'
import { useAppStore } from '@/store/app'
import ListInterface from '@/types/ListInterface'
import AtomIconSelect from '@/components/atoms/AtomIconSelect.vue'
import { mapListDataFromResponse } from '@/services/ResponseDataMapper'

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
            folder_id: storage.selectedFolder,
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
                    listModel.value = mapListDataFromResponse(
                        response,
                        props.listId ?? 0
                    )

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
