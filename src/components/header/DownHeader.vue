<script>
export default {
    name: 'DownHeader',
}
</script>

<template>
    <div class="container-cstm">
        <div class="row">
            <!-- Colonna sinistra -->
            <div class="col">

                <nav class="navbar navbar-light bg-light rounded-pill">
                    <div class="container-fluid">
                        <form class="d-flex">
                            <input class="form-control me-2" type="search" placeholder="Search" aria-label="Search"
                                style="width: 200px; height: 30px;">
                            <button class="btn btn-outline-success" type="submit">Search</button>
                        </form>
                    </div>
                </nav>

                <div class="mt-3">
                    <h1>Cerchi un appuntamento</h1>
                    <p class="text-secondary">Per un medico</p>
                </div>
            </div>
            <!-- Colonna destra -->
            <div class="col">
                <div class="image-container">
                    <!-- Immagine -->
                    <img src="../../assets/img/image 1.svg" alt="Immagine dottore" class="img-fluid">
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
        ;
    }

    .image-container {
        position: relative;
        height: 100%;
    }

    .img-fluid {
        position: absolute;
        bottom: 0;
        right: 0;
        width: 100px;
        height: 100px;
    }
}
</style>