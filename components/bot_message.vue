<template>
    <div id="message" class="max-w-full dark:bg-accent1 bg-accent2 rounded-xl dark:text-secondary text-primary text-[Montserrat] lex items-center justify-start">
        <div class="flex" id="bot_image">
            <div>
                <img v-if="props.loading" src="~/assets/images/message_loading.gif" class="w-16 rounded-full"/>
                <img v-else src="~/assets/images/seagull_temp.jpg" class="w-12 h-12 rounded-full"/>
            </div>
        </div>
        <p id="content" class="ease-in-out duration-300 dark:text-white text-black whitespace-pre-line">
            {{ props.message }}
        </p>
        <div></div>
    </div>
</template>

<script setup>

import { toRefs, toRef, defineProps } from 'vue'

const props = defineProps({
    message: { type:String, required: true},
    loading: { type: Boolean, required: true}
})

</script>

<style>

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

.spinner{
    animation: spin 1s linear infinite;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
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