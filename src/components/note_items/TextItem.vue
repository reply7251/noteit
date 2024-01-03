<script setup lang="ts">
import { defineComponent, ref } from 'vue';
import NoteItem from '../NoteItem.vue'

defineComponent({
    extends: NoteItem,
})

const text = ref("insert Text");

</script>

<template>
    <input type="text" v-model="text"/>
    <text>{{ text }}</text>
</template>