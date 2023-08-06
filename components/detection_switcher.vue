<script setup>
import { ref, getCurrentInstance  } from 'vue'
import { useRouter } from 'vue-router';

const router = useRouter()
const normal = ref(false)
const files = ref(false)
const drive = ref(false)

const localpath = useLocalePath()

function getSelected() {
    if (window.location.pathname.indexOf("/detection_files")!=-1) {
        files.value = true
    }
    else if (window.location.pathname.indexOf("/detection_drive")!=-1) {
        drive.value = true
    }
    else if (window.location.pathname.indexOf("/detection")!=-1) {
        normal.value = true
    }
}
getSelected()
async function handleClick(path) {
    // window.location.pathname = path
    router.push(localpath(path))
}
</script>

<template>
    <div id="container" class="flex flex-col absolute w-[10vw] left-[2vw] top-[3vw] gap-1">
        <h3 class=" bg-transparent dark:text-white text-black text-center text-[1.5rem]">{{ $t("switcher-change") }}</h3>
        <Button :text="`${$t('switcher-text')}`" :selected="normal" @clicked="handleClick('/detection')"></Button>
        <Button :text="`${$t('switcher-file')}`" :selected="files" @clicked="handleClick('/detection_files')"></Button>
        <!-- <Button v-if="update" text="Import From Drive" :selected="drive" :toggle_button="true" :non-clickable="drive" @clicked="handleClick('/detection_drive')"></Button> -->
        <Button :text="`${$t('switcher-back')}`" :toggle_button="true" @clicked="handleClick('/')"></Button>
    </div>
</template>
