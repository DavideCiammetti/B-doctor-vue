<script>
export default {
    name: 'UpFooter',
}
</script>

<template>
    <div class="row text-center">
        <!-- Titolo -->
        <div class="col-12 col-lg-4">
            <h1 class="mb-3 mb-lg-0 txt-cstm">Domande? Hai bisogno di aiuto?</h1>
        </div>
        <!-- Paragrafo -->
        <div class="col-12 col-lg-4 txt-cstm">
            <p class="mb-lg-0">Vai agli articoli del centro d'assistenza o contattaci.</p>
        </div>
        <!-- Bottone -->
        <div class="col-12 col-lg-4">
            <button class="btn btn-primary btn-lg btn-cstm">
                <div class="d-flex gap-3 align-items-center">
                    <font-awesome-icon icon="fa-solid fa-circle-info" />
                    <span>VAI AL CENTRO D'ASSISTENZA</span>
                </div>
            </button>
        </div>
    </div>
</template>

<style scoped lang="scss">
@use '../../style/partials/palette.scss' as *;

div.col-12 {
    h1.txt-cstm {
        font-size: 2rem;
    }
}

// bottone
.btn-cstm {
    border: none;
    background-color: $green-700;
}
</style>