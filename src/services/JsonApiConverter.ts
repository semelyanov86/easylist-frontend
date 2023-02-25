import FolderInterface from '@/types/FolderInterface'
import ListInterface from '@/types/ListInterface'
import { DocumentObject } from 'jsonapi-fractal'
import { serialize } from 'jsonapi-fractal'

export default function serializeToJsonApi<DataType>(
    entity: DataType,
    typeData: string
): DocumentObject {
    return serialize(entity, typeData)
}
