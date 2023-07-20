<template>
    <div class="bg-background w-full flex justify-center items-center" id="chatouter">
        <Loadingscreen/>
        <Chatbox/>
        <FooterMessage/>
    </div>
</template>

<style scoped>
#chatouter{
    height: 100vh;
}

@media (max-width: 1200px){
    #chatouter{
        height: 85vh;
    }
}

</style>