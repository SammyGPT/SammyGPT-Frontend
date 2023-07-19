<template>
    <button class="bg-gray-700 hover:bg-green-700 text-white font-bold py-2 px-4 border border-gray-700 rounded" @click="selected" ref="button">
        {{text}}
    </button>
</template>

<script setup>

const props = defineProps({
    selected: Boolean,
    text: String
})
const emit = defineEmits(['clicked'])
const button = ref(null)
var state = reactive(props.selected)

// Internal click
const selected = ()=>{
    state = !state
    button.value.classList.toggle("selected")
    emit("clicked")
}

// External click
const click = ()=>{
    state = !state
    button.value.classList.toggle("selected")
}

const reset = ()=>{
    state = false
    button.value.classList.remove("selected")
}

defineExpose({
    click, reset
})
</script>

<style scoped>

.selected{
    background-color: rgb(14, 153, 14) !important;
}

.selected:hover{
    background-color: rgb(90, 110, 90) !important;
}

</style>