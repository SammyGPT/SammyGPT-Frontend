<script setup>
const emit = defineEmits(['putInChat'])
function handleEmit(e) {
    emit("putInChat", e.target.innerHTML)
}
</script>

<template class="h-fit">
    <div id="examples" class="h-fit font-[Montserrat]">
        <h3 id="heading" class="dark:text-secondary text-primary text-center p-0 w-[50%] mx-auto text-[3rem]">{{ $t("project-name") }}</h3>
        <div id="contianer" class="flex justify-center gap-4 mt-[5vh] h-fit">
            <div class="text-box-container w-[20%] self-center bg-transparent flex flex-col h-[23rem] gap-4">
                <span class="material-symbols-outlined dark:text-secondary text-primary mx-auto">sunny</span>
                <h3 class=" w-full text-center dark:text-secondary text-primary text-[1.2rem]">{{ $t("example-header") }}</h3>
                <p class="text-box dark:text-secondary text-primary w-full text-center dark:bg-gray-700 bg-light-background h-fit p-4 shadow rounded-md cursor-pointer" @click="handleEmit">{{ $t("example-1") }}</p>
                <p class="text-box dark:text-secondary text-primary w-full text-center dark:bg-gray-700 bg-light-background h-fit p-4 shadow rounded-md cursor-pointer" @click="handleEmit">{{ $t("example-2") }}</p>
                <p class="text-box dark:text-secondary text-primary w-full text-center dark:bg-gray-700 bg-light-background h-fit p-4 shadow rounded-md cursor-pointer" @click="handleEmit">{{ $t("example-3") }}</p>    
            </div>
            <div class="text-box-container w-[20%] self-center bg-transparent flex flex-col h-[23rem] gap-4">
                <span class="material-symbols-outlined dark:text-secondary text-primary mx-auto">electric_bolt</span>
                <h3 class=" w-full text-center dark:text-secondary text-primary text-[1.2rem]">{{ $t("capabilities-header") }}</h3>
                <p class="text-box dark:text-secondary text-primary w-full text-center dark:bg-gray-700 bg-light-background h-fit p-4 shadow rounded-md">{{ $t("capabilities-1") }}</p>
                <p class="text-box dark:text-secondary text-primary w-full text-center dark:bg-gray-700 bg-light-background h-fit p-4 shadow rounded-md">{{ $t("capabilities-2") }}</p>
                <p class="text-box dark:text-secondary text-primary w-full text-center dark:bg-gray-700 bg-light-background h-fit p-4 shadow rounded-md">{{ $t("capabilities-3") }}</p>    
            </div>
            <!-- THIS WILL ME ADDED BACK WHEN CONFIRMATION FROM SCHOOL -->
            <!-- <div class="text-box-container w-[20%] self-center bg-transparent flex flex-col h-[23rem] gap-4">
                <span class="material-symbols-outlined text-secondary mx-auto">warning</span>
                <h3 class=" w-full text-center text-secondary text-[1.2rem]">Disclaimer</h3>
                <p class="text-box text-secondary w-full text-center bg-gray-700 h-fit p-4 shadow rounded-md">May occasionally generate incorrect information</p>
                <p class="text-box text-secondary w-full text-center bg-gray-700 h-fit p-4 shadow rounded-md">May have incorrect grammar</p>
                <p class="text-box text-secondary w-full text-center bg-gray-700 h-fit p-4 shadow rounded-md">Limited knowledge of world and events after February 2022</p>    
            </div> -->

            <div class="text-box-container w-[20%] self-center bg-transparent flex flex-col h-[23rem] gap-4">
                <span class="material-symbols-outlined dark:text-secondary text-primary mx-auto">token</span>
                <h3 class=" w-full text-center dark:text-secondary text-primary text-[1.2rem]">{{ $t("benefits-header") }}</h3>
                <p class="text-box dark:text-secondary text-primary w-full text-center dark:bg-gray-700 bg-light-background h-fit p-4 shadow rounded-md">{{ $t("benefits-1") }}</p>
                <p class="text-box dark:text-secondary text-primary w-full text-center dark:bg-gray-700 bg-light-background h-fit p-4 shadow rounded-md">{{ $t("benefits-2") }}</p>
                <p class="text-box dark:text-secondary text-primary w-full text-center dark:bg-gray-700 bg-light-background h-fit p-4 shadow rounded-md">{{ $t("benefits-3") }}</p>    
            </div>
        </div>
    </div>
</template>

<style scoped>
.material-symbols-outlined {
    font-size: 2rem;
}

@media (max-width: 1200px) {
    #contianer {
        flex-direction: column;
    }
    #heading {
        width: 90%;
    }
    .text-box-container {
        width: 90%;
    }
}
</style>