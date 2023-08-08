<template>
    <div class="flex flex-col items-center max-w-full dark:bg-accent1 bg-accent2 rounded-xl dark:text-primary text-secondary text-[Montserrat]">
        <div id="message" class="w-full items-center justify-start">
            <div class="flex" id="bot_image">
                <div>
                    <img v-if="props.loading" src="~/assets/images/message_loading.gif" class="w-16 rounded-full"/>
                    <img v-else src="~/assets/images/seagull_temp.jpg" class="w-12 h-12 rounded-full"/>
                </div>
            </div>
            <div 
                id="content" 
                class="box-content ease-in-out duration-300 dark:text-white text-black break-words 
                        p-4 flex flex-col gap-y-4 [&>*]:break-words [&>*]:whitespace-pre-wrap [&>pre]:p-4 
                        dark:[&>pre]:bg-accent3 [&>pre]:bg-light-background" 
                ref="message">
            </div>
        </div>
        <div v-if="props.references.length" class="rounded-xl dark:bg-accent3 bg-secondary flex flex-col items-start justify-start gap-x-4 p-4 mb-8">
            <label class="dark:text-secondary text-primary font-[Montserrat] ">{{ $t("bot-message-reference") }}</label>
            <div class="flex flex-wrap gap-x-6 gap-y-2 overflow-scroll">
                <a v-for="link in props.references" 
                :href="link" 
                target="_blank"
                class="text-sm text-blue-400 flex-wrap underline text-ellipsis overflow-hidden whitespace-pre-line break-all" 
               >
                    {{ trim(link) }}
                </a>
            </div>
        </div>
    </div>
</template>

<script setup>

import { toRefs, toRef, defineProps } from 'vue'
import { marked } from 'marked'
import hljs from 'highlight.js';
import 'highlight.js/styles/default.css'; // Light theme
import 'highlight.js/styles/dark.css';    // Dark theme

marked.setOptions({
  highlight: function (code, lang) {
    if (lang && hljs.getLanguage(lang)) {
      try {
        return hljs.highlight(code, { language: lang }).value;
      } catch (error) {
        console.error(error);
      }
    }
    return hljs.highlightAuto(code).value;
  },
});

const char_lim = 50

const message = ref(null)

const update_message = ()=>{
    message.value.innerHTML = marked(props.message)
}

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

onUpdated(()=>{
    update_message()
})

</script>

<style>

#content *{
    word-break: break-word;
    font-size: 1.2rem
}

#content ul{
    list-style-type: disc;
}

#content li{
    list-style-type: disc;
}

#message{
    display: grid;
    grid-template-columns: 1fr 10fr 1fr;
    padding: 2rem 0 2rem 0;
}

#bot_image{
    justify-content: center;
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

    #content * {
        font-size: 3vmin;
    }

}


</style>