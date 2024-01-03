<script setup lang="ts">
import NoteItem from './NoteItem.vue';
import TextItem from './note_items/TextItem.vue';
import ContextMenu from './ContextMenu.vue'
import {ref} from 'vue'

const canvas = ref(null);
</script>

<template>
    <ContextMenu v-slot="{contextmenu}">
        <div class="canvas" @contextmenu="contextmenu">
            <TextItem></TextItem>
        </div>
    </ContextMenu>
</template>

<style id="myCanvas">
.canvas {
    background-color:black;
    height: 100%;
}
</style>