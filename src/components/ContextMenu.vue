<script lang="ts">
import { defineComponent, ref, watch, reactive, computed } from 'vue';


const contextMenu = reactive({x: 0, y: 0, visible: false});

const eventData = ref<string|null>(null);

function showMenu(e: MouseEvent) {
    eventData.value = ""+(e.target as Element).tagName
    console.log(e.target)
    
    contextMenu.x = e.clientX;
    contextMenu.y = e.clientY;
    contextMenu.visible = true;

    e.preventDefault()
    e.stopPropagation()
}

function closeMenu() {
    contextMenu.visible = false;
}

const menuItems = reactive([]);


const getStyle = computed(() => {
    return {
        left: `${contextMenu.x}px`,
        top: `${contextMenu.y}px`
    }
})

//defineOptions({inheritAttrs: false})

export default defineComponent({
    data() {
        return {
            contextMenu,
            getStyle,
            eventData,
            menuItems
        }
    },
    methods: {
        showMenu,
    },
    mounted() {
        document.addEventListener("mousedown", closeMenu)
    },
    beforeUnmount() {
        document.removeEventListener("mousedown", closeMenu)
    },
});

</script>

<template>
    <slot :contextmenu="showMenu"></slot>
    <div class="contextMenu" v-show="contextMenu.visible" :style="getStyle" @mousedown.stop @contextmenu.prevent>
        <ul>
            <li>{{ eventData }}</li>
            <li>something</li>
            <li>something</li>
            <li>something</li>
        </ul>
    </div>
</template>

<style>
.contextMenu {
    z-index: 1000;
    display: block;
    position: absolute;
    background-color: #252525;
}

.contextMenu ul {
    list-style-type: none;
    
    display: contents;
}

.contextMenu li {
    padding: 5px;
    color: white
}
.contextMenu li+li {
    border-top: 1px solid white;
}
</style>