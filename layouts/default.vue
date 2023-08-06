<script setup>
import { ref, onMounted } from "vue"
const main = ref(null)

onUpdated(() => {
    if (localStorage.theme === undefined) {
        if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
            main.value.classList.add("dark")
        }
        return
    }
    if (localStorage.theme === "dark") {
        main.value.classList.add("dark")
    }
})

function windowLoc() {
    if (window.location.pathname.startsWith("/detection")) {
        return 2
    }
    if (window.location.pathname == "/"){
        return 0
    }
    if (window.location.pathname == "/login"){
        return 3
    }
    return 1
}
</script>

<template>
    <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@48,400,0,0" />
    <div id="main" :class="windowLoc() == 0 ? '' : 'flex'" ref="main">
        <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@48,400,0,0" />
        <SideMenu v-if="main !== null && windowLoc() == 1" :main="main"/>
        <DetectionSwitcher v-if="main !== null && windowLoc() == 2"/>
        <slot/>
        <PatchNotes/>
    </div>
</template>

<style scoped>

#main{
    /* display: flex; */
    flex-direction: row;
}

@media (max-width: 1200px) {
    #main{
        flex-direction: column;
    }
}
</style>