<template>
    <div class="team-profile">
        <img :src="img" alt="Profile Picture" class="w-300 h-300 rounded-full" />
        <div class="title">{{ title }}</div>
        <div class="name">{{ name }}</div>
        <div class="description">{{ description }}</div>
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
})
</script>
