<template>
    <div class="absolute top-0 left-0 w-full h-full flex flex-col items-center justify-center" ref="loading">
        <img src="~assets/images/logo.png" class="w-[30vmin] z-40" ref="logo"/>
        <div class="absolute bottom-[15%] z-40 text-center">
            <h1 class="p-4 font-[Montserrat] dark:text-white text-primary text-3xl z-40 opacity-0" ref="project">{{ $t("loading-name") }}</h1>
            <h2 class="p-4 font-[Montserrat] dark:text-white text-primary text-xl z-40 opacity-0" ref="message">{{ $t('loading-message') }}</h2>
        </div>
        <svg class="absolute top-0 left-0 w-full h-full z-30">
            <circle cx="50%" cy="50%" r="100000" :fill="getBackground()" ref="circle"/>
        </svg>
    </div>
</template>

<script setup>

import gsap from 'gsap'
import { ref, onMounted, reactive } from 'vue'

const circle = ref(null)
const logo = ref(null)
const loading = ref(null)
const project = ref(null)
const message = ref(null)
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

const getBackground = ()=>{
    if (localStorage.theme == "light") return "white"
    else if (localStorage.theme == "dark") return "#15181c"
    else if (window.matchMedia) { // if preference exists
        if (window.matchMedia('(prefers-color-scheme: dark)').matches){ // dark mode
            localStorage.theme = "dark"
            return "#15181c"
        }else{ // do nothing as it is light mode preference
            localStorage.theme = "light"
            return "white"
        }
    }
}

const minimize = ()=>{
    gsap.to( circle.value,{
        r: 0,
        delay: 1.5,
        duration: 1.5,
        onComplete: spin,
        onActivated: hide_project,
        ease: 'expo.out'
    })
}

const show_name = ()=>{
    gsap.to( project.value,{
        opacity: 1,
        duration: 0.25,
        onComplete: show_message,
        ease: 'sin.out'
    })
}

const show_message = ()=>{
    gsap.to( message.value,{
        opacity: 1,
        duration: 0.25,
        onComplete: minimize,
        ease: 'sin.out'
    })
}

const hide_project = ()=>{

    gsap.to( project.value,{
        opacity: 0,
        duration: 0.15,
        ease: 'sin.out'
    })

    gsap.to( message.value,{
        opacity: 0,
        duration: 0.15,
        onComplete: minimize,
        ease: 'sin.out'
    })
}

onMounted(()=>{
    show_name()
})

</script>

<style>
body{
    overflow-y:hidden
}
</style>