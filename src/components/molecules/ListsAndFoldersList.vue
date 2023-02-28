<template>
    <v-list lines="two">
        <atom-subheader text="Folders" />

        <draggable
            item-key="id"
            v-model="storage.folders"
            @start="isDragging = true"
            @end="isDragging = false"
            @change="dropFolder"
            handle=".handle"
        >
            <template #item="{ element }">
                <v-list-item
                    :key="element.id"
                    :title="element.name"
                    :subtitle="element.created_at.toDateString()"
                    @click="folderSelected(element)"
                >
                    <template v-slot:prepend>
                        <v-avatar color="grey-lighten-1" class="handle">
                            <atom-icon
                                color="default"
                                :icon="element.icon"
                            ></atom-icon>
                        </v-avatar>
                    </template>

                    <template v-slot:append>
                        <folder-submenu
                            @edit-folder="editFolder(element.id)"
                        ></folder-submenu>
                    </template>
                </v-list-item>
            </template>
        </draggable>
        <atom-load-more v-if="nextFolder" @click="loadMoreFolders"
            >Load More</atom-load-more
        >

        <atom-divider inset></atom-divider>

        <atom-subheader text="Lists" />
        <draggable
            item-key="id"
            v-model="storage.lists"
            @start="isDragging = true"
            @end="isDragging = false"
            @change="dropList"
            handle=".handle"
        >
            <template #item="{ element }">
                <v-list-item
                    :key="element.id"
                    :title="element.name"
                    :subtitle="listSubtitle(element)"
                >
                    <template v-slot:prepend>
                        <v-avatar color="default" class="handle">
                            <atom-icon
                                color="default"
                                :icon="element.icon"
                            ></atom-icon>
                        </v-avatar>
                    </template>

                    <template v-slot:append>
                        <list-submenu
                            @edit-list="editList(element.id)"
                        ></list-submenu>
                    </template>
                </v-list-item>
            </template>
        </draggable>
        <atom-load-more v-if="nextList" @click="loadMoreLists"
            >Load More</atom-load-more
        >
    </v-list>
</template>

<script lang="ts">
import FolderInterface from '@/types/FolderInterface'
import ListInterface from '@/types/ListInterface'
import { computed, PropType, ref, WritableComputedRef } from 'vue'
import FolderSubmenu from '@/components/molecules/FolderSubmenu.vue'
import AtomIcon from '@/components/atoms/AtomIcon.vue'
import AtomSubheader from '@/components/atoms/AtomSubheader.vue'
import AtomDivider from '@/components/atoms/AtomDivider.vue'
import ListSubmenu from '@/components/molecules/ListSubmenu.vue'
import AtomLoadMore from '@/components/atoms/AtomLoadMore.vue'
import { defineComponent } from 'vue'
import { useAppStore } from '@/store/app'
import draggable from 'vuedraggable'
import MovedInterface from '@/types/MovedInterface'
import { updateOrderOfFolder, updateOrderOfList } from '@/services/Api'
import { AxiosError } from 'axios/index'
import router from '@/router'

export default defineComponent({
    emits: [
        'loadMoreFolders',
        'loadMoreLists',
        'editFolder',
        'editList',
        'folderSelected',
    ],
    name: 'ListsAndFoldersList',
    components: {
        AtomIcon,
        AtomSubheader,
        AtomDivider,
        FolderSubmenu,
        ListSubmenu,
        AtomLoadMore,
        draggable,
    },
    props: {
        nextFolder: Boolean,
        nextList: Boolean,
    },
    setup(props, { emit }) {
        const storage = useAppStore()
        const isDragging = ref(false)

        function listSubtitle(list: ListInterface): string {
            return list.items_count + ' items'
        }
        function loadMoreFolders() {
            emit('loadMoreFolders')
        }
        function loadMoreLists() {
            emit('loadMoreLists')
        }
        function editFolder(id: Number) {
            emit('editFolder', id)
        }
        function editList(id: Number) {
            emit('editList', id)
        }

        const dragOptions = computed(() => {
            return {
                animation: 0,
                group: 'description',
                disabled: false,
                ghostClass: 'ghost',
            }
        })

        function dropFolder(moved: MovedInterface<FolderInterface>) {
            updateOrderOfFolder(moved)
                .then(
                    () =>
                        (storage.message =
                            'Folder ' +
                            moved.moved.element.name +
                            ' Successfully moved')
                )
                .catch((error: AxiosError) => {
                    storage.setErrorFromAxios(error)
                })
        }

        function dropList(moved: MovedInterface<ListInterface>) {
            updateOrderOfList(moved)
                .then(
                    () =>
                        (storage.message =
                            'List ' +
                            moved.moved.element.name +
                            ' Successfully moved')
                )
                .catch((error: AxiosError) => {
                    storage.setErrorFromAxios(error)
                })
        }

        function folderSelected(folder: FolderInterface) {
            emit('folderSelected', folder)
        }

        return {
            listSubtitle,
            loadMoreFolders,
            loadMoreLists,
            editFolder,
            editList,
            storage,
            dragOptions,
            isDragging,
            dropFolder,
            dropList,
            folderSelected,
        }
    },
})
</script>

<style scoped></style>
