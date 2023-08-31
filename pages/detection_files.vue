<script setup>
import { ref, watch } from "vue"
import axios from 'axios';

const userDataStore = useState('userData', () => null)

const textarea = ref(null)
const result = ref("")
const progress = ref(0)
const results = ref([])
const env = useRuntimeConfig()

const human = 0.16
const most_human = 0.32
const likely_human = 0.48
const likely_ai = 0.64
const most_ai = 0.80
const ai = 1.00

const scrollPosition = ref(0)
const currentData = ref(null)

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

async function handleFile(e) {
    results.value = []
    progress.value = 0
    var files = e.target.files || e.dataTransfer.files;
    if (!files.length)
        return;
    for (let i = 0; i < files.length; i++){
        var formData = new FormData();
        formData.append("file", files[i]);
        const response = await axios.post(`${env.public.protocol}://${env.public.api}/upload`, formData)
        const data = await JSON.parse(response.data)

        let ai = 0
        let undetermined_char = 0
        let total_char = 0
        for (let section of data){
            total_char += section['content'].length
            if (section['label'].toLowerCase() == "ai"){
                ai++
            }
            else if (section['label'].toLowerCase() == "undetermined"){
                undetermined_char += section['content'].length;
            }
        }
        let ai_percentage = ai/data.length

        results.value.push({
            data: data,
            fileName: files[i].name,
            result: get_result_message(ai_percentage),
            ai_percentage: ai_percentage,
            recommend_depth_analysis: undetermined_char >= 0.25 * total_char
        })
        progress.value = Math.round((i+1)/files.length * 100)

    }
}

const loggedIn = computed(() => {
    if (userDataStore.value == null) {
        return false
    } 
    return true
})

watch(currentData, (new_value) => {

    if (new_value != null){
        scrollPosition.value = document.documentElement.scrollTop; // storing the current y positition
        document.body.style.position = "fixed" // this will reset the scroll pos to top
        document.body.style.top = -scrollPosition.value + 'px'; // set it back to where the user scrolled
    }else{
        document.body.style.position = "" // this will reset the scroll pos to top
        document.body.style.top = ""; // Clear the top value
        window.scrollTo(0, scrollPosition.value); // Scroll back to the original position
    }
})

</script>

<template>
    <div class="w-[100vw] h-[100vh] dark:bg-primary bg-slate-100 font-[Montserrat] p-8" v-if="!loggedIn">
        <Loginscreen/>
    </div>
    <div class="w-full min-w-[100vw] h-full min-h-[100vh] dark:bg-primary bg-slate-100 font-[Montserrat] p-8" v-else>
        <div class="z-50" v-if="currentData !== null">
            <div class="fixed h-screen top-0 left-0 w-screen bg-white opacity-30" @click="currentData = null"></div>
            <Linebyline v-if="currentData !== null" :data="currentData" @close="currentData = null"/>
        </div>
        <h1 class="text-black dark:text-white text-center text-[3rem]">AI Detector</h1>
        <div class="w-full flex flex-col items-center justify-center">
            <Disclaimer class="p-4"/>
            <label
                class="flex justify-center block-width h-32 px-4 transition dark:bg-background bg-white border-2 border-gray-300 border-dashed rounded-md appearance-none cursor-pointer hover:border-gray-400 focus:outline-none" @drop="" @dragover.prevent="">
                <input class="absolute block-width h-32 opacity-0 z-10" type="file" name="file_upload" accept=".doc, .docx, .DOT, .CSV, .TXT, .XLS, .XLSX, .JSON" @change="handleFile" multiple="multiple">
                <span class="flex items-center space-x-2">
                    <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6 text-gray-600" fill="none" viewBox="0 0 24 24"
                        stroke="currentColor" stroke-width="2">
                        <path stroke-linecap="round" stroke-linejoin="round"
                        d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                    </svg>
                    <span class="font-medium dark:text-white text-gray-600">
                        Drop files to Attach, or
                        <span class="text-blue-600 underline">browse</span>
                    </span>
                </span>
                    <!-- <input class="hidden" type="file" accept=".doc, .docx, .DOT, .PDF, .CSV, .TXT, .XLS, .XLSX, .JSON" @change="handleFile" multiple="multiple"> -->
            </label>
        </div>
        <div class="flex justify-center my-8">
            <!-- <Button :toggle_button="false" :selected="false" text="Check for AI"></Button> -->
        </div>
        <!-- <h2 class="text-black dark:text-white text-center text-[3rem]">{{ result }}</h2> -->
        <DetectionLoading :progress="progress"/>
        <div id="files" class="flex justify-evenly flex-wrap mt-[15vh] h-auto gap-[3vw] cursor-pointer">
            <div class="max-w-xs dark:bg-slate-500 bg-[#bfc3c9] rounded-md p-10 flex items-center flex-col justify-center gap-y-[1vw]" v-for="result in results" @click="currentData = result.data">
                <h3 class="text-center text-[1.2rem] dark:text-white text-primary break-all">{{ result.fileName }}</h3>
                <p class="text-center text-[1rem] dark:text-white text-primary">Detected Result:</p>
                <p class="text-center text-[1rem] dark:text-white text-primary">{{ result.result }}</p>
                <!-- <p class="text-center text-[1rem] dark:text-white text-primary">Confidence: {{ Math.round(result.result.score*10000)/100 }}%</p> -->

                <!-- By  -->
                <img v-if="result.ai_percentage <= human" class="w-1/3" src="~assets/images/checked.png"/>
                <img v-else-if="result.ai_percentage <= most_human" class="w-1/3" src="~assets/images/checked.png"/>
                <img v-else-if="result.ai_percentage <= likely_human" class="w-1/3" src="~assets/images/warning.png"/>
                <img v-else-if="result.ai_percentage <= likely_ai" class="w-1/3" src="~assets/images/warning.png"/>
                <img v-else-if="result.ai_percentage <= most_ai" class="w-1/3" src="~assets/images/x.png"/>
                <img v-else-if="result.ai_percentage <= ai" class="w-1/3" src="~assets/images/x.png"/>

                <div v-if="result.recommend_depth_analysis" class="w-full flex flex-col items-center bg-red-300 p-2 rounded-md">
                    <img class="w-1/6" src="~assets/images/exclamation.png"/>
                    <h4 class="text-center dark:text-secondary text-primary">Conflicting results, recommend In Depth Analysis</h4>
                </div>

                <h3 class="underline dark:text-secondary text-primary">Click for In Depth Analysis</h3>
            </div>
        </div>
    </div>
</template>

<style scoped>

.block-width{
    width: 50%;
}

@media (max-width: 1200px) {
    .block-width{
        width: 95%;
    }
}

.noscroll {
    overflow: hidden;
    position: fixed;
    width: 100%;
    height: 100%;
}

</style>
