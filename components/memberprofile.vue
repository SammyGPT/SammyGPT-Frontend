<template>
    <div class="flex items-center justify-center flex-col w-80">
        <img :src="img" alt="Profile Picture" class="w-36 h-36 rounded-full" />
        <h3 class="mt-4 font-[Didot] text-3xl dark:text-white text-black">{{ name }}</h3>
        <h2 class="font-[Montserrat] text-xl dark:text-white text-black">{{ title }}</h2>
        <p class="mt-2 font-[Raleway] text-center dark:text-white text-black">{{ description }}</p>
        <p class="mt-4 font-[Raleway] text-base text-center dark:text-white text-black">" {{ message }} "</p>
    </div>
</template>

<script setup>
defineProps({
    img: {
        type: Image,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    message: {
        type: String,
        required: true
    },
})
</script>
