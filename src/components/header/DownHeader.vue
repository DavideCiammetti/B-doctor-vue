<script>
import NavBarSm from './NavBarSm.vue';
export default {
    name: 'DownHeader',
    components: {
        NavBarSm,
    },
}
</script>

<template>
    <div class="container-cstm">
        <div class="row mt-5">
            <!-- Colonna sinistra -->
            <div class="col">
                <NavBarSm/>
                <div class="mt-5">
                    <h1 class="text-cstm">Cerchi un appuntamento</h1>
                    <p class="text-cstm"><strong>per un medico</strong></p>
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

    h1.text-cstm {
        font-size: 1.375rem;

        @media (min-width: 768px) {
            font-size: 2rem;
        }

        @media (min-width: 992px) {
            font-size: 3.125rem;
        }
    }

    p.text-cstm {
        color: $green-200;
        font-size: 1.125rem;

        @media (min-width: 768px) {
            font-size: 1.5rem;
        }

        @media (min-width: 992px) {
            font-size: 1.875rem;
        }
    }

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
            max-width: 12.5rem;
        }
    }

    @media (min-width: 992px) {
        .img-fluid {
            max-width: 18.75rem;
        }
    }

    @media (max-width: 767px) {
        .img-fluid {
            max-width: 80%;
        }
    }

}
</style>