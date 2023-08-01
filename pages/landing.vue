<template>
    <div class="h-[100vh] dark:bg-black bg-white pl-[7vh] pr-[7vh] overflow-hidden">
        <div class="w-full flex items-start justify-star">
            <Logo/>
        </div>
        <div class="dark:bg-primary bg-accent2 w-full h-full p-2 rounded-[5vh]">
            <div class="w-full flex flex-col justify-center items-center p-24">
                <h1 class="text-[3rem] text-center font-[Raleway] dark:text-white text-black hidden">Artificial Intelligence for Staten Island Technical High School.</h1>
                <h2 class="text-[4.5vw] text-center font-[Raleway] dark:text-white text-black" ref="landing_msg"></h2>
            </div>
            <div class="flex justify-around">
                <div class="text-center text-black dark:text-white dark:bg-gray-700 bg-light-background p-8 rounded-lg">
                    <h2 class="">SammyGPT</h2>
                    <p>an amazing ai assistant</p>
                </div>
                <div
                    class="text-center text-black dark:text-white dark:bg-gray-700 bg-light-background p-8 rounded-lg hover:bg-">
                    <h2 class="">SammyGPT</h2>
                    <p>an amazing ai assistant</p>
                </div>
            </div>
            <div class="bg-transparent w-[90%] h-[20vh] mx-auto mt-[15vh]">
                <div v-for="s in seagulls" id="seagull" class="h-[80px] w-[80px] cursor-pointer mt-[-80px]" :class="`${s.dead ? 'dead' : 'flying'} ${s.dir == 1 ? 'flipped' : ''}`" :style="`margin-left: ${s.pos}vw;`" @click="s.handleSegull"></div>
            </div>
            <div class="bg-transparent w-[90%] h-[20vh] mx-auto mt-[5vh]">
                <div v-for="s in seagulls2" id="seagull" class="h-[80px] w-[80px] cursor-pointer mt-[-80px]" :class="`${s.dead ? 'dead' : 'flying'} ${s.dir == 1 ? 'flipped' : ''}`" :style="`margin-left: ${s.pos}vw;`" @click="s.handleSegull"></div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import gsap from 'gsap'

const break_word = "<break>"
let seagulls = ref([])
let seagulls2 = ref([])
let landing_msg = ref("landing_msg")
let landing_message = `Artificial Intelligence ${break_word} tailored for ${break_word} Staten Island Technical High School.`

const animateWords = ()=>{
    let words = landing_message.split(" ")
    let t1 = gsap.timeline()

    words.forEach((word) => {

        if (word == break_word){
            let br = document.createElement("br")
            landing_msg.value.appendChild(br);
        }else{
            let span = document.createElement("span");
            span.className = "word";
            span.style.opacity = 0
            span.textContent = word + " ";  // adding space after each word for readability
            landing_msg.value.appendChild(span);
            t1.to(span, {
                opacity: 1,
                duration: 0.3,
                ease: "sine.out"
            })
        }
    });
}

onMounted(() => {
    animateWords()
    seagulls.value.push(new seagull(Math.round(Math.random() * 80)))
    seagulls.value.push(new seagull(Math.round(Math.random() * 80)))
    seagulls2.value.push(new seagull(Math.round(Math.random() * 80)))
    seagulls2.value.push(new seagull(Math.round(Math.random() * 80)))
    setInterval(() => {
        seagulls.value.forEach((s) => {
            if (s.pos > 80 || s.pos < 0) {
                s.dir *= -1
            }
            s.pos += s.dir
        })
        seagulls2.value.forEach((s) => {
            if (s.pos > 80 || s.pos < 0) {
                s.dir *= -1
            }
            s.pos += s.dir
        })
    }, 30)
})

function seagull(pos) {
    this.dead = ref(false)
    this.pos = ref(pos)
    this.dir = ref(1)
    this.handleSegull = (event) => {
    this.dead.value = true
    setTimeout(() => {
        this.dead.value = false
        this.pos.value = Math.round(Math.random() * 80)
    }, 1000)
}
}
</script>

<style scoped>
.flipped {
    transform: rotateY(180deg)
}
.flying {
    background-image: url("/assets/seagull/0.png");
    animation: fly 0.5s infinite;
    position: relative;
    top: 0;
}
.dead {
    background-image: url("/assets/seagull/dead.png");
    position: relative;
    top: 50vh;
    transition: 1s;
}

@keyframes flyaround {
    0% {
        transform: rotateY(180deg)
    }
    50% {
        margin-left: 80vw;
    }
    100% {
        
    }
}

@keyframes fly {
    0% {
        background-image: url("/assets/seagull/0.png");
    }
    12% {
        background-image: url("/assets/seagull/0.png");
    }
    
    25% {
        background-image: url("/assets/seagull/1.png");
    }
    
    37% {
        background-image: url("/assets/seagull/2.png");
    }
    
    50% {
        background-image: url("/assets/seagull/3.png");
    }
    
    62% {
        background-image: url("/assets/seagull/4.png");
    }
    
    75% {
        background-image: url("/assets/seagull/5.png");
    }
    
    87% {
        background-image: url("/assets/seagull/6.png");
    }
    
    100% {
        background-image: url("/assets/seagull/7.png");
    }
}
</style>