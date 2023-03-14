<template>
    <v-card-text>
        <v-container>
            <v-row>
                <v-col cols="12">
                    <v-text-field
                        :label="$t('items.name')"
                        required
                        v-model="itemModel.name"
                    ></v-text-field>
                </v-col>
                <v-col cols="12">
                    <v-text-field
                        :label="$t('items.description')"
                        v-model="itemModel.description"
                    ></v-text-field>
                </v-col>
                <v-col cols="12">
                    <v-text-field
                        :label="$t('items.quantity')"
                        v-model.number="itemModel.quantity"
                        type="number"
                    ></v-text-field>
                </v-col>
                <v-col cols="12">
                    <v-text-field
                        :label="$t('items.quantity-type')"
                        v-model="itemModel.quantity_type"
                    ></v-text-field>
                </v-col>
                <v-col cols="12">
                    <v-text-field
                        :label="$t('items.price')"
                        v-model.number="itemModel.price"
                        :rules="[
                            (v) => !isNaN(v) || $t('items.price-validation'),
                        ]"
                    ></v-text-field>
                </v-col>
                <v-col cols="12">
                    <v-file-input
                        accept="image/png, image/jpeg"
                        clearable
                        :label="$t('items.file')"
                        v-model="file"
                    ></v-file-input>
                </v-col>
            </v-row>
        </v-container>
        <small>{{$t('general.fields-required')}}</small>
    </v-card-text>
    <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="blue-darken-1" variant="text" @click="closeItem">
            {{$t('general.close')}}
        </v-btn>
        <v-btn color="blue-darken-1" variant="text" @click="saveItem">
            {{$t('general.save')}}
        </v-btn>
    </v-card-actions>
</template>

<script lang="ts">
import { computed, defineComponent, onMounted, ref } from 'vue'
import { getItemById } from '@/services/Api'
import { useAppStore } from '@/store/app'
import {
    convertImageToBase64,
    fileConverter,
    mapItemFromResponseAttributes,
} from '@/services/ResponseDataMapper'
import ItemInterface from '@/types/ItemInterface'

export default defineComponent({
    name: 'EditItemForm',
    emits: ['saveItem', 'closeItem'],
    props: {
        itemId: Number,
    },
    components: {},
    setup(props, { emit }) {
        const storage = useAppStore()
        let listId: number
        if (typeof storage.selectedList?.id === 'string') {
            listId = parseInt(storage.selectedList.id)
        } else {
            listId = storage.selectedList?.id ?? 0
        }

        const itemModel = ref<ItemInterface>({
            id: 0,
            name: '',
            description: '',
            file: '',
            is_starred: false,
            list_id: listId,
            price: 0,
            quantity: 0,
            quantity_type: '',
            order: 1,
            is_done: false,
            created_at: new Date(),
        })

        const file = ref<File[]>([])

        onMounted(function () {
            if (!props.itemId || props.itemId < 1) {
                return
            }
            storage.loading = true
            getItemById(props.itemId)
                .then((response) => {
                    itemModel.value = mapItemFromResponseAttributes(
                        response.data.data
                    )
                    if (itemModel.value.file) {
                        convertImageToBase64(itemModel.value.file)
                            .then(
                                (response) => (itemModel.value.file = response)
                            )
                            .catch((error) => {
                                console.log(error)
                            })
                    }

                    storage.loading = false
                })
                .catch((error) => {
                    console.log(error)
                    storage.setErrorFromAxios(error)
                    storage.loading = false
                })
        })

        function saveItem() {
            if (file.value && file.value.length > 0) {
                fileConverter(file.value[0])
                    .then(function (value: string | ArrayBuffer | null) {
                        if (typeof value === 'string') {
                            const tmp = value.split(',')
                            itemModel.value.file = tmp[1]
                        }
                        emit('saveItem', itemModel.value)
                    })
                    .catch((error) => {
                        console.log(error)
                        storage.setErrorFromAxios(error)
                        emit('saveItem', itemModel.value)
                    })
            }
            emit('saveItem', itemModel.value)
        }
        function closeItem() {
            emit('closeItem')
        }

        return { saveItem, closeItem, itemModel, storage, file }
    },
})
</script>

<style scoped></style>
