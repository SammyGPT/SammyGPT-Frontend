<script setup>
const props = defineProps({
    main: { type: Element, required: true },
    darkMode: Boolean
})

const emit = defineEmits(['darkMode'])

function handleTheme() {
    if (props.main.classList.contains('dark')) {
        props.main.classList.remove('dark')
        localStorage.theme = "light"
    }
    else {
        localStorage.theme = "dark"
        props.main.classList.add('dark')
    }
    emit('darkMode', main.classList.contains('dark'))
}
</script>

<template>
    <div v-if="darkMode" class="flex items-center justify-center cursor-pointer gap-2 text-white" @click="handleTheme()">
        <span class="material-symbols-outlined h-full text-[2rem]">light_mode</span>
        <span class="h-full align-middle text-[1rem] ">{{ $t('side-menu-switch-light-mode') }}</span>
    </div>
    <div v-else class="flex items-center justify-center cursor-pointer gap-3 text-black" @click="handleTheme()">
        <span class="material-symbols-outlined h-full text-[2rem]">dark_mode</span>
        <span class="h-full align-middle text-[1rem]" >{{ $t('side-menu-switch-dark-mode') }}</span>
    </div>
</template>