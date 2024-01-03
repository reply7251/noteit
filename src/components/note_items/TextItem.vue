<script lang="ts">
import NoteItem from '../NoteItem.vue'
import handleContextMenuEvent from "@/utils/ContextMenuEvent"
import SimpleSpan from '../context_menu_actions/SimpleSpan.vue'
import type { ComponentPublicInstance } from 'vue'

export default defineComponent({
    extends: NoteItem,
    data() {
        return {
            text: "insert Text",
        }
    },
    methods: {
        contextMenu(e: MouseEvent) {
            
            handleContextMenuEvent(e, this)
            if(!e.targetComponent) {
                e.targetComponent = this;
            }
            //e.stopPropagation()
        },
        getActions(): ContextAction[] {
            return [
                {
                    component: SimpleSpan,
                    label: "example span",
                    callback(e) {
                        console.log("nothing")
                    },
                }
            ]
        }
    }
})
</script>

<template>
    <div @contextmenu="contextMenu">
        <input type="text" v-model="text" @mousedown.stop/>
        <text>{{ index }}</text>
    </div>
</template>