<script>
import UpFooter from './footer/UpFooter.vue';
import DownFooter from './footer/DownFooter.vue';
export default {
    name: 'Footer',
    components: {
        UpFooter,
        DownFooter,
    }
}
</script>

<template>
    <UpFooter />
    <DownFooter />
</template>

<style lang="scss">
@use'../style/partials/palette.scss' as *;
</style>