<script>
import {store} from '../../store.js';
export default {
    name: 'SearchNotFound',
    data(){
        return{
           store,
        };
    },
}
</script>

<template>
        <div class="text-center">
            <h1 class="text-danger">LA RICERCA NON HA PRODOTTO RISULTATI</h1>
        </div>
</template>

<style scoped lang="scss">
    @use'../../style/partials/palette.scss' as *;

</style>