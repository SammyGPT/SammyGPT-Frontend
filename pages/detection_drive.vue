<script setup>
import { ref } from "vue"
import axios from 'axios';

const textarea = ref(null)
const result = ref("")
const progress = ref(0)
const results = ref([])

async function handleFile(e) {
    results.value = []
    progress.value = 0
    var files = e.target.files || e.dataTransfer.files;
    if (!files.length)
        return;
    for (let i = 0; i < files.length; i++){
        var formData = new FormData();
        formData.append("file", files[i]);
        const response = await axios.post('http://localhost:5000/upload', formData)
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
    <div class="w-full min-w-[100vw] h-full min-h-[100vh] dark:bg-background bg-slate-100 font-[Montserrat] p-8">
        <h1 class="text-black dark:text-white text-center text-[3rem]">AI Detector</h1>
        <div class="mx-auto w-fit mt-9">
            <input class="dark:text-white text-black text-center" type="file" accept=".doc, .docx, .DOT, .PDF, .CSV, .TXT, .XLS, .XLSX, .JSON" @change="handleFile" multiple="multiple">
        </div>
        <div class="flex justify-center my-8">
            <Button :toggle_button="false" :selected="false" text="Check for AI" @clicked="getResults" class=""></Button>
        </div>
        <!-- <h2 class="text-black dark:text-white text-center text-[3rem]">{{ result }}</h2> -->
        <DetectionLoading :progress="progress"/>
        <div id="files" class="flex flex-wrap mt-[15vh] h-auto">
            <div class="w-[20vw] h-[20vw] bg-white" v-for="result in results">
                <h3 class="text-center text-[2rem]">{{ result.fileName }}</h3>
                <p class="text-center text-[1.2rem]">{{ `Made by ${result.result.result}, ${Math.round(result.result.probability*10000)/100}% confidence` }}</p>
            </div>
        </div>
    </div>
</template>

<style scoped>
</style>