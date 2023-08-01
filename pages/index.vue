<template>
    <div class="h-full min-h-[100vh] dark:bg-black bg-white pl-[7vh] pr-[7vh]">
        <div class="w-full flex items-start justify-star">
            <Logo/>
        </div>
        <div class="dark:bg-primary bg-accent2 w-full h-full rounded-[5vh] pb-12">
            <div class="w-full flex flex-col justify-start items-start p-24 pb-8 pt-12 gap-y-4">
                <h1 class="intro-text text-left font-[Raleway] dark:text-[#ebeae1] text-black hidden">Artificial Intelligence for Staten Island Technical High School.</h1>
                <h2 class="intro-text text-left font-[Raleway] dark:text-[#ebeae1] text-black bold" ref="landing_msg"></h2>
                <p class="description-text dark:text-[#ebeae1] text-black text-lg">Introducing Project SammyGPT: A Comprehensive AI Assistant for Education. Seamlessly integrated to assist educators with real-time detection tools and offer both students and teachers a vast repository of curated Wiki knowledge. Enhancing learning experiences and optimizing classroom efficiency like never before.</p>
            </div>
            <div class="flex justify-start flex-col gap-y-4 pl-24">
                <NuxtLink class="z-10 w-[30vw] h-[10vh] flex text-center items-center justify-center rounded-lg text-[3vmin] font-[Montserrat] bg-[#c3b563] hover:bg-[#a99c59] transition ease-in-out" to="/chat">SammyGPT</NuxtLink>
                <NuxtLink class="z-10 w-[30vw] h-[10vh] flex text-center items-center justify-center rounded-lg text-[3vmin] font-[Montserrat] bg-[#c3b563] hover:bg-[#a99c59] transition ease-in-out" to="/detection">AI Detection</NuxtLink>
            </div>
            <div class="z-0 absolute w-full h-full top-0 left-0">
                <div class="bg-transparent w-[90%] h-[20vh] mx-auto mt-[20vh]">
                    <div v-for="s in seagulls" id="seagull" class="h-[80px] w-[80px] cursor-pointer mt-[-80px]" :class="`${s.dead ? 'dead' : 'flying'} ${s.dir == 1 ? 'flipped' : ''}`" :style="`margin-left: ${s.pos}vw;`" @click="s.handleSegull"></div>
                </div>
                <!-- <div class="bg-transparent w-[90%] h-[20vh] mx-auto mt-[0vh]">
                    <div v-for="s in seagulls2" id="seagull" class="h-[80px] w-[80px] cursor-pointer mt-[-80px]" :class="`${s.dead ? 'dead' : 'flying'} ${s.dir == 1 ? 'flipped' : ''}`" :style="`margin-left: ${s.pos}vw;`" @click="s.handleSegull"></div>
                </div> -->
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
    // seagulls.value.push(new seagull(Math.round(Math.random() * 80)))
    // seagulls2.value.push(new seagull(Math.round(Math.random() * 80)))
    // seagulls2.value.push(new seagull(Math.round(Math.random() * 80)))
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

.intro-text{
    font-size: 3.5vw;
}

.description-text{
    font-size: 1vw;
}   
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
    top: 100vh;
    transition: 1.5s;
}

@media (max-width: 1200px){

    .intro-text{
        font-size: 2rem;
        text-align: left;
    }
    .description-text{
        font-size: 1rem;
        text-align: left;
    } 
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