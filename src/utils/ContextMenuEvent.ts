
import type { ComponentInternalInstance, ComponentPublicInstance } from "vue";

function assertType<T>(obj: any): asserts obj is T {}

export default function handleContextMenuEvent(event: MouseEvent, component: ComponentPublicInstance & {getActions(): any[]}) {
    assertType<ContextMenuEvent>(event)
    if(!event.targetComponent) {
        event.targetComponent = component;
        event.getActions = component.getActions.bind(component);
    }/*  else {
        const originalFunction = event.getActions
        event.getActions = function() {
            return originalFunction().concat(component.getActions());
        }
    } */
    
}