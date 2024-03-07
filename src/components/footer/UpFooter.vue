<script>
export default {
    name: 'UpFooter',
}
</script>

<template>
    <div class="container-fluid">
        <div class="row text-center">
            <!-- Sezione sinistra -->
            <div class="col-12 col-lg-6 d-flex flex-column align-items-center">
                <!-- Titolo -->
                <h1 class="mb-3 txt-cstm text-left">Domande? Hai bisogno di aiuto?</h1>
                <!-- Paragrafo -->
                <p class="mb-3 text-left">Vai agli articoli del centro d'assistenza o contattaci.</p>
            </div>
            <!-- Sezione destra -->
            <div
                class="col-12 col-lg-6 d-flex justify-content-center justify-content-lg-end align-items-center my-3 my-lg-0">
                <!-- Bottone -->
                <button class="btn btn-primary btn-lg btn-cstm">
                    <div class="d-flex gap-3 align-items-center">
                        <font-awesome-icon icon="fa-solid fa-circle-info" />
                        <span>VAI AL CENTRO D'ASSISTENZA</span>
                    </div>
                </button>
            </div>
        </div>
    </div>
</template>

<style scoped lang="scss">
@use '../../style/partials/palette.scss' as *;

.container-fluid {
    h1.txt-cstm {
        font-size: 2rem;
    }

    p {
        font-size: 1.25rem;
    }

    @media (min-width: 576px) {
        width: 90%;
    }

    @media (min-width: 992px) {
        div.col-12.col-lg-6.d-flex.flex-column.align-item-center {
            flex-direction: row;
            align-items: center;
        }
    }
}

.btn-cstm {
    border: none;
    background-color: $green-700;
}
</style>