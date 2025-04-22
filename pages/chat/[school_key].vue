<template>
    <div class="dark:bg-background bg-light-background w-full flex justify-center items-center" id="chatouter">
        <title>Sammy</title>
        <PatchNotes/>
        <Chatbox :schoolKey="school_key"/>
        <FooterMessage/>
    </div>
</template>
<script setup>

import { useRoute } from 'vue-router';

const route = useRoute();
const school_key = route.params.school_key;

</script>
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