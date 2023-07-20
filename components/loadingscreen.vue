<template>
    <div class="absolute top-0 left-0 w-full h-full flex items-center justify-center" ref="loading">
        <img src="~assets/images/logo.png" class="w-[25vmin] z-40" ref="logo"/>
        <svg class="absolute top-0 left-0 w-full h-full z-30">
            <circle cx="50%" cy="50%" r="1000" fill="white" ref="circle"/>
        </svg>
    </div>
</template>

<script setup>

import gsap from 'gsap'
import { ref, onMounted, reactive } from 'vue'

const circle = ref(null)
const logo = ref(null)
const loading = ref(null)

const hide = ()=>{
    loading.value.style.display = "none"
}

const spin = ()=>{
    gsap.to( logo.value,{
        rotation: 360,
        duration: 1,
        opacity:0,
        onComplete: hide,
        ease: "sin.out"
    })
}

const minimize = ()=>{
    gsap.to( circle.value,{
        r: 0,
        duration: 1.8,
        onComplete: spin,
        ease: 'CustomEase.create("custom", "M0,0,C0.07,0.137,0,0.389,0.28,0.64,0.413,0.76,0.835,1,1,1")'
    })
}

onMounted(()=>{
    minimize()
})

</script>