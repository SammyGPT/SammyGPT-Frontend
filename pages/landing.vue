<template>
    <div class="h-[100vh] dark:bg-black bg-white p-[7vh]">
        <h2 class=" text-black dark:text-white absolute top-0 left-[2vh] text-[4.8vh]">SammyGPT</h2>
        <div class="dark:bg-primary bg-accent2 w-full h-full p-2 rounded-[5vh]">
            <div class="w-full flex flex-col justify-center items-center">
                <h1 class="text-[3rem] text-center font-[Montserrat] dark:text-white text-black">AI Assistance for <br>
                    Staten Island Technical High School.</h1>
            </div>
            <div class="flex justify-around mt-[20vh]">
                <div class="text-center text-black dark:text-white dark:bg-gray-700 bg-light-background p-8 rounded-lg">
                    <h2 class="">SammyGPT</h2>
                    <p>an amazing ai assistant</p>
                </div>
                <div
                    class="text-center text-black dark:text-white dark:bg-gray-700 bg-light-background p-8 rounded-lg hover:bg-">
                    <h2 class="">SammyGPT</h2>
                    <p>an amazing ai assistant</p>
                </div>
            </div>
            <div class="bg-transparent w-[90%] h-[20vh] mx-auto mt-[5vh]">
                <div id="seagull" class="h-[80px] w-[80px]"></div>
            </div>
        </div>
    </div>
</template>

<style scoped>
#seagull {
    background-image: url("/assets/seagull/0.png");
    animation: fly 0.5s infinite;
}

@keyframes fly {
    0% {
        background-image: url("/assets/seagull/0.png");
    }
    12% {
        background-image: url("/assets/seagull/0.png");
    }

    25% {
        background-image: url("/assets/seagull/1.png");
    }

    37% {
        background-image: url("/assets/seagull/2.png");
    }

    50% {
        background-image: url("/assets/seagull/3.png");
    }

    62% {
        background-image: url("/assets/seagull/4.png");
    }

    75% {
        background-image: url("/assets/seagull/5.png");
    }

    87% {
        background-image: url("/assets/seagull/6.png");
    }

    100% {
        background-image: url("/assets/seagull/7.png");
    }
}
</style>