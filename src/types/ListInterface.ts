export default interface ListInterface {
    id: number | string
    name: string
    icon: string
    folder_id: number
    created_at: Date
    updated_at: Date
    items_count: number
    order: number
    link: string | null
}
