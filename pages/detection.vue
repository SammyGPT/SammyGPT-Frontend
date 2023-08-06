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

async function getResults() {
    if (textarea.value.value == "") {return}
    const response = await axios.post(`${env.public.protocol}://${env.public.api}/detect`, textarea.value.value);
    const data = JSON.parse(response.data)
    result.value = `Result: ${data.label}`
    confidence.value = `Confidence: ${Math.round(data.score*10000)/100}%`
    console.log(result.value)
}

const loggedIn = computed(() => {
    if (userDataStore.value == null) {
        return false
    } 
    return true
})
</script>

<template>
    <div class="w-[100vw] h-[100vh] dark:bg-primary bg-slate-100 font-[Montserrat] p-8" v-if="!loggedIn">
        <Loginscreen/>
    </div>
    <div class="w-[100vw] h-[100vh] dark:bg-primary bg-slate-100 font-[Montserrat] p-8" v-else>
        <h1 class="text-black dark:text-white text-center text-[3rem]">AI Detector</h1>
        <div class="flex justify-center w-full mt-9">
            <textarea
                class="bg-light-background dark:bg-slate-700 mx-auto w-[50vw] dark:text-white text-black resize-none p-4 text-[1rem] rounded-xl"
                rows="20" placeholder="Enter your text" ref="textarea"></textarea>
        </div>
        <div class="flex justify-center my-8">
            <Button :toggle_button="false" :selected="false" text="Check for AI" @clicked="getResults" class=""></Button>
        </div>
        <h2 class="text-black dark:text-white text-center text-[2rem]">{{ result }}</h2>
        <h2 class="text-black dark:text-white text-center text-[2rem]">{{ confidence }}</h2>
    </div>
</template>