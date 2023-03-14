<template>
    <v-card-subtitle
        >{{ $t('items.public-title') }}</v-card-subtitle
    >
    <v-card-text>
        {{$t('items.public-description')}}
        <v-container>
            <atom-clipboard-field
                :initial-value="publicLink"
            ></atom-clipboard-field>
        </v-container>
    </v-card-text>
    <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="blue-darken-1" variant="text" @click="closeForm">
            {{$t('general.close')}}
        </v-btn>
        <v-btn color="blue-darken-1" variant="text" @click="deleteLink">
            {{ $t('items.make-unpublic') }}
        </v-btn>
    </v-card-actions>
</template>

<script lang="ts">
import { computed, defineComponent, onMounted } from 'vue'
import AtomClipboardField from '@/components/atoms/AtomClipboardField.vue'
import { useAppStore } from '@/store/app'
import { makeListPublicOrUnpublic } from '@/services/Api'
import { mapListDataFromResponse } from '@/services/ResponseDataMapper'

export default defineComponent({
    name: 'PublicLinkForm',
    emits: ['closeForm', 'deleteLink'],
    components: {
        AtomClipboardField,
    },
    setup(props, { emit }) {
        const storage = useAppStore()
        const publicLink = computed(function () {
            if (!storage.selectedList) {
                return ''
            }
            if (!storage.selectedList.link) {
                return ''
            }
            return (
                import.meta.env.VITE_BASIC_URL +
                '/public/' +
                storage.selectedList.link
            )
        })

        function closeForm() {
            emit('closeForm')
        }

        function deleteLink() {
            sendListResponse(false)
            emit('closeForm')
        }

        onMounted(function () {
            if (storage.selectedList && !storage.selectedList.link) {
                sendListResponse(true)
            }
        })

        function sendListResponse(publicValue: boolean) {
            if (!storage.selectedList) {
                return
            }
            makeListPublicOrUnpublic(storage.selectedList.id, publicValue)
                .then((response) => {
                    const newList = mapListDataFromResponse(
                        response,
                        parseInt(response.data.data.id)
                    )
                    newList.items_count = storage.selectedList?.items_count ?? 0
                    storage.addList(newList)
                    storage.selectedList = newList
                })
                .catch((error) => {
                    storage.setErrorFromAxios(error)
                })
        }

        return { closeForm, deleteLink, publicLink }
    },
})
</script>

<style scoped></style>
