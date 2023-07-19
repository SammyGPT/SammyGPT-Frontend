<template>
    <div id="menu" class="bg-primary">
        <div class="h-full" id="desktop">
            <div class="h-[15%]">
                <Logo/>
            </div>
            <div class="h-[75%] text-white font-[Montserrat] flex flex-col items-center">
                <div class="flex flex-col gap-y-4">
                    <h3>Version: {{ version }}</h3>
                    <h3>Build: {{ builddate }}</h3>
                    <h3>Chat speed: </h3>
                    <div class="flex flex-wrap gap-x-4 gap-y-4 items-center justify-start   ">
                        <Button :selected='false' text="Slow" @clicked="select('slow')" ref="b1"></Button>
                        <Button :selected='false' text="Medium" @clicked="select('medium')" ref="b2"></Button>
                        <Button :selected='false' text="Fast" @clicked="select('fast')" ref="b3"></Button>
                    </div>
                </div>
            </div>
            <div class="h-[10%]">
                <div class="p-4 flex flex-row items-center justify-evenly w-full">
                    <img src="~assets/images/user_image.png" class="w-[25%]">
                    <h3 class="font-[Montserrat] text-white w-[75%] text-center">Guest User Account</h3>
                </div>
            </div>
        </div>
        <div id="mobile">
            <Logo/>
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
const b1 = ref(null), b2 = ref(null), b3 = ref(null)

const generation_speed = ref(localStorage.getItem("generationSpeed"));


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
    
    if (generation_speed.value){
        if (generation_speed.value == "slow") b1.value.click()
        else if (generation_speed.value == "medium") b2.value.click()
        else b3.value.click()
    }

    if (error.value && window.location.pathname.indexOf("/server_is_down") == -1){
        router.push('/server_is_down')
    }

})

</script>

<style scoped>
#menu{
    width: 20vw;
    height: 100vh;
}

#inner-menu{
    justify-content: space-evenly;
}

#mobile{
    display: none;
}

@media (max-width:1200px){
    #menu{
        width: 100vw;
        height: 20vh;
    }

    #desktop{
        display: none;
    }

    #inner-menu{
        justify-content: start;
    }

    #mobile{
        display: block;
    }
}

</style>