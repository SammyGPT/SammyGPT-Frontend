<template>
    <div id="message" class="w-full bg-accent1 rounded-xl text-secondary text-[Montserrat]">
        <div class="flex" id="bot_image">
            <img src="~/assets/images/seagull_temp.jpg" class="w-12 h-12 rounded-full"/>
        </div>
        <p id="content" class="ease-in-out duration-300">

            The California Gold Rush was a period of rapid migration to California in 1848-1855, following the discovery of gold
            at Sutter's Mill. The Gold Rush had a significant impact on the social, economic, and political development of
            California and the United States.

            The discovery of gold at Sutter's Mill on January 24, 1848, sparked a frenzy of excitement and speculation.
            Thousands of people from all over the world rushed to California in search of fortune. The Gold Rush brought with it
            a wave of social and economic change. The population of California exploded, from about 160,000 in 1848 to over
            300,000 by 1852. The influx of new people created a demand for goods and services, which led to the rapid growth of
            cities like San Francisco and Sacramento. The Gold Rush also led to the development of new industries, such as
            mining, transportation, and commerce.

            The Gold Rush also had a significant impact on the political development of California. The influx of new people led
            to the demand for statehood, and California was admitted to the Union as the 31st state in 1850. The Gold Rush also
            had a significant impact on the relationship between the United States and Mexico. The discovery of gold in
            California led to a dispute between the two countries over the ownership of the territory. The dispute was
            eventually resolved in the Treaty of Guadalupe Hidalgo, which was signed in 1848.

            The California Gold Rush was a period of great change and upheaval. It had a profound impact on the social,
            economic, and political development of California and the United States. The Gold Rush is a reminder of the power of
            opportunity and the human spirit.

        Here are some of the key events of the California Gold Rush:

        * January 24, 1848: Gold is discovered at Sutter's Mill in Coloma, California.
        * February 2, 1848: The news of the gold discovery is published in the San Francisco newspaper, the California Star.
        * March 1848: The first wave of gold seekers arrives in California.
        * 1849: The peak year of the Gold Rush. Over 300,000 people arrive in California.
        * 1855: The Gold Rush ends.

        The California Gold Rush had a lasting impact on California and the United States. It led to the rapid growth of
        California's population, economy, and infrastructure. It also led to the development of new industries and the
        creation of new wealth. The Gold Rush also had a significant impact on the social and political landscape of
        California and the United States. It helped to shape the development of California as a state and the United States
        as a nation.
        </p>
        <div></div>
    </div>
</template>

<style>

#message{
    display: grid;
    grid-template-columns: 1fr 10fr 1fr;
    padding: 2rem 0 2rem 0;
}

#bot_image{
    justify-content: center;
}

#content{
    font-size: 1.5rem;
}

@media (max-width: 1200px){
    #message{
        display: flex;
        flex-direction: column;
        padding: 1.5rem 1.5rem 1.5rem 1.5rem;
    }

    #bot_image{
        padding-bottom: 1rem;
    }

    #content{
        font-size: 3vmin;
    }

}

</style>