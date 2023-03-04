import ListInterface from '@/types/ListInterface'
import FolderInterface from '@/types/FolderInterface'
import ItemInterface from '@/types/ItemInterface'
// @ts-ignore
import imageToBase64 from 'image-to-base64/browser'

export function mapListDataFromResponse(
    response: any,
    id: number
): ListInterface {
    const listModel: ListInterface = {
        id: id,
        icon: response.data.data.attributes.icon as string,
        name: response.data.data.attributes.name as string,
        folder_id: response.data.data.attributes.folder_id as number,
        order: response.data.data.attributes.order as number,
        created_at: new Date(response.data.data.attributes.created_at),
        updated_at: new Date(response.data.data.attributes.updated_at),
        items_count: response.data.data.attributes.items_count ?? 0,
        link: response.data.data.attributes.link as string,
    }

    return listModel
}

export function mapFolderDataFromResponseAttributes(
    response: any
): FolderInterface {
    const folder: FolderInterface = {
        id: parseInt(response.id),
        name: response.attributes.name,
        icon: response.attributes.icon,
        order: response.attributes.order,
        created_at: new Date(response.attributes.created_at),
        updated_at: new Date(response.attributes.updated_at),
    }
    return folder
}

export function mapItemFromResponseAttributes(response: any): ItemInterface {
    const item: ItemInterface = {
        id: parseInt(response.id),
        created_at: new Date(response.attributes.created_at),
        description: response.attributes.description,
        name: response.attributes.name,
        file: response.attributes.file,
        is_starred: response.attributes.is_starred,
        list_id: response.attributes.list_id,
        order: response.attributes.order,
        price: response.attributes.price,
        quantity: response.attributes.quantity,
        quantity_type: response.attributes.quantity_type,
        is_done: response.attributes.is_done,
    }
    return item
}

export function mapItemsDataFromResponse(responseData: any): ItemInterface[] {
    const result = [] as ItemInterface[]
    responseData.data.forEach((response: any) =>
        result.push(mapItemFromResponseAttributes(response))
    )
    return result
}

export function fileConverter(
    blob: Blob
): Promise<string | ArrayBuffer | null> {
    return new Promise((resolve, reject) => {
        const reader = new FileReader()
        reader.onerror = reject
        reader.onload = () => {
            resolve(reader.result)
        }
        reader.readAsDataURL(blob)
    })
}

export function convertImageToBase64(imgUrl: string): Promise<string> {
    return imageToBase64(import.meta.env.VITE_BASIC_URL + imgUrl)
}
