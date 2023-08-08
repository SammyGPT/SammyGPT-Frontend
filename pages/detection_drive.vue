<script setup>
import { ref, onMounted } from "vue"
import axios from 'axios';

const textarea = ref(null)
const result = ref("")
const progress = ref(0)
const results = ref([])
let tokenClient;
let accessToken = null;
let pickerInited = false;
let gisInited = false;

const i18n = useI18n()

const env = useRuntimeConfig()

const handleOnSuccess = (response) => {
    console.log("Access Token: " + response.access_token);
    createPicker(response.access_token)
};

const handleOnError = (errorResponse) => {
    console.log("Error: " + errorResponse);
};

const { isReady, login } = useTokenClient({
    onSuccess: handleOnSuccess,
    onError: handleOnError,
    // other options
});

onMounted(() => {
    let gDrive = document.createElement("script");
    gDrive.setAttribute("type", "text/javascript");
    gDrive.setAttribute("src", "https://apis.google.com/js/api.js");
    document.head.appendChild(gDrive);
    let gsi = document.createElement("script");
    gsi.setAttribute("type", "text/javascript");
    gsi.setAttribute("src", "https://apis.google.com/js/api.js");
    document.head.appendChild(gsi);
})

function init() {
    onApiLoad()
    gisLoaded()
    createPicker()
}

// Use the API Loader script to load google.picker
function onApiLoad() {
    gapi.load('picker', onPickerApiLoad);
}

function onPickerApiLoad() {
    pickerInited = true;
}

function gisLoaded() {
    // TODO(developer): Replace with your client ID and required scopes.
    tokenClient = google.accounts.oauth2.initTokenClient({
        client_id: '885744489083-sesf2bhp70vs7cgqsl7mrgg5mi4l7s6k.apps.googleusercontent.com',
        scope: 'https://www.googleapis.com/auth/drive',
        callback: '', // defined later
    });
    gisInited = true;
}


function createPicker() {
    if (accessToken === null) {
        // Prompt the user to select a Google Account and ask for consent to share their data
        // when establishing a new session.
        tokenClient.requestAccessToken({ prompt: 'consent' });
    } else {
        // Skip display of account chooser and consent dialog for an existing session.
        tokenClient.requestAccessToken({ prompt: '' });
    }
    tokenClient.callback = async (response) => {
        if (response.error !== undefined) {
            throw (response);
        }
        accessToken = response.access_token;

        const picker = new google.picker.PickerBuilder()
            .enableFeature(google.picker.Feature.MULTISELECT_ENABLED)
            .addView(google.picker.ViewId.DOCUMENTS)
            .setOAuthToken(accessToken)
            .setLocale(i18n.locale.value == "zh" ? "zh-CN" : i18n.locale.value)
            .setDeveloperKey('AIzaSyA-xKIMopdn_y1Vr8M9v9hTC0ypPd6yDy0')
            .setCallback(pickerCallback)
            .build();
        picker.setVisible(true);
    };
}

async function pickerCallback(data) {
    console.log("PickerCallback", data);
}
</script>

<template>
    <div class="w-full min-w-[100vw] h-full min-h-[100vh] dark:bg-background bg-slate-100 font-[Montserrat] p-8">
        <h1 class="text-black dark:text-white text-center text-[3rem]">AI Detector</h1>
        <div class="mx-auto w-fit mt-9">
            <button :disabled="!isReady" @click="() => init()" class="text-white">Upload Files From Drive</button>
        </div>
        <div class="flex justify-center my-8">
            <Button :toggle_button="false" :selected="false" text="Check for AI" @clicked="getResults" class=""></Button>
        </div>
        <!-- <h2 class="text-black dark:text-white text-center text-[3rem]">{{ result }}</h2> -->
        <DetectionLoading :progress="progress" />
        <div id="files" class="flex flex-wrap mt-[15vh] h-auto">
            <div class="w-[20vw] h-[20vw] bg-white" v-for="result in results">
                <h3 class="text-center text-[2rem]">{{ result.fileName }}</h3>
                <p class="text-center text-[1.2rem]">{{ `Made by ${result.result.result},
                                    ${Math.round(result.result.probability * 10000) / 100}% confidence` }}</p>
            </div>
        </div>
    </div>
</template>

<style scoped></style>