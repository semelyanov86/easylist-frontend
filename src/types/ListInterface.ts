export default interface ListInterface {
    id: bigint
    name: string
    icon: string
    folder_id: bigint
    created_at: Date
    updated_at: Date
    items_count: number
    order: number
    link: string | null
}
