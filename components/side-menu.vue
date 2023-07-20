<template>
    <div id="menu" class="dark:bg-primary bg-secondary">
        <div class="h-full dark:bg-primary bg-secondary w-full" id="desktop_menu" ref="desktop_menu">
            <div class="h-[20%]" id="desktop_logo">
                <Logo/>
            </div>
            <div class="h-[60%] dark:text-white text-black font-[Montserrat] flex flex-col items-center">
                <div class="flex flex-col gap-y-4">
                    <h3>Version: {{ version }}</h3>
                    <h3>Build: {{ builddate }}</h3>
                    <h3>Chat speed: </h3>

                    <div class="flex flex-wrap gap-x-4 gap-y-4 items-center justify-start   ">
                        <Button :selected='false' :toggle_button="true" text="Slow" @clicked="select('slow')" ref="b1"></Button>
                        <Button :selected='false' :toggle_button="true" text="Medium" @clicked="select('medium')" ref="b2"></Button>
                        <Button :selected='false' :toggle_button="true" text="Fast" @clicked="select('fast')" ref="b3"></Button>
                    </div>
                    <div class="flex flex-col gap-y-4">
                        <h3>Questions and concerns?</h3>
                        <Button :toggle_button="false" text="Send us an email" @clicked="email()"></Button>
                    </div>
                </div>
            </div>
            <div class="h-[10%] w-fit mx-auto dark:text-white text-black select-none">
                <div v-if="darkMode" class="flex cursor-pointer gap-3" @click="handleTheme()">
                    <span class="material-symbols-outlined h-full">light_mode</span>
                    <span class="h-full align-middle my-3">Switch to Light Mode</span>
                </div>
                <div v-else class="flex cursor-pointer gap-2" @click="handleTheme()">
                    <span class="material-symbols-outlined h-full">dark_mode</span>
                    <span class="h-full align-middle my-3">Switch to Dark Mode</span>
                </div>
            </div>
            <div class="h-[10%] w-full">
                <div class="p-4 flex flex-row items-center justify-evenly">
                    <img src="~assets/images/user_image.png" class="w-[5vmin]">
                    <h3 class="font-[Montserrat] dark:text-white text-black w-[75%] text-center">Guest User Account</h3>
                </div>
            </div>
        </div>
        <div class="flex flex-row items-center justify-evenly" id="mobile_menu" ref="mobile_menu">
            <Logo class="z-20"/>
            <span class="z-20 material-symbols-outlined dark:text-secondary text-primary hover:cursor-pointer" @click="mobile_menu" ref="settings" id="settings">settings</span>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted, reactive } from 'vue'
import { useRouter } from 'vue-router';
import { useFetch } from 'nuxt/app';

const router = useRouter()
const version = reactive("alpha-0.17.5")
const builddate = reactive("July 18th, 2023")
const desktop_menu = ref(null)
const settings = ref(null)
const b1 = ref(null), b2 = ref(null), b3 = ref(null)

const generation_speed = ref(localStorage.getItem("generationSpeed"));

const props = defineProps({
    main: { type:Element, required: true}
})

const darkMode = ref(main.classList.contains('dark'))

function handleTheme() {
    if (props.main.classList.contains('dark')) {
        props.main.classList.remove('dark')
        localStorage.theme = "light"
    }
    else {
        localStorage.theme = "dark"
        props.main.classList.add('dark')
    }
    darkMode.value = main.classList.contains('dark')
}

const email = ()=>{
    window.location.href="mailto:youweiz@nycstudents.net"

}

const mobile_menu = ()=>{
    desktop_menu.value.classList.toggle("make_desktop_menu_visible")
    settings.value.classList.toggle("spin")
}

const select = (selected_speed)=>{

    b1.value.reset();
    b2.value.reset();
    b3.value.reset();

    if (selected_speed == "slow") b1.value.click()
    else if (selected_speed == "medium") b2.value.click()
    else if (selected_speed == "fast") b3.value.click()

    localStorage.setItem("generationSpeed", selected_speed)
}

onMounted(async()=>{
    
    const env = useRuntimeConfig()
    const { data, pending, error, refresh} = await useFetch(`${env.public.protocol}://${env.public.api}/`, { crossOrigin: '*' })
    
    if (generation_speed.value){ // previous generation value
        if (generation_speed.value == "slow") b1.value.click()
        else if (generation_speed.value == "medium") b2.value.click()
        else b3.value.click()
    }else{ // never set a generation speed, auto set. This will be removed soon as it force prompts the user to choose
        select("fast")
    }

    if (error.value && window.location.pathname.indexOf("/server_is_down") == -1){
        router.push('/server_is_down')
    }

})

</script>

<style scoped>
.material-symbols-outlined{
    font-size: 3rem;
}

#menu{
    width: 20vw;
    height: 100vh;
}

#inner-menu{
    justify-content: space-evenly;
}

#mobile_menu{
    display: none;
}

#settings{
    transition: all ease 0.5s;
}


.spin {
    transform: rotate(120deg);
}

.make_desktop_menu_visible{
    display: block !important;
    position: absolute;
    top: 0;
    left: 0;
}

@media (max-width:1200px){
    #menu{
        width: 100vw;
        height: 20vh;
    }

    #desktop_menu{
        display: none;
        z-index: 10;
    }

    #inner-menu{
        justify-content: start;
    }

    #mobile_menu{
        display: flex;
    }

    #desktop_logo{
        visibility: hidden;
    }
}   

</style>