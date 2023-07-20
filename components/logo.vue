<template>
    <div class="flex flex-col items-center">
        <div id="inner-menu" class="flex flex-row items-center p-7">
            <img src="~/assets/images/logo.png" class="h-[8vmin] w-[8vmin]" id="logo"/>
            <div class="pl-2">
                <h1 class="dark:text-secondary text-primary font-[Montserrat] text-[1.25vw]" id="logo-text">SammyGPT</h1>
                <h2 class="dark:text-secondary text-primary font-[Montserrat] text-sm">Version Alpha</h2>
            </div>
        </div>
    </div>
</template>

<style>

@media (max-width:1200px){

    #logo{
        width: 5rem;
        height: 5rem;
    }

    #logo-text{
        font-size: 5vmin;
    }
}

</style>