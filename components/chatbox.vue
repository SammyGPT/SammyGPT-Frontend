<template>
    <div class="bg-primary w-[85%] h-[75vh] rounded-2xl" id="chatbox">
        <div id="chatbox" ref="chatbox" class="h-full flex flex-col items-start p-7 overflow-y-scroll">
            <div class="overflow-y-auto flex flex-col gap-y-2" ref="container" id="container">
                <div v-for="msg in messages">
                    <BotMessage v-if="msg.is_bot" :message="msg.message"/>
                    <UserMessage v-if="!msg.is_bot" :message="msg.message"/>
                </div>
            </div>
        </div>
        <div>
            <p class="text-green-500 w-full flex items-center justify-center">
                {{ system_msg }}
            </p>
        </div>
        <form id="form" class="pt-5 pl-7 pr-5" :onsubmit="send" autocomplete="off">
            <div class="h-full flex justify-center items-center">
                <input type="text" id="user_input" ref="user_input"
                    class="w-full bg-accent1 border-2 
                    border-gray-400 p-4 text-secondary rounded-full 
                    text-[Montserrat] focus:border-yellow-100 
                    outline-none text-[1.2rem] ease-in-out duration-300"
                />
            </div>
            <div class="flex justify-center items-center">
                <button class="text-black">
                    <img alt="send button" src="~/assets/images/send.png" class="w-[6vmin] ease-in-out duration-300" id="send_button"/>
                </button>
            </div>
        </form>
        <div class="w-full flex justify-center items-center">
            <h3 class="text-secondary p-2 text-sm">SammyGPT Version Monday, June 12th</h3>
        </div>
    </div>
</template>

<style scoped>
#chatbox{
    display: grid;
    grid-template-rows: 1fr 0.025fr 0.15fr 0.1fr;
}

#container{
    box-sizing: padding-box;
}

#user_input{
    text-decoration: none;
}

#form{
    display: grid;
    grid-template-columns: 1fr 0.1fr;
}

#send_button{
    filter: invert(100%);
}

#send_button:hover {
    filter: invert(100%) sepia(90%) saturate(1000%) hue-rotate(5deg);
}
</style>

<script setup>
import { ref, onMounted, reactive } from 'vue'
import { useFetch } from 'nuxt/app';

const send_button = ref(null)
const user_input = ref(null)
const chatbox = ref(null)
const container = ref(null)
const env = useRuntimeConfig()

var messages = reactive([])
var waiting_response = reactive(false)
var system_msg = reactive("")

class Message{

    constructor(message, is_bot){
        this.msg = message
        this.bot = is_bot
    }

    get message(){
        return this.msg
    }

    set message(new_message){
        this.msg = new_message
    }

    get is_bot(){
        return this.bot
    }
}

const scroll_down = async()=>{
    await sleep(100)
    chatbox.value.scrollTop = chatbox.value.scrollHeight
}

const sleep = async(ms)=> {
    return new Promise(resolve => setTimeout(resolve, ms));
}

const send = async(e)=>{
    e.preventDefault()
    if (waiting_response) return

    let prompt = user_input.value.value
    user_input.value.value = ""
    chatbox.value.innerHtml = ""

    messages.push(new Message(prompt, false))
    waiting_response = true
    system_msg = "Estimated wait time: 15 seconds"

    scroll_down() 

    const { data, pending, error, refresh} = await useFetch(`${env.public.api}/generate?prompt=${prompt}`, { crossOrigin: '*' })
    messages.push(new Message("", true))

    scroll_down()

    for (let word of data.value.split(" ")){
        messages[messages.length - 1].message += " " + word
        await sleep(100)
    }

    waiting_response = false
    system_msg = ""

}
</script>