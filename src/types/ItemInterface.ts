export default interface ItemInterface {
    id: number
    created_at: Date
    description: string
    file: string
    is_starred: boolean
    list_id: number
    name: string
    order: number
    price: number
    quantity: number
    quantity_type: string
    is_done: boolean
}
