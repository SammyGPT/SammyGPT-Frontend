<script setup>
import { ref, getCurrentInstance  } from 'vue'
import { useRouter } from 'vue-router';

const router = useRouter()
const normal = ref(false)
const files = ref(false)
const drive = ref(false)

function getSelected() {
    if (window.location.pathname == "/detection") {
        normal.value = true
    }
    if (window.location.pathname == "/detection_files") {
        files.value = true
    }
    if (window.location.pathname == "/detection_drive") {
        drive.value = true
    }
}
getSelected()
async function handleClick(path) {
    window.location.pathname = path
}
</script>

<template>
    <div id="container" class="flex flex-col absolute w-[10vw] left-[2vw] top-[3vw] gap-1">
        <h3 class=" bg-transparent text-white text-center text-[1.5rem]">Change Mode</h3>
        <Button text="Text" :selected="normal" :toggle_button="true" :non-clickable="normal" @clicked="handleClick('/detection')"></Button>
        <Button text="Upload File" :selected="files" :toggle_button="true" :non-clickable="files" @clicked="handleClick('/detection_files')"></Button>
        <!-- <Button v-if="update" text="Import From Drive" :selected="drive" :toggle_button="true" :non-clickable="drive" @clicked="handleClick('/detection_drive')"></Button> -->
        <Button text="Back To Sammy" :toggle_button="true" @clicked="handleClick('/')"></Button>
    </div>
</template>