<template>
    <div class="bg-primary w-[85%] h-[80%] rounded-2xl" id="chatbox">
        <div id="chatbox" class="flex flex-col items-center p-7 overflow-y-auto">
            <BotMessage/>
        </div>
        <form id="form" class="pt-5 pl-7 pr-5" :onsubmit="send" autocomplete="off">
            <div class="h-full flex justify-center items-center">
                <input type="text" id="user_input" 
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
    grid-template-rows: 1fr 0.15fr;
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
import { ref, onMounted } from 'vue'

const send_button = ref(null)

const send = (e)=>{
    e.preventDefault()
    
}
</script>