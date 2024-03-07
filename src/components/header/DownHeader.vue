<script>
import ContentDHeader from './ContentDHeader.vue';
import NavBarSm from './NavBarSm.vue';
export default {
    name: 'DownHeader',
    components: {
        NavBarSm,
        ContentDHeader,
    }
}
</script>

<template>
    <div class="container-cstm">
        <ContentDHeader />
    </div>
</template>

<style scoped lang="scss">
@use'../../style/partials/palette.scss' as *;

.container-cstm {
    width: 95%;
    margin: auto;

}
</style>