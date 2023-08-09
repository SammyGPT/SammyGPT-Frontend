<script setup>
import { defineProps } from 'vue';

const props = defineProps({
    progress: Number
})
function getStyle() {
    return `width: ${props.progress/2}vw;`
}
</script>

<template>
    <div id="loading mx-auto">
        <div class="min-w-[50vw] h-4 bg-slate-700 rounded-lg absolute left-[25vw]"></div>
        <div class="h-4 bg-blue-500 rounded-lg absolute left-[25vw] z-10 transition-[1s]" :style="getStyle()"></div>
    </div>
</template>

<style scoped>

@media (max-width: 1200px) {
    .block-width{
        width: 90vw;
    }
}

</style>