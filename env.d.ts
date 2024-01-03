/// <reference types="vite/client" />


interface Event {
    targetComponent: ComponentPublicInstance
}

interface ContextAction {
    component: Component
    label: string
    callback(e: MouseEvent)
    closeAfterCallback?: boolean
}

interface ContextMenuEvent extends PointerEvent {
    getActions: ()=>ContextAction[]
}


type Item = {
    tag: string;
    id: string;
}