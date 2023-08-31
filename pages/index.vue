<template>
    <div class="h-full min-h-[100vh] dark:bg-black bg-white pl-[7vh] pr-[7vh]">
        <Loadingscreen/>
        <div class="w-full menu flex items-center justify-start p-4">
            <Logo/>
            <div class="z-20 flex gap-8">
                <div class="mt-4">
                    <NuxtLink
                        v-for="{code, name} in locales"
                        :key="code"
                        :to="switchLocalePath(code)"
                        class="mr-4 dark:text-white text-primary"
                        :class="{
                            'underline': code == locale
                        }"
                    >
                        {{ name }}
                    </NuxtLink>
                </div>
                <ThemeButton :main="main" :dark-mode="darkMode" @dark-mode="(e) => darkMode = e"/>
            </div>
        </div>
        <div class="dark:bg-primary bg-accent2 w-full h-full rounded-[5vh] pb-12">
            <div class="w-full flex flex-col justify-start items-start pad-intro pb-8 pt-12 gap-y-4">
                <h1 class="intro-text text-left font-[Raleway] dark:text-[#ebeae1] text-black hidden">Artificial Intelligence for Staten Island Technical High School.</h1>
                <h2 class="intro-text text-left font-[Raleway] dark:text-[#ebeae1] text-black bold w-5/6" ref="landing_msg"></h2>
                <!-- <p class="description-text dark:text-[#ebeae1] text-black text-lg">{{ data }}</p> -->
                <p class="description-text dark:text-[#ebeae1] text-black text-lg">{{ $t("landing-description") }}</p>
            </div>
            <div class="flex justify-start flex-col gap-y-4 pad-intro">
                <NuxtLink class="z-10 button h-[10vh] flex flex-col text-center items-center justify-center rounded-lg font-[Montserrat] bg-[#c3b563] hover:bg-[#a99c59] transition ease-in-out" :to="localpath('/chat')">
                    {{ $t("landing-bt-1") }}
                    <p class="text-black bt-desc">{{ $t("landing-bt-1-desc") }}</p>
                </NuxtLink>
                <NuxtLink class="z-10 button  h-[10vh] flex flex-col text-center items-center justify-center rounded-lg font-[Montserrat] bg-[#c3b563] hover:bg-[#a99c59] transition ease-in-out" :to="localpath('/detection')">
                    {{ $t("landing-bt-2") }}
                    <p class="text-black bt-desc">{{ $t("landing-bt-2-desc") }}</p>
                </NuxtLink>
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
import { GoogleSignInButton, decodeCredential, useOneTap} from "vue3-google-signin";
import gsap from 'gsap'

const localpath = useLocalePath()
const i18n = useI18n()
const main = ref(null)
const darkMode = ref(null)

const break_word = "<break>"
let seagulls = ref([])
let seagulls2 = ref([])
let landing_msg = ref("landing_msg")
let landing_message = i18n.t("landing-intro")
let text_delay = reactive(0.05)

const userDataStore = useState('userData', () => null)
const teacher = useState('teacher', () => false)
const language = reactive("english")

const { locale, locales } = useI18n()
const switchLocalePath = useSwitchLocalePath()

if (i18n.locale.value == "zh"){
    text_delay = 0.1
}

useOneTap({
  onSuccess: (response) => {
    const { credential } = response;
    
    const userData = decodeCredential(credential)
    userDataStore.value = userData
    console.log(userData)
  },
  onError: () => console.error("Error with One Tap Login"),
});

const animateWords = ()=>{

    let words = landing_message.split("")
    let t1 = gsap.timeline()

    words.forEach((word) => {

        if (word == break_word){
            let br = document.createElement("br")
            landing_msg.value.appendChild(br);
        }else{
            let span = document.createElement("span");
            span.className = "word";
            span.style.opacity = 0
            span.textContent = word + "";  // adding space after each word for readability
            landing_msg.value.appendChild(span);
            t1.to(span, {
                opacity: 1,
                duration: text_delay,
                ease: "power3.out"
            })
        }
    });
}

onMounted(() => {
    main.value = document.getElementById("main")
    darkMode.value = main.value.classList.contains('dark')
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

.pad-intro{
    padding: 1.5vw 4vw 1.5vw 4vw;
}

.button {
    width: 30vw;
    font-size: 2rem;
}

.bt-desc{
    font-size: 1rem;
}

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

    .pad-intro{
        padding: 10vw 10vw 0vw 10vw;
    }

    .button {
        width: 100%;
        font-size: 4vmin;
    }

    .bt-desc{
        font-size: 3vmin;
    }

    .menu{
        flex-direction: column;
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