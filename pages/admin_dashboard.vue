<template>
    <div class="dark:bg-primary bg-secondary w-[100vw] h-[100vh] flex flex-col content-between" id="bg">
        <div class="bg-black rounded-lg w-[85%] h-[80%] m-auto text-white border-gray-500 border-[1px] p-4">
            <div class="flex gap-2" v-for="message in messages">
                <p class=" text-blue-500">[{{ message.time }}]</p>
                <p>[LOG]</p>
                <p>{{ message.message }}</p>
            </div>
        </div>
    </div>            
</template>

<style scoped>
</style>

<script setup>
import Examples from "/components/examples.vue"
import { ref, onMounted, reactive } from 'vue'
import { io } from "socket.io-client"
const chatbox = ref(null)
const env = useRuntimeConfig()


var messages = reactive([])
var conn = reactive(null)

onMounted(async()=>{
    conn = io(`${env.public.ws_protocol}://${env.public.api}`)

    conn.on("connect", () => {
        console.log("Successfully connected to server");
        conn.emit("new_session")
    });

    conn.on("broadcast", async(data)=>{
        messages.push(data)
    })
})

const scroll_down = async()=>{
    await sleep(150)
    chatbox.value.scrollTop = chatbox.value.scrollHeight
}
</script>