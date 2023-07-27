<script setup>
import { ref } from "vue"
import axios from 'axios';

const textarea = ref(null)
const result = ref("")
const progress = ref(0)
const results = ref([])
const env = useRuntimeConfig()

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
        results.value.push({
            fileName: files[i].name,
            result: data
        })
        progress.value = Math.round((i+1)/files.length * 100)
    }
    console.log(results.value)
}

</script>

<template>
    <div class="w-full min-w-[100vw] h-full min-h-[100vh] dark:bg-primary bg-slate-100 font-[Montserrat] p-8">
        <h1 class="text-black dark:text-white text-center text-[3rem]">AI Detector</h1>
        <div class="w-full flex items-center justify-center">
            <label
                class="flex justify-center w-1/2 h-32 px-4 transition dark:bg-background bg-white border-2 border-gray-300 border-dashed rounded-md appearance-none cursor-pointer hover:border-gray-400 focus:outline-none">
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
                <input class="hidden" type="file" name="file_upload" accept=".doc, .docx, .DOT, .CSV, .TXT, .XLS, .XLSX, .JSON" @change="handleFile" multiple="multiple">
                <!-- <input class="hidden" type="file" accept=".doc, .docx, .DOT, .PDF, .CSV, .TXT, .XLS, .XLSX, .JSON" @change="handleFile" multiple="multiple"> -->
            </label>
        </div>
        <div class="flex justify-center my-8">
            <Button :toggle_button="false" :selected="false" text="Check for AI" @clicked="getResults" class=""></Button>
        </div>
        <!-- <h2 class="text-black dark:text-white text-center text-[3rem]">{{ result }}</h2> -->
        <DetectionLoading :progress="progress"/>
        <div id="files" class="flex justify-evenly flex-wrap mt-[15vh] h-auto gap-[3vw]">
            <div class="max-w-xs dark:bg-slate-500 bg-primary rounded-md p-10 flex items-center flex-col justify-center gap-y-[1vw]" v-for="result in results">
                <h3 class="text-center text-[1.2rem] dark:text-white text-primary break-all">{{ result.fileName }}</h3>
                <p class="text-center text-[1rem] dark:text-white text-primary">Likely written by:</p>
                <p class="text-center text-[1rem] dark:text-white text-primary">{{ result.result.label }}</p>
                <p class="text-center text-[1rem] dark:text-white text-primary">Confidence: {{ Math.round(result.result.score*10000)/100 }}%</p>
                <img v-if="result.result.label.toLowerCase() == 'human'" class="w-1/3" src="~assets/images/checked.png"/>
                <img v-if="result.result.label.toLowerCase() == 'chatgpt'" class="w-1/3" src="~assets/images/x.png"/>
            </div>
        </div>
    </div>
</template>