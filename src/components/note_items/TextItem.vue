<script lang="ts">
import NoteItem from '../NoteItem.vue'
import handleContextMenuEvent from "@/utils/ContextMenuEvent"
import SimpleSpan from '../context_menu_actions/SimpleSpan.vue'
import type { ComponentPublicInstance } from 'vue'
import MarkdownItem from './MarkdownItem.vue'
import IconEye from '../icons/IconEye.vue'
import IconEdit from '../icons/IconEdit.vue'

export default defineComponent({
    extends: NoteItem,
    data() {
        return {
            data: "insert Text",
            edit: true,
            preview: true,
        };
    },
    methods: {
        contextMenu(e: MouseEvent) {
            handleContextMenuEvent(e, this);
            if (!e.targetComponent) {
                e.targetComponent = this;
            }
        },
        getActions(): ContextAction[] {
            return [
                {
                    component: SimpleSpan,
                    label: "example span",
                    callback(e) {
                        console.log("nothing");
                    },
                }
            ];
        },
        toggleEdit() {
            this.edit = !this.edit;
        },
        togglePreview() {
            this.preview = !this.preview;
        },
        getPreview() {
            return this.data;
        }
    },
    computed: {
        opacityEditIcon() {
            return this.edit ? {} : {opacity: '20%'};
        },
        opacityPreviewIcon() {
            return this.preview ? {} : {opacity: '20%'};
        },
    },
    components: { MarkdownItem, IconEye, IconEdit }
})
</script>

<template>
    <div @contextmenu="contextMenu">
        <IconEdit @click="toggleEdit" :style="opacityEditIcon"></IconEdit><IconEye @click="togglePreview" :style="opacityPreviewIcon"></IconEye><br>
        <div class="flex">
            <textarea v-show="edit" type="text" aria-multiline="true" v-model="data" @mousedown.stop/>
            <MarkdownItem v-show="preview" :data="data">{{ getPreview() }}</MarkdownItem>
        </div>
    </div>
</template>

<style scoped>
svg {
    float: right;

    color: white;
}

div {
    padding: 5px;
    background-color: #202020;
    border-radius: 5px;
}
div > * {
    margin: 2px;
}

*:focus {
    outline: none;
}

div > .flex {
    display: flex;
}

.markdown {
    border: 1px solid white;
    border-radius: 5px;
    color: white
}
</style>