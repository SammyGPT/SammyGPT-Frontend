<script setup>
import { ref } from "vue"
import axios from 'axios';

const textarea = ref(null)
const result = ref("")

async function handleFile(e) {
    var files = e.target.files || e.dataTransfer.files;
    if (!files.length)
        return;
    console.log(files[0])
    var formData = new FormData();
    formData.append("file", files[0]);
    const response = await axios.post('http://localhost:5000/upload', formData)
    const data = JSON.parse(response.data)
    result.value = `${Math.round(data.probability*10000)/100}% Result: ${data.result}`
    console.log(result.value)
}
</script>

<template>
    <div class="w-[100vw] h-[100vh] dark:bg-background bg-slate-100 font-[Montserrat] p-8">
        <h1 class="text-black dark:text-white text-center text-[3rem]">AI Detector</h1>
        <div class="flex justify-center w-full mt-9">
            <input type="file" accept=".doc, .docx, .DOT, .PDF, .CSV, .TXT, .XLS, .XLSX, .JSON" @change="handleFile">
        </div>
        <div class="flex justify-center my-8">
            <Button :toggle_button="false" :selected="false" text="Check for AI" @clicked="getResults" class=""></Button>
        </div>
        <h2 class="text-black dark:text-white text-center text-[3rem]">{{ result }}</h2>
    </div>
</template>