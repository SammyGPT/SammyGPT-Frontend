<template>
    <div v-if="!seenPatchNotes" id="patch-notes"
        class="dark:text-secondary text-primary absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 shadow-lg rounded-xl p-8 dark:bg-zinc-700 bg-light-background z-10">
        <h2 class="text-left font-[Montserrat] text-[1.2rem]">Version July 18th, 2023</h2>
        <h2 class="text-left font-[Raleway] dark:text-[#ebeae1] text-[2rem] mt-5">What's New?</h2>
        <hr class="wfull border-black dark:border-light-background">
        <ol class="ml-5 mt-5 list-inside overflow-y-scroll h-[38vh] list-disc">
            <li v-for="patch in patches" class="text-[1.4rem] text-neutral-400">
                <span class="dark:text-secondary text-primary">{{ patch }}</span>
            </li>
        </ol>
        <Button text="Close" :selected="true" @clicked="closePatchNotes"
            class="dark:bg-primary font-[Montserrat] rounded-lg absolute left-[75%] bottom-6" />
    </div>
</template>

<script setup>
import { ref } from 'vue';

const patchVersion = 24
const lastSeenVersion = ref(localStorage.getItem("lastSeenVersion"));
const seenPatchNotes = ref(patchVersion <= lastSeenVersion.value);

const patches = ref([
    "Faster generation speed",
    "Staten Island Tech History",
    "Currriculum information",
    "Access to the SITHS website",
    "Vector database",
    "Better comprehension",
    "Translations for Chinese and Russian"
])

function closePatchNotes() {
    localStorage.setItem("lastSeenVersion", patchVersion)
    seenPatchNotes.value = true
}

</script>

<style scoped>
#patch-notes {
    width: 30vw;
    height: 60vh;
}

@media (max-width:1200px) {
    #patch-notes {
        width: 90vw;
        height: 60vh;
    }
}
</style>