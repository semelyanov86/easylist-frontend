<template>
    <v-toolbar color="secondary">
        <v-btn
            variant="text"
            icon="mdi-arrow-left"
            @click="onClickBackButton"
            v-if="showBackButton"
        ></v-btn>
        <atom-toolbar-title><slot name="header"></slot></atom-toolbar-title>

        <atom-spacer v-if="!searchActive" />

        <v-text-field
            class="mt-5"
            clearable
            label="Start typing to search"
            v-if="searchActive"
            variant="solo"
            v-model="searchValue"
            persistent-clear
            @click:clear="onClear"
        ></v-text-field>

        <v-btn
            variant="text"
            icon="mdi-magnify"
            @click="searchActive = !searchActive"
        ></v-btn>
        <slot name="actions"></slot>
    </v-toolbar>
</template>

<script lang="ts">
import AtomToolbarTitle from '@/components/atoms/AtomToolbarTitle.vue'
import AtomSpacer from '@/components/atoms/AtomSpacer.vue'
import { ref, defineComponent, computed } from 'vue'

export default defineComponent({
    name: 'Toolbar',
    emits: ['search', 'backClick'],
    components: {
        AtomToolbarTitle,
        AtomSpacer,
    },
    props: {
        showBackButton: Boolean,
    },
    setup(props, { emit }) {
        const searchActive = ref(false)
        const searchInput = ref('')

        const searchValue = computed({
            get: () => searchInput.value,
            set: function (value) {
                searchInput.value = value
                emit('search', value)
            },
        })

        function onClear() {
            searchInput.value = ''
            emit('search', '')
        }

        function onClickBackButton() {
            emit('backClick')
        }

        return {
            searchActive,
            searchInput,
            searchValue,
            onClear,
            onClickBackButton,
        }
    },
})
</script>

<style scoped></style>
