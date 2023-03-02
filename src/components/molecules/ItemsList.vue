<template>
    <v-list item-title="name" item-props lines="three">
        <draggable
            item-key="id"
            v-model="storage.items"
            @start="isDragging = true"
            @end="isDragging = false"
            @change="dropItem"
            handle=".handle"
        >
            <template #item="{ element }">
                <v-list-item
                    :key="element.id"
                    :title="getItemName(element)"
                    :subtitle="element.description"
                >
                    <template v-slot:prepend>
                        <v-list-item-action start>
                            <v-checkbox-btn
                                @change="changeDoneValue($event, element)"
                                :model-value="element.is_done"
                            ></v-checkbox-btn>
                            <v-avatar
                                :image="getAvatar(element)"
                                class="handle"
                            ></v-avatar>
                        </v-list-item-action>
                    </template>
                </v-list-item>
            </template>
        </draggable>
        <atom-load-more
            v-if="storage.itemsTotal > storage.items.length"
            @click="loadMoreItems"
            >Load More</atom-load-more
        >
    </v-list>
</template>

<script lang="ts">
import { computed, PropType, ref } from 'vue'
import ItemInterface from '@/types/ItemInterface'
import { useAppStore } from '@/store/app'
import AtomLoadMore from '@/components/atoms/AtomLoadMore.vue'
import { defineComponent } from 'vue'
import {
    setItemDoneOrUndone,
    updateOrderOfItem,
    updateOrderOfList,
} from '@/services/Api'
import { AxiosError } from 'axios'
import MovedInterface from '@/types/MovedInterface'
import draggable from 'vuedraggable'

export default defineComponent({
    name: 'ItemsList',
    emits: ['loadMoreItems'],
    props: {},
    components: {
        AtomLoadMore,
        draggable,
    },
    setup(_, { emit }) {
        const storage = useAppStore()
        const isDragging = ref(false)
        function loadMoreItems() {
            emit('loadMoreItems')
        }
        function getItemName(item: ItemInterface): string {
            if (item.quantity > 0) {
                return (
                    item.name +
                    ' (' +
                    item.quantity +
                    ' ' +
                    item.quantity_type +
                    ')'
                )
            }
            return item.name
        }
        function getAvatar(item: ItemInterface): string {
            if (item.file) {
                return import.meta.env.VITE_BASIC_URL + '/' + item.file
            }
            return ''
        }

        function changeDoneValue(event: Event, item: ItemInterface) {
            const isChecked = event.target?.checked as boolean
            setItemDoneOrUndone(item, isChecked).catch((error) => {
                console.log(error)
                storage.setErrorFromAxios(error)
                storage.loading = false
            })
        }

        function dropItem(moved: MovedInterface<ItemInterface>) {
            updateOrderOfItem(moved)
                .then(
                    () =>
                        (storage.message =
                            'Item ' +
                            moved.moved.element.name +
                            ' Successfully moved')
                )
                .catch((error: AxiosError) => {
                    storage.setErrorFromAxios(error)
                })
        }

        return {
            storage,
            loadMoreItems,
            getItemName,
            getAvatar,
            changeDoneValue,
            isDragging,
            dropItem,
        }
    },
})
</script>

<style scoped></style>
