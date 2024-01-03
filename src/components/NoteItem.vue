<script lang="ts">
import handleContextMenuEvent from '@/utils/ContextMenuEvent';
import DragableItem from './DragableItem.vue';
import SimpleSpan from './context_menu_actions/SimpleSpan.vue';
import {useCounterStore} from '@/stores/counter';



const components: Map<string, Component> = new Map();
const testItem = {identifier: "test02", tag: "TextItem"}

export default {
    mounted() {
        this.addItem();
    },
    data() {
        return {
            children: reactive<Item[]>([]),
            testItem: testItem,
            counter: useCounterStore()
        };
    },
    props:{
        index: Number,
        removeFromParent: Function,
        draggable: {
            type: Boolean,
            default: true
        }
    },
    methods: {
        getTag(item: Item) {
            const tag = item.tag;
            if (components.has(tag)) {
                return components.get(tag);
            }
            else {
                const component = defineAsyncComponent(() => import(`@/components/note_items/${tag}.vue`));
                components.set(tag, component);
                return component;
            }
        },
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
                    label: "addItem", 
                    callback: this.addItem.bind(this)
                },{
                    component: SimpleSpan,
                    label: "remove",
                    callback: this.tryRemove.bind(this),
                    closeAfterCallback: true
                }
        ]
        },
        addItem() {
            this.children.push({ tag: "TextItem", id: "TextItem"+this.counter.getAndIncrement() });
        },
        remove(index: number) {
            this.children.splice(index,1);
        },
        tryRemove() {
            //this.removeFromParent?.();
            this.removeFromParent?.(this.index);
        }
    },
    components: { DragableItem }
}


</script>

<template>
    <DragableItem :enabled="draggable" @contextmenu="contextMenu" @contextmenu.prevent >
        <div class="note-item">
            <component v-for="(value, index) in children" :key="value.id" :is="getTag(value)" :removeFromParent="remove" :index="index"></component>
        </div>
    </DragableItem>
</template>

<style scoped>
.draggable {
    opacity: 90%;
    background-color: #303030;
}
.note-item {
    min-width: 100px;
    min-height: 50px;
}

</style>