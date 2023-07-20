<template>
    <div class="absolute top-0 left-0 w-full h-full flex flex-col items-center justify-center" ref="loading">
        <img src="~assets/images/logo.png" class="w-[30vmin] z-40" ref="logo"/>
        <div class="absolute bottom-[17%] z-40 text-center">
            <h1 class="p-4 font-[Montserrat] text-primary text-3xl z-40 opacity-0" ref="project">Project SammyGPT</h1>
            <h2 class="p-4 font-[Montserrat] text-primary text-base z-40 opacity-0" ref="credits">Youwei Zhen & Maximilian Shabatayev</h2>
        </div>
        <svg class="absolute top-0 left-0 w-full h-full z-30">
            <circle cx="50%" cy="50%" r="100000" fill="white" ref="circle"/>
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
const credits = ref(null)

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
        delay: 3,
        duration: 1.8,
        onComplete: spin,
        onActivated: hide_project,
        ease: 'power1.out'
    })
}


const show_name = ()=>{
    gsap.to( project.value,{
        opacity: 1,
        duration: 0.3,
        delay: 0.15,
        onComplete: show_project,
        ease: 'sin.out'
    })
}

const show_project = ()=>{
    gsap.to( credits.value,{
        opacity: 1,
        duration: 0.3,
        delay: 0.15,
        onComplete: minimize,
        ease: 'sin.out'
    })

}

const hide_project = ()=>{
    gsap.to( credits.value,{
        opacity: 0,
        duration: 0.25,
        delay: 0.15,
        ease: 'sin.out'
    })

    gsap.to( project.value,{
        opacity: 0,
        duration: 0.25,
        delay: 0.15,
        ease: 'sin.out'
    })
}

onMounted(()=>{
    show_name()
})

</script>