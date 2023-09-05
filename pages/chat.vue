<template>
    <div class="dark:bg-background bg-light-background w-full flex justify-center items-center" id="chatouter">
        <title>Sammy</title>
        <PatchNotes/>
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