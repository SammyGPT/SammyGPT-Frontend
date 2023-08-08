<script setup>
import { GoogleSignInButton, decodeCredential, useOneTap } from "vue3-google-signin";

const userDataStore = useState('userData', () => null)

const success = (response) => {
    const { credential } = response;
    const userData = decodeCredential(credential)
    userDataStore.value = userData
    console.log(userData)
}
const fail = () => console.error("Error with One Tap Login")
</script>

<template>
    <div class="w-[100vw] h-[100vh] dark:bg-primary bg-slate-100 font-[Montserrat] py-[30vh]">
        <h1 class="text-center text-[3rem] dark:text-white text-primary">{{ $t("teacher-login") }}</h1>
        <div id="container" class="flex justify-center">
            <GoogleSignInButton @success="success" @error="fail" class="h-[10vh]"></GoogleSignInButton>
        </div>
    </div>
</template>