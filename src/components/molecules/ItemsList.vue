<template>
    <v-list item-title="name" item-props lines="three">
        <v-list-item
            v-for="item in storage.items"
            :key="item.id"
            :title="item.name"
            :subtitle="item.description"
        >
            <template v-slot:prepend="{ is_done }">
                <v-list-item-action start>
                    <v-checkbox-btn :model-value="is_done"></v-checkbox-btn>
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
import { PropType } from 'vue'
import ItemInterface from '@/types/ItemInterface'
import { useAppStore } from '@/store/app'
import AtomLoadMore from '@/components/atoms/AtomLoadMore.vue'
import { defineComponent } from 'vue'

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
        return { storage, loadMoreItems }
    },
})
</script>

<style scoped></style>
