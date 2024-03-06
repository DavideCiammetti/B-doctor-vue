<script>
import NavBarSm from './NavBarSm.vue';
export default {
    name: 'DownHeader',
    components: {
        NavBarSm,
    }
}
</script>

<template>
    <div class="container-cstm">
        <div class="row mt-5">
            <!-- Colonna sinistra -->
            <div class="col">
                <NavBarSm />
                <div class="mt-5">
                    <h1>Cerchi un appuntamento</h1>
                    <p class="text-secondary">Per un medico</p>
                </div>
            </div>
            <!-- Colonna destra -->
            <div class="col d-flex justify-content-end align-items-end">
                <div class="image-container d-flex align-items-end">
                    <img src="../../assets/img/image_1.svg" alt="Immagine dottore" class="img-fluid">
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped lang="scss">
@use'../../style/partials/palette.scss' as *;

.container-cstm {
    width: 95%;
    margin: auto;

    @media (min-width: 768px) {
        width: 90%;
    }

    @media (min-width: 992px) {
        width: 80%;
    }

    .row {
        display: flex;
        flex-wrap: wrap-reverse;
    }

    .image-container {
        position: relative;
        height: 100%;
    }

    .img-fluid {
        width: 100%;
        max-width: 100px;
        height: auto;
    }

    @media (min-width: 768px) {
        .img-fluid {
            max-width: 200px;
        }
    }

    @media (min-width: 992px) {
        .img-fluid {
            max-width: 300px;
        }
    }

    @media (max-width: 767px) {
        .img-fluid {
            max-width: 80%;
        }
    }

}
</style>