<template>
    <div class="w-full menu flex items-center justify-start p-4">
        <Logo />
        <div class="z-20 flex flex-row flex-wrap justify-center gap-y-4">
            <div class="flex justify-center items-center">
                <NuxtLink v-for="{ code, name } in locales" :key="code" :to="switchLocalePath(code)"
                class="mr-4 dark:text-white text-primary" :class="{
                    'underline': code == locale
                }">
                    {{ name }}
                </NuxtLink>
            </div>
            <div class="flex justify-center items-center">
                <NuxtLink class="mr-4 dark:text-white text-primary" to="/team">{{ $t('nav-team') }}</NuxtLink>
                <NuxtLink class="mr-4 dark:text-white text-primary" to="mailto:youweiz@nycstudents.net">{{ $t('nav-contact') }}</NuxtLink>
            </div>
            <ThemeButton :main="main" :dark-mode="darkMode" @dark-mode="(e) => darkMode = e" />
        </div>
    </div>
</template>

<script setup>
const darkMode = ref(localStorage.theme.toLowerCase() == "dark")
const main = ref(null)

const { locale, locales } = useI18n()
const switchLocalePath = useSwitchLocalePath()

onMounted(() => {
    main.value = document.getElementById("main")
    darkMode.value = localStorage.theme == "dark"
})
</script>

<style>
@media (max-width: 1200px) {

    .menu {
        flex-direction: column;
    }

}
</style>