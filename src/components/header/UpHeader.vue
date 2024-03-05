<script>
import MenuHeader from './MenuHeader.vue';
export default {
    name: 'UpHeader',
    components: {
        MenuHeader,
    }
}
</script>

<template>
    <div class="up-header d-flex justify-content-between align-items-center px-2 py-2">
        <div class="logo">
            <h1>BDoctors</h1>
        </div>

        <MenuHeader />
    </div>
</template>

<style scoped lang="scss">
@use'../../style/partials/palette.scss' as *;

.up-header {
    height: 3.125rem;

    .logo {
        h1 {
            font-size: 2rem;
        }
    }

    /* Altezza 75px su tablet */
    @media (min-width: 768px) {
        height: 3.75rem;
    }

    /* Altezza 100px su schermi più grandi */
    @media (min-width: 992px) {
        height: 4.6875rem;
    }
}
</style>