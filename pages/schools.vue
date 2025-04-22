<template>
    <div class="dark:bg-black bg-white w-full h-full min-h-screen flex items-center flex-col pl-[7vh] pr-[7vh] pb-24">
      <title>Schools</title>
      <Navbar />
      <h1 class="text-[8vmin] font-[Montserrat] dark:text-white text-black">Schools</h1>
      <ul class="mt-8 w-full">
        <li v-for="(school, index) in schools" :key="index" class="p-4 border-b border-gray-300 dark:border-gray-600">
            <button :class="['text-lg w-full text-left py-2 px-4 rounded-lg dark:bg-gray-800 dark:text-white bg-gray-100 text-black hover:bg-gray-200 dark:hover:bg-gray-700 transition',]"
            @click="navigateToChat(lang, keys[index])">
            {{ school }}
            </button>
        </li>
</ul>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted } from 'vue';
  import { io } from "socket.io-client";
  import { useRouter } from 'vue-router';
  import { useI18n } from 'vue-i18n';
  
  const router = useRouter();
  const i18n = useI18n()
  const lang = ref(i18n.locale.value)
  // WebSocket connection
  const env = useRuntimeConfig();
  const conn = ref(null);
  
  // List of schools
  const schools = ref([]);
  const keys = ref([])
  
  onMounted(() => {
    // Initialize WebSocket connection
    conn.value = io(`${env.public.ws_protocol}://${env.public.api}`);
  
    conn.value.on("connect", () => {
      console.log("Connected to server");
  
      // Request schools data
      conn.value.emit("schools");
    });
  
    // Handle schools data response
    conn.value.on("schools", (data) => {
      if (data?.schools) {
        schools.value = data.schools; // Update the schools list
        keys.value = data.keys
        console.log(data)
      } else {
        console.error("Failed to fetch schools data");
      }
    });
  
    conn.value.on("disconnect", () => {
      console.log("Disconnected from server");
    });
  
    // Clean up on unmount
    return () => {
      conn.value?.disconnect();
    };
});

function navigateToChat (lang, key) {
    if (lang == "en"){
      router.push(`/chat/${key}`);
    }
    else{
      router.push(`/${lang}/chat/${key}`);
    }
};
  </script>
  