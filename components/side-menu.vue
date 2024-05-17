<template>
    <div id="menu" class="dark:bg-primary bg-secondary p-4">
        <div class="item-center h-full flex flex-col justify-even dark:bg-primary bg-secondary w-full" id="desktop_menu" ref="desktop_menu">
            <div class="h-auto" id="desktop_logo">
                <Logo/>
            </div>
            <div class="h-[60%] dark:text-white text-black font-[Montserrat] flex flex-col items-center">
                <Button :toggle_button="false" :text='`${$t("side-menu-detector")}`' class="w-56 hover:text-green-500 transition-colors duration-300 ease-in-out" @clicked="gotoMain()"></Button>
                <div class="flex flex-col gap-y-2 mt-[5%] text-md">
                    <h3>Version: {{ version }}</h3>
                    <h3>Build: {{ builddate }}</h3>
                    <h3 v-if="connected" class="text-green-500">{{ $t("side-menu-connected") }}</h3>
                    <h3 v-else class="text-red-500">{{ $t("side-menu-disconnected") }}</h3>
                    <h3>{{$t("side-menu-chat-speed")}}: </h3>

                    <div class="flex flex-wrap gap-x-2 gap-y-2 items-center justify-start">
                        <Button :selected='false' :toggle_button="true" :text='`${$t("side-menu-slow")}`' @clicked="select('slow')" ref="b1"></Button>
                        <Button :selected='false' :toggle_button="true" :text='`${$t("side-menu-medium")}`' @clicked="select('medium')" ref="b2"></Button>
                        <Button :selected='false' :toggle_button="true" :text='`${$t("side-menu-fast")}`' @clicked="select('fast')" ref="b3"></Button>
                    </div>
                    <div class="flex flex-col gap-y-2">
                        <h3>{{$t("side-menu-questions")}}</h3>
                        <Button class="w-56 hover:text-green-500 transition-colors duration-300 ease-in-out text-md" :toggle_button="false" :text='`${$t("side-menu-send-email")}`' @clicked="sendEmail()"></Button>
                    </div>
                </div>
            </div>
            <div class="h-[10%] w-full">
                <div class="p-4 flex flex-row items-center justify-evenly">
                    <img :src="`/${pfp}`" class="w-[5vmin]">
                    <h3 class="font-[Montserrat] dark:text-white text-black w-[75%] text-center text-md">{{ email }}</h3>
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
const connected = ref(false)
const b1 = ref(null), b2 = ref(null), b3 = ref(null)
const userDataStore = useState('userData', () => null)

const localpath = useLocalePath()

const email = computed(() => {
    if (userDataStore.value == null) {
        return "Guest User Account"
    } 
    return userDataStore.value.email
})
const pfp = computed(() => {
    if (userDataStore.value == null) {
        return "user_image.png"
    } 
    return userDataStore.value.picture
})

const generation_speed = ref(localStorage.getItem("generationSpeed"));

const props = defineProps({
    main: { type:Element, required: true}
})

const darkMode = ref(true)

function gotoMain() {
    window.location.pathname = localpath('/')
}

const sendEmail = ()=>{
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

    darkMode.value = localStorage.theme.toLowerCase() == "dark"
    
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
    } else{
        connected.value = true
    }

})

</script>

<style scoped>
.material-symbols-outlined{
    font-size: 3rem;
}

#menu{
    width: 25vw;
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