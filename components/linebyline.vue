<script setup>
const props = defineProps({
    data: Object,
})
</script>

<template>
    <span class="material-symbols-outlined dark:text-white text-black fixed left-[90vw] top-[10vh] cursor-pointer" @click="$emit('close')">close</span>
    <div class="fixed left-1/2 top-1/2 w-[80vw] h-[80vh] translate-x-[-50%] translate-y-[-50%] dark:bg-accent1 bg-accent2 rounded-lg dark:border-accent3 border-white border-[2px] z-20 p-[2vw] overflow-auto">
        <div v-for="p in props.data">
            <!-- <div v-if="p.label == 'AI'" class="text-2xl bg-amber-100 w-fit rounded-md p-4 pb-1 pt-1 mb-2">AI detected here: {{ Math.round(p.score*10000)/100 }}% confidence</div> -->
            <div v-if="p.label.toLowerCase() == 'ai'" class="text-2xl bg-amber-100 w-fit rounded-md p-4 pb-1 pt-1 mb-2">{{ p.message }}</div>
            <div v-else-if="p.label.toLowerCase() == 'undetermined'" class="text-2xl bg-amber-200 w-fit rounded-md p-4 pb-1 pt-1 mb-2">{{ p.message }}</div>
            <p 
                :class="p.label.toLowerCase() == 'human' ? '' : p.label.toLowerCase() == 'undetermined' ? 'dark:bg-violet-800 bg-violet-300' : 'dark:bg-yellow-800 bg-yellow-400'"  
                class="dark:text-white text-black font-[Montserrat]"> {{ p.content }} 
            </p>
            <br>
        </div>
    </div>
</template>