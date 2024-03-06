<script>
import InfoHome from './MainComponents/InfoHome.vue';
import SponsorshipHome from './MainComponents/SponsorshipHome.vue'
export default {
    name: 'Main',
    components:{
        InfoHome,
        SponsorshipHome,
    }
}
</script>

<template>
    <main class="mt-3 d-flex align-items-center flex-column">
        <InfoHome />
        <SponsorshipHome/>
    </main>
</template>

<style scoped lang="scss">
    @use'../style/partials/palette.scss' as *;

</style>