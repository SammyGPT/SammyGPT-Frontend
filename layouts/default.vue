<script setup>
import { ref, onMounted } from "vue"
const main = ref(null)

onUpdated(() => {
    if (localStorage.theme === undefined) {

        if (window.matchMedia) { // if preference exists
            if (window.matchMedia('(prefers-color-scheme: dark)').matches){ // dark mode
                localStorage.theme = "dark"
                main.value.classList.add("dark")
            }else{} // do nothing as it is light mode preference
        }else{ // give darkmode if no preference
            localStorage.theme = "dark"
            main.value.classList.add("dark")
        }
        return
    }
    if (localStorage.theme === "dark") {
        main.value.classList.add("dark")
    }
})

function windowLoc() {
    if (window.location.pathname.indexOf("/detection") != -1) {
        return 2
    }
    else if (window.location.pathname.indexOf("/login") != -1){
        return 3
    }
    else if (window.location.pathname.indexOf("/chat") != -1){
        return 1
    }
    return 0
}
</script>

<template>
    <div id="main" :class="windowLoc() == 0 ? '' : 'flex'" ref="main">
        <header></header>
        <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@48,400,0,0" />
        <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@48,400,0,0" />
        <SideMenu v-if="main !== null && windowLoc() == 1" :main="main"/>
        <DetectionSwitcher v-if="main !== null && windowLoc() == 2"/>
        <slot/>
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