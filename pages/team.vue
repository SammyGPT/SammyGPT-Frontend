<template>
    <h1 class="">Our Team</h1>
    <div class="profiles">
        <div class="" v-for="(profile, index) in profiles" :key="index">
            <Memberprofile :img="profile.img" :title="profile.title" :name="profile.name"
                :description="profile.description"></Memberprofile>
        </div>
    </div>
</template>

<script setup>
import Memberprofile from '../components/memberprofile.vue'
import { profiles } from '../assets/team.js'
</script>