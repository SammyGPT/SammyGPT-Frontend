<template>
    <div id="menu" class="bg-primary">
        <div id="inner-menu" class="flex flex-row items-center p-4">
            <img src="~/assets/images/logo.png" class="h-[4.5rem] w-[4.5rem]"/>
            <div class="pl-2">
                <h1 class="text-secondary font-[Montserrat] text-2xl">SammyGPT</h1>
                <h2 class="text-secondary font-[Montserrat] text-sm">Version Alpha</h2>
            </div>
        </div>
    </div>
</template>

<style scoped>
#menu{
    width: 20vw;
    height: 100vh;
}

#inner-menu{
    justify-content: space-evenly;
}

@media (max-width:1200px){
    #menu{
        width: 100vw;
        height: 100%;
    }

    #inner-menu{
        justify-content: start;
    }
}

</style>