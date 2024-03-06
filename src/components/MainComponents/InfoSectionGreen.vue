<script>
export default {
    name: 'InfoSectionGreen',
}
</script>

<template>
    <div class="d-flex mt-90 bg-col-green width-percent ">
        <!-- immagine -->
        <div class="d-none d-md-flex align-items-center">
            <img src="../../../public/img/left-img-green-sec.png" alt="img-doc-green">
        </div>
        <!-- informazioni -->
        <div class="ps-2">
            <!-- titolo -->
            <div class="ps-4">
                <h4 class="text-white">Fai parte del personale sanitario?</h4>
                <p class="text-white fs-14">Entra in Doctolib e sviluppa insieme a noi i software del futuro</p>
            </div>
            <ul class="p-0 ps-4 pe-4">
                <!-- primo paragrafo -->
                <li class="d-flex">
                    <div>
                        <img src="../../../public/img/yellow-arrow.png" class="me-2" alt="yellow-arrow">
                    </div>
                    <div>
                        <p class="text-white fs-14">
                            Guadagna tempo grazie alla prenotazione online e 
                            migliora il coordinamento con la tua segreteria
                            condividendo note in tempo reale.
                        </p>
                    </div>
                </li>
                <!-- secondo paragrafo -->
                <li class="d-flex">
                    <div>
                        <img src="../../../public/img/yellow-arrow.png" class="me-2" alt="yellow-arrow">
                    </div>
                    <div>
                        <p class="text-white fs-14">
                           Migliora la tua giornata lavorativa, organizzando al meglio
                           i tuoi task e comunicando in maniera sicura e automatica
                           con i tuoi pazienti.
                        </p>
                    </div>
                </li>
                <!-- terzo paragrafo -->
                <li class="d-flex">
                    <div>
                        <img src="../../../public/img/yellow-arrow.png" class="me-2" alt="yellow-arrow">
                    </div>
                    <div>
                        <p class="text-white fs-14">
                           Proponi ai tuoi pazienti un servizio all'avanguardia,
                           offrendo la possibilità di prenotare online anche fuori 
                           dagli orari di segreteria e di gestire autonomamente la loro 
                           salute e quella dei loro cari.
                        </p>
                    </div>
                </li>
                <!-- quarto paragrafo -->
                <li class="d-flex">
                    <div>
                        <img src="../../../public/img/yellow-arrow.png" class="me-2" alt="yellow-arrow">
                    </div>
                    <div>
                        <p class="text-white fs-14">
                           Migliora la tua visibilità online e riduci fino al 70% i no-show.
                        </p>
                    </div>
                </li>
            </ul>
            <div class="ms-4">
                <button class="button-pro fw-medium">
                    SCOPRI BDOCTORS PRO
                </button>
            </div>
        </div>
    </div>
</template>

<style scoped lang="scss">
    @use'../../style/partials/palette.scss' as *;

    ul{
        list-style: none;
    }
    /*
        UTILITY
    */ 
    // larghezza container
    .width-percent{
        width: 90%;
        padding: 1.5625rem;
    }
    .mt-90{
        margin-top: 5.625rem;
    }
    .bg-col-green{
        background-color: $green-600;
        border-radius: 1.25rem;
    }
    // font paragrafi
    .fs-14{
        font-size: .875rem;
    }
    .button-pro{
        border: none;
        color: white;
        background-color: #5eeace;
        padding: .625rem;
        border-radius: .625rem;
        font-size: .875rem;
    }
</style>