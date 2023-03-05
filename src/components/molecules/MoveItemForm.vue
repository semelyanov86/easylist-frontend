<template>
    <v-card-text>
        <v-container>
            <v-row>
                <v-col cols="12">
                    <v-select
                        label="Select Folder"
                        v-model.number="selectedFolderId"
                        :items="storage.getAllFolders"
                        item-title="name"
                        item-value="id"
                        @update:model-value="receiveLists"
                    >
                    </v-select>
                </v-col>
                <v-col cols="12">
                    <v-select
                        label="Select List"
                        v-model.number="selectedListId"
                        :items="lists"
                        item-title="name"
                        item-value="id"
                    >
                    </v-select>
                </v-col>
            </v-row>
        </v-container>
    </v-card-text>
    <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="blue-darken-1" variant="text" @click="closeMoveItem">
            Close
        </v-btn>
        <v-btn color="blue-darken-1" variant="text" @click="runMoveOrCopy">
            {{ getButtonText }}
        </v-btn>
    </v-card-actions>
</template>

<script lang="ts">
import { computed, defineComponent, onMounted, PropType, ref } from 'vue'
import { useAppStore } from '@/store/app'
import { copyItem, listsFromFolder, moveItem } from '@/services/Api'
import { AxiosError } from 'axios'
import router from '@/router'
import ListInterface from '@/types/ListInterface'
import {
    mapItemFromResponseAttributes,
    mapListDataFromResponseAttributes,
} from '@/services/ResponseDataMapper'
import ItemInterface from '@/types/ItemInterface'

export default defineComponent({
    name: 'MoveItemForm',
    emits: ['closeMoveItem'],
    props: {
        itemModel: Object as PropType<ItemInterface>,
        copyMode: Boolean,
    },
    setup(props, { emit }) {
        const storage = useAppStore()
        const selectedFolderId = ref(1)
        const lists = ref<ListInterface[]>([])
        const selectedListId = ref<number | null>(null)

        onMounted(function () {
            selectedFolderId.value = storage.selectedFolder
            receiveLists()
        })

        function receiveLists() {
            storage.loading = true
            lists.value = []
            listsFromFolder(1, '', selectedFolderId.value)
                .then(function (response: any) {
                    response.data.data.forEach(function (result: any) {
                        const list = mapListDataFromResponseAttributes(
                            result,
                            null
                        )
                        lists.value.push(list)
                    })
                    storage.loading = false
                })
                .catch((error: AxiosError) => {
                    console.log(error)
                    storage.setErrorFromAxios(error)
                    storage.loading = false
                })
        }

        function runMoveOrCopy() {
            if (props.copyMode) {
                doCopy()
            } else {
                doMove()
            }
        }

        function doMove() {
            if (selectedListId.value && props.itemModel) {
                storage.loading = true
                moveItem(props.itemModel, selectedListId.value)
                    .then(function (response: any) {
                        const item = mapItemFromResponseAttributes(
                            response.data.data
                        )
                        storage.deleteItem(item)
                        storage.increaseItemCounter(item.list_id)
                        storage.decreaseItemCounter(storage.selectedList?.id)
                        storage.itemsTotal--
                        storage.loading = false
                        closeMoveItem()
                    })
                    .catch((error: AxiosError) => {
                        console.log(error)
                        storage.setErrorFromAxios(error)
                        storage.loading = false
                        closeMoveItem()
                    })
            }
        }

        function doCopy() {
            if (selectedListId.value && props.itemModel) {
                storage.loading = true
                copyItem(props.itemModel, selectedListId.value)
                    .then(function (response: any) {
                        const item = mapItemFromResponseAttributes(
                            response.data.data
                        )
                        storage.increaseItemCounter(item.list_id)
                        if (item.list_id == storage.selectedList?.id) {
                            storage.addItem(item)
                        }
                        storage.loading = false
                        closeMoveItem()
                        storage.message =
                            'Item successfully copied with id: ' + item.id
                    })
                    .catch((error: AxiosError) => {
                        console.log(error)
                        storage.setErrorFromAxios(error)
                        storage.loading = false
                        closeMoveItem()
                    })
            }
        }

        function closeMoveItem() {
            emit('closeMoveItem')
        }

        const getButtonText = computed(() => (props.copyMode ? 'Copy' : 'Move'))

        return {
            storage,
            selectedFolderId,
            selectedListId,
            lists,
            receiveLists,
            closeMoveItem,
            runMoveOrCopy,
            getButtonText,
        }
    },
})
</script>

<style scoped></style>
