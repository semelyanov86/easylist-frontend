export default interface MovedInterface<Type> {
    moved: BasicMovedInterface<Type>
}

interface BasicMovedInterface<Type> {
    element: Type
    newIndex: number
    oldIndex: number
}
