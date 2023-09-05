<script setup>
import { ref, onMounted } from "vue"
import { useRouter } from "vue-router"
import axios from 'axios';

const userDataStore = useState('userData', () => null)
const textarea = ref(null)
const result = ref("")
const confidence = ref("")
const env = useRuntimeConfig()
const router = useRouter();
const warning = ref("")
const currentData = ref(null)
var detect_data = reactive(null)

// Given the percentage of paragraphs written by AI, returns a message
const get_result_message = (percentage)=>{
    if (percentage <= 0.16){
        return "Entirely written by Human"
    }else if (percentage > 0.16 && percentage <=0.32){
        return "Most likely written by Human"
    }else if (percentage > 0.32 && percentage <=0.48){
        return "May include parts written by AI"
    }else if (percentage > 0.48 && percentage <=0.64){
        return "Some parts written by AI"
    }else if (percentage > 0.64 && percentage <= 0.80){
        return "Most likely written by AI"
    }else if (percentage > 0.80){
        return "Entirely written by AI"
    }
}

async function getResults() {
    if (textarea.value.value == "") {return}
    const response = await axios.post(`${env.public.protocol}://${env.public.api}/detect`, textarea.value.value);
    const data = JSON.parse(response.data)

    let ai = 0
    let has_undertermined = false
    for (let section of data){
        if (section['label'].toLowerCase() == "ai"){
            ai++
        }
        if (section['label'].toLowerCase() == "undetermined"){
            has_undertermined = true
        }
    }
    let ai_percentage = ai/data.length

    if (has_undertermined){
        detect_data = data
        warning.value = `Conflicting results, please click 'In Depth Analysis'`
    }
    result.value = `Result: ${get_result_message(ai_percentage)}`
    confidence.value = `Perentage of AI (approximately): ${Math.round(ai_percentage*10000)/100}%`
}

const loggedIn = computed(() => {
    if (userDataStore.value == null) {
        return false
    } 
    return true
})
</script>

<template>
    <div class="h-full w-sreen dark:bg-primary bg-slate-100 font-[Montserrat] p-8" v-if="!loggedIn">
        <title>Login</title>
        <Loginscreen/>
    </div>
    <div class="w-screen h-full dark:bg-primary bg-slate-100 font-[Montserrat] p-8" v-else>
        <title>AI Detection</title>
        <Linebyline v-if="currentData !== null" :data="currentData" @close="currentData = null"/>
        <h1 class="text-black dark:text-white text-center text-[3rem]">AI Detector</h1>
        <div class="flex flex-col items-center justify-center w-full mt-9">
            <Disclaimer class="p-4"/>
            <textarea
                class="bg-light-background dark:bg-slate-700 mx-auto w-[50vw] dark:text-white text-black resize-none p-4 text-[1rem] rounded-xl"
                rows="20" placeholder="Enter your text" ref="textarea"></textarea>
        </div>
        <div class="w-full flex flex-col justify-center items-center gap-y-8 my-8">
            <Button :toggle_button="false" :selected="false" text="Check for AI" @clicked="getResults" class=""></Button>
            <Button  v-if="detect_data" :toggle_button="false" :selected="false" text="In Depth Analysis" @clicked="currentData = detect_data" class="bg-amber-400 animate-bounce"></Button>
        </div>
        <h2 class="text-black dark:text-white text-center text-[2rem]">{{ warning }}</h2>
        <h2 class="text-black dark:text-white text-center text-[2rem]">{{ result }}</h2>
        <h2 class="text-black dark:text-white text-center text-[2rem]">{{ confidence }}</h2>
    </div>
</template>

<style scoped>

.block{
    width: 50%;
}

@media (max-width: 1200px) {
    .block{
        width: 95%;
    }
}

</style>