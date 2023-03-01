import ListInterface from '@/types/ListInterface'
import FolderInterface from '@/types/FolderInterface'

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
