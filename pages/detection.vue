<script setup>
import { ref } from "vue"
import axios from 'axios';

const textarea = ref(null)
const result = ref("")

async function getResults() {
    if (textarea.value.value == "") {return}
    const response = await axios.post('http://localhost:5000/detect', textarea.value.value);
    const data = JSON.parse(response.data)
    result.value = `${Math.round(data.probability*10000)/100}% Result: ${data.result}`
    console.log(result.value)
}
</script>

<template>
    <div class="w-[100vw] h-[100vh] dark:bg-background bg-slate-100 font-[Montserrat] p-8">
        <h1 class="text-black dark:text-white text-center text-[3rem]">AI Detector</h1>
        <div class="flex justify-center w-full mt-9">
            <textarea
                class="bg-light-background dark:bg-primary mx-auto w-[50vw] dark:text-white text-black resize-none p-4 text-[1rem] rounded-xl"
                rows="20" placeholder="Enter your text" ref="textarea">
            </textarea>
        </div>
        <div class="flex justify-center my-8">
            <Button :toggle_button="false" :selected="false" text="Check for AI" @clicked="getResults" class=""></Button>
        </div>
        <h2 class="text-black dark:text-white text-center text-[3rem]">{{ result }}</h2>
    </div>
</template>