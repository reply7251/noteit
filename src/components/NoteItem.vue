<script lang="ts">

const childrenIDs: string[] = reactive([]);


export default {
    data() {
        return {
            children: {
                identifiers: childrenIDs
            }
        }
    }
}

</script>

<template>
    <div>NoteItem</div>
</template>