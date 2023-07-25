<script setup>
import { ref, onMounted } from "vue"
const main = ref(null)

onMounted(() => {
    if (localStorage.theme === undefined) {
        if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
            console.log("e")
            main.value.classList.add("dark")
        }
        return
    }
    if (localStorage.theme === "dark") {
        main.value.classList.add("dark")
    }
})

function windowLoc() {
    if (window.location.pathname == "/detection") {
        return false
    }
    return true
}
</script>

<template>
    <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@48,400,0,0" />
    <div id="main" class="" ref="main">
        <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@48,400,0,0" />
        <SideMenu v-if="main !== null && windowLoc()" :main="main"/>
        <slot/>
        <PatchNotes/>
    </div>
</template>

<style scoped>
#main{
    display: flex;
    flex-direction: row;
}

@media (max-width: 1200px) {
    #main{
        flex-direction: column;
    }
}
</style>