<template>
    <button class="dark:bg-gray-700 bg-light-background dark:hover:bg-green-700 hover:bg-green-700 dark:text-white font-bold py-2 px-4 border dark:border-gray-700 border-light-background rounded" @click="selected" ref="button">
        {{text}}
    </button>
</template>

<script setup>

const props = defineProps({
    selected: Boolean,
    toggle_button: Boolean,
    text: String,
    nonClickable: Boolean
})
const emit = defineEmits(['clicked'])
const button = ref(null)
var state = reactive(props.selected)

// Internal click
const selected = ()=>{
    if (props.nonClickable) {return}
    if (props.toggle_button){
        state = !state
        button.value.classList.toggle("selected")
    }
    emit("clicked")
}

// External click
const click = ()=>{
    if (props.toggle_button){
        state = !state
        button.value.classList.toggle("selected")
    }
}

const reset = ()=>{
    state = false
    button.value.classList.remove("selected")
}

onMounted(()=>{
    if (props.selected){
        click()
    }
})

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