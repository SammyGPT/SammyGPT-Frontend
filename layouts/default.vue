<template>
    <div id="main">
        <Menu/>
        <slot/>
        <Patch_notes/>
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