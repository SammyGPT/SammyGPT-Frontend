<template>
    <div class=" dark:bg-primary bg-secondary w-[85%] h-[75vh] rounded-2xl" id="chatbox">
        <div id="chatbox" ref="chatbox" class="h-full flex flex-col items-start p-7 overflow-y-scroll overflow-x-hidden">
            <div class="flex flex-col gap-y-2" ref="container" id="container">
                <Examples class="h-fit" v-if="messages.length === 0" @putInChat="(x) => {user_input.value = x; editBoxSize()}"/>
                <div v-for="msg in messages">
                    <BotMessage v-if="msg.is_bot" :message="msg.message" :loading="msg.loading" :references="msg.reference"/>
                    <UserMessage v-if="!msg.is_bot" :message="msg.message" :loading="msg.loading"/>
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
                    class="w-full dark:bg-accent1 bg-accent2 border-2 
                    border-gray-400 p-4 dark:text-secondary text-primary rounded-[1rem]
                    text-[Montserrat] focus:border-yellow-100 
                    outline-none text-[1.2rem] ease-in-out duration-300 resize-none max-h-[30vh]"
                    @input='editBoxSize'
                    rows="1"
                />
            </div>
            <div class="flex justify-center items-center">
                <button class="flex justify-center items-center dark:text-white text-black material-symbols-outlined ease-in-out duration-300 cursor-pointer" @click="getTranscript" ref="mic_button"  id="mic_button">
                    mic
                </button>
                <button alt="send button" class="dark:text-white text-black material-symbols-outlined w-[6vmin] ease-in-out duration-300 cursor-pointer" ref="send_button" id="send_button">
                    send
                </button>
            </div>
        </form>
        <div class="w-full flex justify-center items-center">
            <h3 class="dark:text-secondary text-primary p-2 text-sm">{{ $t("chat-sammygpt-version") }}</h3>
        </div>
        <audio class="hidden" loop ref="placeholder_audio">
            <source src="~assets/audio/seagull.wav">
        </audio>
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
#send_button {
    font-size: 2.2rem;
}
#send_button:hover {
    color: #f4ff77;
}

#mic_button{
    font-size: 2.2rem;
}
.mic_recording{
    background-color: rgb(255, 64, 64);
    border-radius: 100%;
}
</style>

<script setup>
import Examples from "/components/examples.vue"
import { ref, onMounted, reactive } from 'vue'
import { useFetch } from 'nuxt/app';
import { io } from "socket.io-client"
const i18n = useI18n()
const lang = ref(i18n.locale.value)
const send_button = ref(null)
const mic_button = ref(null)
const user_input = ref(null)
const placeholder_audio = ref(null)
const chatbox = ref(null)
const container = ref(null)
const speaking = ref(false)
const env = useRuntimeConfig()

// tts and voice recognition
const voices = ref([])
const synth = ref(null)
const lang_voice = ref(null)
const tts_sentence = ref("")
const volume = 0.7
const maxChar = 300
const speed = 1.25

const generation_speed = {"slow": 150, "medium": 75, "fast": 0}

var messages = reactive([]) // conversation history
var message_cache = reactive([]) // array of words to be printed for bot
var waiting_response = reactive(false)
var system_msg = reactive("")
var conn = reactive(null)
var session_id = reactive(null)
var is_printing = reactive(false) // keeps track of the printing_message task, only 1 instance at a time
const END_TOKEN = "<END>"
const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition
var recognition = undefined

if (SpeechRecognition){
    recognition = new SpeechRecognition()
}
const getTranscript = (e)=>{
    e.preventDefault()
    if (speaking.value) return
    speaking.value = true // so no two instances at once

    if (! ('SpeechRecognition' in window || 'webkitSpeechRecognition' in window)){ // if speech recognition not allowed
        alert("Speech recognition is not enabled in this browser. Please fix it in settings if possible.")
        return
    }
    
    recognition.lang = lang.value // get the i18n langauge
    recognition.interimResults = true // false means to wait until whole sentence complete, true is while user is speaking
    recognition.maxAlternatives = 1 // max number of transcripts
    mic_button.value.classList.add("mic_recording") // mic color

    recognition.start()

    recognition.onresult = function(event) {

        const speechResult = event.results[0][0].transcript; // Get the transcript of what was said
        user_input.value.value = speechResult
        // console.log(`You said (in ${i18n.locale.value}): `, speechResult);
        
        if (event.results[0].isFinal){ // if the voice recognition is final/done
            
            mic_button.value.classList.remove("mic_recording") // mic color
            recognition.stop()
            speaking.value = false
            synth.value.cancel()
            send(e, true) // send the message to server. Requires tts
        }
    };
}

