<template>
    <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@48,400,0,0" />
    <div id="main">
        <Menu/>
        <slot/>
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