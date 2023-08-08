<template>
    <div class="flex flex-col items-center max-w-full dark:bg-accent1 bg-accent2 rounded-xl dark:text-primary text-secondary text-[Montserrat] p-4 pb-8">
        <div id="message" class="w-full items-center justify-start">
            <div class="flex" id="bot_image">
                <div>
                    <img v-if="props.loading" src="~/assets/images/message_loading.gif" class="w-16 rounded-full"/>
                    <img v-else src="~/assets/images/seagull_temp.jpg" class="w-12 h-12 rounded-full"/>
                </div>
            </div>
            <p id="content" class="ease-in-out duration-300 dark:text-white text-black whitespace-pre-line">
                {{ props.message }}
            </p>
        </div>
        <div v-if="props.references.length" class="w-[90%] rounded-xl dark:bg-accent3 bg-secondary flex flex-col items-start justify-start gap-x-4 p-4">
            <label class="dark:text-secondary text-primary font-[Montserrat] ">References: </label>
            <div class="flex flex-wrap gap-x-6 gap-y-2 overflow-scroll">
                <a v-for="link in props.references" 
                :href="link" 
                target="_blank"
                class="text-sm text-blue-400 flex-wrap underline text-ellipsis overflow-hidden" 
               >
                    {{ trim(link) }}
                </a>
            </div>
        </div>
    </div>
</template>

<script setup>

import { toRefs, toRef, defineProps } from 'vue'

const char_lim = 50

const props = defineProps({
    message: { type:String, required: true},
    loading: { type: Boolean, required: true},
    references: { type: Array, required: true}
})

const trim = (text)=>{
    if (text.length > char_lim){
        return text.substring(0, char_lim-3) + "..."
    }
    return text
}

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