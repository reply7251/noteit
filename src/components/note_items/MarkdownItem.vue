<script setup lang="ts">
import { marked } from 'marked';


const props = defineProps<{
  data?: string
}>()

const getMarkdown = computed(function() {
    return marked.parse(props.data ?? "");
})



</script>

<template>
    <div class="markdown" v-html="getMarkdown">

    </div>
</template>