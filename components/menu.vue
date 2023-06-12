<template>
    <div id="menu" class="bg-primary">
        <Logo/>
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
        height: 15vh;
    }

    #inner-menu{
        justify-content: start;
    }
}

</style>