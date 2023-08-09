<template>
    <div class="block-width border-2 border-primary rounded bg-amber-200 m-8">
        <p class="text-sm">
            <h3 class="text-center text-xl">AI Detector Disclaimer:</h3>
            <br>
            This tool was built with reference to the research paper
            <a class="underline text-blue-600" href="https://arxiv.org/abs/2301.07597">https://arxiv.org/abs/2301.07597</a>,
            and has a ~97-98% accuracy, which is the state of the art accuracy. Through cross testing with existing 
            AI Detectors (GPTZero, Affliated with Princeton University), we find that this AI Detector has similar if not better performance. 
            Yet, given the ever-evolving nature of AI technology, it's prudent to approach its findings with skepticism.
            <br>
            <p class="p-4 text-lg underline text-center">This detector is designed to assist teachers but shouldn't override human judgment.</p>
        </p>
    </div>
</template>


<style scoped>

.block-width{
    width: 50%;
}

@media (max-width: 1200px) {
    .block-width{
        width: 95%;
    }
}

</style>