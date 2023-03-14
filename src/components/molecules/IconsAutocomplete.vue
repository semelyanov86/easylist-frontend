<template>
    <v-autocomplete
        v-model="selectedIcon"
        :items="filteredIcons"
        v-model:search-input="search"
        item-value="name"
        item-text="name"
        :label="$t('lists.choose-icon')"
        outlined
    >
        <template v-slot:item="{ item }">
            <v-icon>{{ item.icon }}</v-icon>
            <span>{{ item.name }}</span>
        </template>
    </v-autocomplete>
</template>

<script lang="ts">
import { computed, defineComponent, ref, watch } from 'vue'
import iconsData from '@/data/icons.json'
import IconInterface from '@/types/IconIterface'
import ShortIconInterface from '@/types/ShortIconInterface'

export default defineComponent({
    name: 'IconsAutocomplete',
    emits: ['selected'],
    setup(_, { emit }) {
        const icons = ref<ShortIconInterface[]>([]) // Array to store all the available icons
        const search = ref('') // User's search input
        const selectedIcon = ref(null) // Selected icon object

        // Format the icons data for display in the autocomplete
        const formatIcons = (icons: IconInterface[]): ShortIconInterface[] => {
            return icons.map((icon: IconInterface) => ({
                name: 'mdi-' + icon.name,
                icon: String.fromCharCode(parseInt(icon.codepoint, 16)), // Convert the codepoint to a Unicode character
            }))
        }

        // Get all the available icons from the icons data and format them for display in the autocomplete
        const getAllIcons = () => {
            icons.value = formatIcons(iconsData)
        }

        // Filter the icons based on the user's search input
        const filteredIcons = computed(() => {
            return icons.value.filter((icon) =>
                icon.name.toLowerCase().includes(search.value.toLowerCase())
            )
        })

        // When the selected icon changes, emit the icon object to the parent component
        watch(selectedIcon, (newVal) => {
            emit('selected', newVal)
        })

        // Call getAllIcons when the component is created
        getAllIcons()

        return {
            icons,
            search,
            selectedIcon,
            filteredIcons,
        }
    },
})
</script>

<style scoped></style>
