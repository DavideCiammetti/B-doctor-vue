<script>
import ContentDHeader from './ContentDHeader.vue';
import NavBarSm from './NavBarSm.vue';
import NavBarLg from './NavBarLg.vue';
import { store } from '../../store.js'
export default {
    name: 'DownHeader',
    components: {
        NavBarSm,
        ContentDHeader,
        NavBarLg,
    },
    data() {
        return {
            store,
        }
    }
}
</script>

<template>
    <!-- <div v-show="!this.store.changedSearchbar" class="container-cstm"> -->
    <div v-if="$route.name === 'home'" class="container-cstm">
        <ContentDHeader />
    </div>
    <!-- <div v-show="this.store.changedSearchbar" class="container-cstm mt-4"> -->
    <div v-else class="container-cstm mt-4">
        <NavBarLg />
    </div>
</template>

<style scoped lang="scss">
@use'../../style/partials/palette.scss' as *;

.container-cstm {
    width: 95%;
    margin: auto;
}
</style>