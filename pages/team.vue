<template>
    <div class="dark:bg-black bg-white w-full h-full min-h-screen flex items-center flex-col pl-[7vh] pr-[7vh] pb-24">
        <title>Our Team</title>
        <Navbar />
        <h1 class="text-[8vmin] font-[Montserrat] dark:text-white text-black">Our Team</h1>

        <div class="mt-16 flex flex-row flex-wrap w-11/12 justify-center gap-x-48 gap-y-12">
            <div class="w-fit" v-for="(profile, index) in layer1" :key="index">
                <Memberprofile :img="profile[language].img" :title="profile[language].title" :name="profile[language].name"
                    :description="profile[language].description" :message="profile[language].message"></Memberprofile>
            </div>
        </div>

        <div class="mt-16 flex flex-row flex-wrap w-11/12 justify-center gap-x-48 gap-y-12">
            <div class="w-fit" v-for="(profile, index) in layer2" :key="index">
                <Memberprofile :img="profile[language].img" :title="profile[language].title" :name="profile[language].name"
                    :description="profile[language].description" :message="profile[language].message"></Memberprofile>
            </div>
        </div>

        <h2 class="mt-16 text-[7vmin] font-[Montserrat] dark:text-white text-black">Special Thanks</h2>
        <div class="mt-16 flex flex-row flex-wrap w-11/12 justify-center gap-x-48 gap-y-12">
            <div class="w-fit" v-for="(profile, index) in special" :key="index">
                <Memberprofile :img="profile[language].img" :title="profile[language].title" :name="profile[language].name"
                    :description="profile[language].description" :message="profile[language].message"></Memberprofile>
            </div>
        </div>
    </div>
</template>
    
<script setup>
import { layer1 } from '../assets/team/layer1.js'
import { layer2 } from '../assets/team/layer2.js'
import { special } from '../assets/team/special.js'

const i18n = useI18n()

const language = i18n.locale.value;

console.log(layer2)
</script>


