<template>
    <div class="flex flex-col items-center justify-center w-full h-screen dark:bg-accent1 bg-accent2">
        <title>Server Offline</title>
        <h1 class="text-[5vmin] font-[Montserrat] dark:text-secondary text-accent1">
            Server is currently offline.
        </h1>
        <h2 class="text-[3vmin] font-[Montserrat] dark:text-secondary text-accent1">
            <!-- If this is a mistake, contact anthony20151128@gmail.com -->
            Please come back and check later. The server normally operates from Monday to Friday.
        </h2>
        <h3 class="text-[2vmin] font-[Montserrat] dark:text-secondary text-accent1">
            Sorry for the inconvenience.
        </h3>
        <Button :selected="false" :toggle_button="false" text="Attempt to Reconnect" class="mt-6 cursor-pointer" @clicked="$router.push('/')"></Button>
    </div>
</template>