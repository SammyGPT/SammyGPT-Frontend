<template>
    <div id="menu" class="bg-primary">
        <Logo/>
    </div>
</template>

<script setup>
import { ref, onMounted, reactive } from 'vue'
import { useRouter } from 'vue-router';
import { useFetch } from 'nuxt/app';

const router = useRouter()

onMounted(async()=>{
    const env = useRuntimeConfig()
    const { data, pending, error, refresh} = await useFetch(`http://${env.public.api}/`, { crossOrigin: '*' })

    if (error.value && window.location.pathname.indexOf("/server_is_down") == -1){
        router.push('/server_is_down')
    }
})

</script>

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