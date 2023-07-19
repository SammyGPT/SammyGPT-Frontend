<template>
    <div class="bg-primary w-[85%] h-[75vh] rounded-2xl" id="chatbox">
        <div id="chatbox" ref="chatbox" class="h-full flex flex-col items-start p-7 overflow-y-scroll overflow-x-hidden">
            <div class="flex flex-col gap-y-2" ref="container" id="container">
                <Examples class="h-fit" v-if="messages.length === 0" @putInChat="(x) => {user_input.value = x; editBoxSize()}"/>
                <div v-for="msg in messages">
                    <BotMessage v-if="msg.is_bot" :message="msg.message"/>
                    <UserMessage v-if="!msg.is_bot" :message="msg.message"/>
                </div>
            </div>
        </div>
        <div>
            <p class="text-green-500 w-full flex items-center justify-center p-4">
                {{ system_msg }}
            </p>
        </div>
        <form id="form" class="pt-5 pl-7 pr-5" :onsubmit="send" autocomplete="off" @keydown="handleInput">
            <div class="h-full flex justify-center items-center">
                <textarea type="text" id="user_input" ref="user_input"
                    class="w-full bg-accent1 border-2 
                    border-gray-400 p-4 text-secondary rounded-[1rem]
                    text-[Montserrat] focus:border-yellow-100 
                    outline-none text-[1.2rem] ease-in-out duration-300 resize-none max-h-[30vh]"
                    @input='editBoxSize'
                    rows="1"
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
import Examples from "/components/examples.vue"
import { ref, onMounted, reactive } from 'vue'
import { useFetch } from 'nuxt/app';

const send_button = ref(null)
const user_input = ref(null)
const chatbox = ref(null)
const container = ref(null)
const env = useRuntimeConfig()

const generation_speed = {"slow": 150, "medium": 75, "fast": 0}

var messages = reactive([]) // conversation history
var message_cache = reactive([]) // array of words to be printed for bot
var waiting_response = reactive(false)
var system_msg = reactive("")
var conn = reactive(null)
var is_printing = reactive(false) // keeps track of the printing_message task, only 1 instance at a time
const END_TOKEN = "<END>"

const ping = ()=>{
    conn.send(JSON.stringify({"prompt": null, "type": "ping"}))
}

// Prints the message at reading speed for the bot
const print_message = async()=>{

    if (is_printing) return
    is_printing = true

    while (message_cache.length > 0){
        
        let word = message_cache.shift()
        
        if (word == END_TOKEN){
            system_msg = ""
            waiting_response = false
        }else{
            messages[messages.length - 1].message += word + " "
        }

        let word_delay = generation_speed[localStorage.getItem("generationSpeed")]
        
        await sleep(word_delay)
        scroll_down()
    }
    
    is_printing = false
}

onMounted(async()=>{
    conn = new WebSocket(`${env.public.ws_protocol}://${env.public.api}/generate`)

    setInterval(ping, 50000)

    conn.addEventListener("message", async(res)=>{

        let data = JSON.parse(res['data'])
        
        let response = data["generated"]
        let end = data["end"]

        let splitted = response.split(" ")

        message_cache = message_cache.concat(splitted)

        if (end) message_cache.push(END_TOKEN)
        
        print_message()
    })

})

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
    await sleep(150)
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
    
    conn.send(JSON.stringify({"prompt": prompt, "type": "prompt"}))
    messages.push(new Message(prompt, false))
    waiting_response = true
    system_msg = "Estimated wait time: ~30 seconds/response. Will have less wait time at production."

    scroll_down()

    messages.push(new Message("", true))

}
function handleInput(e) {
    if (e.which === 13 && !e.shiftKey) {
        if (!e.repeat) {
            const newEvent = new Event("submit", {cancelable: true});
            e.target.form.dispatchEvent(newEvent);
        }
        e.preventDefault();
    }
}
function editBoxSize() {
    user_input.value.style.height = ""; 
    user_input.value.style.height = user_input.value.scrollHeight + "px"
}
</script>