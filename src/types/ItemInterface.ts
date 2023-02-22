export default interface ItemInterface {
    id: bigint
    created_at: string
    description: string
    file: string
    is_starred: boolean
    list_id: bigint
    name: string
    order: number
    price: number
    quantity: number
    quantity_type: string
    is_done: boolean
}
