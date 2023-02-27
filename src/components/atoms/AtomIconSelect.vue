<template>
    <v-select
        :items="listIcons"
        label="Icon*"
        required
        :menu-props="{
            closeOnClick: true,
            closeOnContentClick: true,
        }"
    >
        <template #selection="{ item }">
            <v-avatar left>
                <v-icon>{{ item.value }}</v-icon>
            </v-avatar>
            <span>{{ item.value }}</span>
        </template>
        <template #item="{ item }">
            <v-list-item
                @click="$emit('update:modelValue', item.value)"
                :prepend-icon="item.value"
                :title="item.value"
                :value="item.value"
                v-bind="$attrs"
            >
            </v-list-item>
        </template>
    </v-select>
</template>

<script lang="ts">
import { ref } from 'vue'
import { defineComponent } from 'vue'

export default defineComponent({
    name: 'AtomIconSelect',
    setup() {
        const listIcons = ref([
            'mdi-folder',
            'mdi-folder-multiple',
            'mdi-folder-home',
            'mdi-folder-image',
            'mdi-ab-testing',
            'mdi-view-list',
            'mdi-airplane',
            'mdi-alarm-panel',
            'mdi-animation',
            'mdi-application',
            'mdi-audio-video',
            'mdi-baguette',
            'mdi-barley',
            'mdi-beer',
            'mdi-blender',
            'mdi-bottle-soda',
            'mdi-bottle-wine',
            'mdi-cake',
            'mdi-candy',
            'mdi-carrot',
            'mdi-cheese',
            'mdi-coffee',
            'mdi-cookie',
            'mdi-cup',
            'mdi-food',
            'mdi-food-apple',
            'mdi-food-drumstick',
            'mdi-food-turkey',
            'mdi-water',
            'mdi-silverware',
            'mdi-shaker',
        ])

        return { listIcons }
    },
})
</script>

<style scoped></style>
