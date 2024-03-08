<script>
import MenuHeader from './MenuHeader.vue';
import {store} from '../../store.js';
export default {
    name: 'UpHeader',
    components: {
        MenuHeader,
    },
    data(){
        return{
            store,
        }
    },
    methods:{
         // mostra searchbar
         showSearchbar(){
            this.store.changedSearchbar = false; 
        }
    }
}
</script>

<template>
    <div class="up-header d-flex justify-content-between align-items-center px-4 py-2">
        <div class="logo">
            <router-link class="text-white text-decoration-none" :to="{name: 'home'}"><h1 @click="showSearchbar">BDoctors</h1></router-link>
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
            font-size: 3rem;
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