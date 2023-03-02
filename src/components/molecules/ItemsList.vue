<template>
    <v-list item-title="name" item-props lines="three">
        <v-list-item
            v-for="item in storage.items"
            :key="item.id"
            :title="getItemName(item)"
            :subtitle="item.description"
        >
            <template v-slot:prepend>
                <v-list-item-action start>
                    <v-checkbox-btn
                        @change="changeDoneValue($event, item)"
                        :model-value="item.is_done"
                    ></v-checkbox-btn>
                    <v-avatar :image="getAvatar(item)"></v-avatar>
                </v-list-item-action>
            </template>
        </v-list-item>
        <atom-load-more
            v-if="storage.itemsTotal > storage.items.length"
            @click="loadMoreItems"
            >Load More</atom-load-more
        >
    </v-list>
</template>

<script lang="ts">
import { computed, PropType } from 'vue'
import ItemInterface from '@/types/ItemInterface'
import { useAppStore } from '@/store/app'
import AtomLoadMore from '@/components/atoms/AtomLoadMore.vue'
import { defineComponent } from 'vue'
import { setItemDoneOrUndone } from '@/services/Api'

export default defineComponent({
    name: 'ItemsList',
    emits: ['loadMoreItems'],
    props: {},
    components: {
        AtomLoadMore,
    },
    setup(_, { emit }) {
        const storage = useAppStore()
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
        return {
            storage,
            loadMoreItems,
            getItemName,
            getAvatar,
            changeDoneValue,
        }
    },
})
</script>

<style scoped></style>