const isEndingSentence = (sentence) => {
    // Check if the sentence contains a period, exclamation mark, question mark, colon, or semicolon
    return /[.!?;:]/.test(sentence.trim()) || sentence.length >= maxChar;
}

const processTTS = ()=>{
    
    const sanitizedText = tts_sentence.value.replace(/[\/#$%\^&\*;:{}=\-_`~()]/g, "")
    const utterance = new SpeechSynthesisUtterance(sanitizedText)
    utterance.rate = speed // speed of the reading
    utterance.voice = lang_voice.value
    utterance.volume = volume
    synth.value.speak(utterance); // adds to speechSynthesis queue
    tts_sentence.value = ""
}

// Prints the message at reading speed for the bot
const print_message = async(single_token)=>{

    if (is_printing) return
    is_printing = true
    placeholder_audio.value.volume = 0.7
    // placeholder_audio.value.play()

    while (message_cache.length > 0){
        
        let word = message_cache.shift()
        let require_tts = messages[messages.length - 1].tts
        
        if (word == END_TOKEN){

            if (require_tts){
                processTTS()
            }

            system_msg = ""
            waiting_response = false
            messages[messages.length - 1].loading = false
            
            // placeholder_audio.value.pause()

        }else{
            tts_sentence.value += word
            messages[messages.length - 1].message += word
            if (!single_token){ // If not single token, we split by " ", which means we need to add it back
                messages[messages.length - 1].message += " "
                tts_sentence.value += " "
            }
            if (require_tts && isEndingSentence(tts_sentence.value)){
                processTTS()
            }
        }

        let word_delay = generation_speed[localStorage.getItem("generationSpeed")]
        
        await sleep(word_delay)
        scroll_down()
    }
    
    is_printing = false
}

onMounted(async()=>{
    conn = io(`${env.public.ws_protocol}://${env.public.api}`)

    conn.on("connect", () => {
        console.log("Successfully connected to server");
        conn.emit("new_session")
    });

    conn.on("session_id", (data)=>{
        session_id = data["session_id"]
    })

    conn.on("message", async(data)=>{
        
        let response = data["generated"]
        let end = data["end"]
        let single_token = data["single_token"]

        if (!single_token){
            response = response.split(" ")
        }

        message_cache = message_cache.concat(response)

        if (end) {
            messages[messages.length - 1].references = data["references"]
            message_cache.push(END_TOKEN)
        }
        
        print_message(single_token)
    })

    speechSynthesis.onvoiceschanged = function() {
        voices.value = speechSynthesis.getVoices();
        for (let v of voices.value){
            if (v.lang.indexOf(lang.value) != -1) {
                lang_voice.value = v
                break
            }
        }
        console.log("TTS is ready")
    };

    synth.value = window.speechSynthesis;

})

class Message{

    constructor(message, is_bot, requireTTS){
        this.msg = message
        this.bot = is_bot
        this.load_state = true
        this.references = []
        this.tts_required = requireTTS
    }

    get tts(){
        return this.tts_required
    }

    get message(){
        return this.msg
    }

    set message(new_message){
        this.msg = new_message
    }

    get loading(){
        return this.load_state
    }

    set loading(new_state){
        this.load_state = new_state
    }

    get reference(){
        return this.references
    }

    set reference(new_references){
        this.references = new_references
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

const send = async(e, require_tts = false)=>{
    e.preventDefault()    
    let prompt = user_input.value.value
    if (waiting_response) return
    if (prompt.trim() == "") return
    user_input.value.value = ""
    chatbox.value.innerHtml = ""
    editBoxSize()   

    conn.emit("generate", {"prompt": prompt, "type": "prompt", "session_id": session_id})
    messages.push(new Message(prompt, false, false))
    waiting_response = true
    system_msg = "Estimated wait time: ~30 seconds/response. Will have less wait time at production."

    scroll_down()

    messages.push(new Message("", true, require_tts))

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