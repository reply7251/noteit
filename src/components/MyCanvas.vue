<script lang="ts">
import handleContextMenuEvent from '@/utils/ContextMenuEvent';
import ContextMenu from './ContextMenu.vue';
import NoteItem from './NoteItem.vue';
import TextItem from './note_items/TextItem.vue';
import SimpleSpan from './context_menu_actions/SimpleSpan.vue';
import { useCounterStore } from '@/stores/counter';


export default {
    data() {
        return {
            children: [] as {id: string}[],
            counter: useCounterStore()
        }
    },
    mounted() {
        this.addItem()
    },
    methods: {
        contextMenu(e: MouseEvent) {
            handleContextMenuEvent(e, this);
        },
        getActions(): ContextAction[] {
            return [{component: SimpleSpan, label: "addItem", callback: this.addItem.bind(this)}]
        },
        addItem() {
            this.children.push({ id: ""+this.counter.getAndIncrement() });
        },
        remove(index: number) {
            this.children.splice(index,1);
        },
    },
    components: {ContextMenu, NoteItem}
}


</script>

<template>
    <ContextMenu>
        <div class="canvas" @contextmenu="contextMenu">
            <NoteItem v-for="(value, index) in children" :key="value.id" :index="index" :removeFromParent="remove"></NoteItem>
        </div>
    </ContextMenu>
</template>

<style scoped>
.canvas {
    background-color:black;
    height: 100%;
}
</style>