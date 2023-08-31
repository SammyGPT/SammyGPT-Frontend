<template>
    <div class="absolute top-0 left-0 w-full h-full flex flex-col items-center justify-center" ref="loading">
        <img src="~assets/images/logo.png" class="w-[30vmin] z-40" ref="logo"/>
        <div class="absolute bottom-[15%] z-40 text-center">
            <h1 class="p-4 font-[Montserrat] dark:text-white text-primary text-3xl z-40 opacity-0" ref="project">Project SammyGPT</h1>
            <h2 class="p-4 font-[Montserrat] dark:text-white text-primary text-xl z-40 opacity-0" ref="founded">Created by Youwei Zhen</h2>
            <h3 class="p-4 font-[Montserrat] dark:text-white text-primary text-base z-40 opacity-0" ref="thanks">Assisted by Maximilian Shabatayev</h3>
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
const founded = ref(null)
const thanks = ref(null)
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
        onComplete: show_founder,
        ease: 'sin.out'
    })
}

const show_founder = ()=>{
    gsap.to( founded.value,{
        opacity: 1,
        duration: 0.5,
        delay: 0.15,
        onComplete: show_thanks,
        ease: 'sin.out'
    })

}

const show_thanks = ()=>{
    gsap.to( thanks.value,{
        opacity: 1,
        duration: 0.25,
        delay: 0.15,
        onComplete: minimize,
        ease: 'sin.out'
    })
}

const hide_project = ()=>{
    gsap.to( founded.value,{
        opacity: 0,
        duration: 0.25,
        ease: 'sin.out'
    })

    gsap.to( thanks.value,{
        opacity: 0,
        duration: 0.25,
        ease: 'sin.out'
    })

    gsap.to( project.value,{
        opacity: 0,
        duration: 0.25,
        ease: 'sin.out'
    })
}

onMounted(()=>{
    show_name()
})

</script>