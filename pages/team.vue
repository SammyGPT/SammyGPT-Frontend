<template>
    <div class="dark:bg-black bg-white w-full h-full min-h-screen flex items-center flex-col pl-[7vh] pr-[7vh]">
        <Navbar />
        <h1 class="mt-4 text-[8vmin] font-[Montserrat] dark:text-white text-black">Our Team</h1>

        <div class="profiles">
            <div class="" v-for="(profile, index) in profiles" :key="index">
                <Memberprofile :img="profile.img" :title="profile.title" :name="profile.name"
                    :description="profile.description"></Memberprofile>
            </div>
        </div>
    </div>
</template>
    
<script setup>
import Memberprofile from '../components/memberprofile.vue'
import { profiles } from '../assets/team.js'
</script>

    
  