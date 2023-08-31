<template>
    <div id="message" class="max-w-full dark:bg-accent1 bg-accent2 rounded-xl dark:text-secondary text-primary text-[Montserrat] flex items-center justify-start">
        <div class="flex" id="bot_image">
            <img :src="pfp" class="w-12 h-12 rounded-full"/>
        </div>
        <p id="content" class="ease-in-out duration-300 dark:text-white text-black">
            {{ props.message }}
        </p>
        <div></div>
    </div>
</template>

<script setup>

import { toRefs, toRef, defineProps } from 'vue'
const userDataStore = useState('userData', () => null)


const props = defineProps({
    message: { type:String, required: true}
})

const pfp = computed(() => {
    if (userDataStore.value == null) {
        return "user_image.png"
    } 
    return userDataStore.value.picture
})
</script>

<style scoped>


#content *{
    word-break: break-all;
}

#message{
    display: grid;
    grid-template-columns: 1fr 10fr 1fr;
    padding: 2rem 0 2rem 0;
}

#bot_image{
    justify-content: center;
}

#content{
    font-size: 1.2rem;
}

@media (max-width: 1200px){
    #message{
        display: flex;
        flex-direction: column;
        padding: 1.5rem 1.5rem 1.5rem 1.5rem;
    }

    #bot_image{
        padding-bottom: 1rem;
    }

    #content{
        font-size: 3vmin;
    }

}

</style>