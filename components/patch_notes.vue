<template>
    <div v-if="!seenPatchNotes" id="patch-notes" class="text-secondary absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 shadow-lg rounded-xl p-5 bg-zinc-800 outline outline-2 outline-slate-600">
        <h2 class="text-left font-[Montserrat] text-[1.5rem]">Version July 18th, 2023</h2>
        <h2 class="text-left font-[Montserrat] text-[2rem] mt-5">What's New?</h2>
        <hr class="w-11/12">
        <ol class="ml-5 mt-5 list-inside overflow-y-scroll h-[38vh] list-disc">
            <li v-for="patch in patches" class="text-[1.4rem] text-neutral-400">
                <span class="text-secondary">{{patch}}</span>
            </li>
        </ol>
        <button @click="closePatchNotes" class=" rounded-md bg-secondary p-2 px-5 text-black absolute left-[75%] bottom-6">Close</button>
    </div>
</template>

<script setup>
import { ref } from 'vue';

const patchVersion = 20
const lastSeenVersion = ref(localStorage.getItem("lastSeenVersion"));
const seenPatchNotes = ref(patchVersion <= lastSeenVersion.value);

const patches = ref([
    "Added Patch Notes ",
    "Added comments to mental health and edge cases",
    "Added AP Courses",
    "Added SITHS History",
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

@media (max-width:1200px){
    #patch-notes {
    width: 90vw;
    height: 60vh;
}
}

</style>