<script lang="ts">


//defineOptions({inheritAttrs: false})

export default defineComponent({
    data() {
        return {
            contextMenu: {x: 0, y: 0, visible: false},
            eventData: "",
            actions: [] as ContextAction[],
            menuItems: []
        }
    },
    methods: {
        showMenu(e: MouseEvent) {
            this.contextMenu.x = e.clientX;
            this.contextMenu.y = e.clientY;
            this.contextMenu.visible = true;

            const event = e as ContextMenuEvent;

            this.actions = event.getActions?.() ?? []
            

            this.eventData = ""+(e.target as Element).tagName
            console.log(e.targetComponent)
            e.preventDefault()
            e.stopPropagation()
        },
        closeMenu() {
            this.contextMenu.visible = false;
        },
        getComponent(action: ContextAction) {
            return shallowRef(action.component)
        },
        handleClick(e: MouseEvent, action: ContextAction) {
            action.callback(e); 
            e.preventDefault();
            if(action.closeAfterCallback) {
                this.closeMenu();
            }
        }
    },
    computed: {
        getStyle() {
            return {
                left: `${this.contextMenu.x}px`,
                top: `${this.contextMenu.y}px`
            }
        },
    },
    mounted() {
        document.addEventListener("mousedown", this.closeMenu)
    },
    beforeUnmount() {
        document.removeEventListener("mousedown", this.closeMenu)
    }
});

</script>

<template>
    <slot :contextmenu="showMenu"></slot>
    <div class="contextMenu" v-show="contextMenu.visible" :style="getStyle" @mousedown.stop @contextmenu.prevent>
        <ul>
            <!-- <li>{{ eventData }}</li> -->
            <li v-for="(action,i) in actions" :key="i" @click="(e) => handleClick(e, action)">
                <component :is="{...action.component}">{{ action.label }}</component>
            </li>
        </ul>
    </div>
</template>

<style scoped>
.contextMenu {
    z-index: 1000;
    display: block;
    position: absolute;
    background-color: #252525;
    border: #e0e0e0 solid 1px;
    border-radius: 10px;
}

.contextMenu ul {
    list-style-type: none;
    display: contents;
}

.contextMenu li {
    padding: 5px;
    color: white;
}
.contextMenu li:hover {
    background-color: gray;
}
.contextMenu li:first-child {
    border-radius: 10px 10px 0px 0px;
}
.contextMenu li+li {
    border-radius: 0px 0px 0px 0px;
    border-top: 1px solid white;
}
.contextMenu li:last-child {
    border-radius: 0px 0px 10px 10px;
}
.contextMenu li:only-child {
    border-radius: 10px 10px 10px 10px;
}
</style>