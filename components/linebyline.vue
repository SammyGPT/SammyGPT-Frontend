<script setup>
const props = defineProps({
    data: Object,
})
</script>

<template>
    <span class="material-symbols-outlined dark:text-white text-black fixed left-[90vw] top-[10vh] cursor-pointer" @click="$emit('close')">close</span>
    <div class="fixed left-1/2 top-1/2 w-[80vw] h-[80vh] translate-x-[-50%] translate-y-[-50%] dark:bg-accent1 bg-accent2 rounded-lg dark:border-accent3 border-white border-[2px] z-20 p-[2vw] overflow-auto">
        <div v-for="p in props.data">
            <p :class="p.label == 'Human' ? '' : 'dark:bg-yellow-800 bg-yellow-300'" class="dark:text-white text-black"> {{ p.content }} </p>
            <br>
        </div>
    </div>
</template>