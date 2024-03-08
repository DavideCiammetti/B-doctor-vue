<script>
export default {
    name: 'InfoHome',
}
</script>

<template>
    <section class="d-flex flex-column align-items-center mb-4 mt-5">
        <!-- titolo e paragrafo -->
        <div class="title-paragraph-container text-center">
           <div>
                <h2 class="title-font-responsive title-color">BDoctors: al servizio della tua salute</h2>
           </div>
           <div>
                <p class="fs-14 p-color">Scopri i migliori dottori per un'assistenza sanitaria impeccabile a portata di click.</p>
           </div>
        </div>

        <!-- icone e statistiche -->
        <div class="icons-statistiscs-container d-sm-flex d-md-flex flex-sm-column align-items-sm-center  flex-md-column align-items-md-center">
            <!-- icone -->
            <div class="icon">
                <ul class="padding-set responsive-ul mb-4 d-flex flex-wrap flex-sm-nowrap flex-md-nowrap">
                    <!-- immagine calendario -->
                    <li class="list-group-item">
                        <div class="text-center margin-sm-55 respons-768-margin d-flex flex-column align-items-center">
                          <div class="img-container">
                            <img src="../../../public/icons-img/calendar.png" class="calendario-img" alt="calendari">
                          </div>
                            <p class="font-desc">
                                <span class="p-color fw-medium">Prenota visite</span> online in modo 
                                <span class="p-color fw-medium">facile</span> e <span class="p-color fw-medium">veloce,</span>
                                per te e i tuoi familiari.
                            </p>
                        </div>
                    </li> 
                    <!-- immagine cuore -->
                    <li class="list-group-item">
                        <div class="text-center margin-sm-55 respons-768-margin d-flex flex-column align-items-center">
                            <div class="img-container">
                                <img src="../../../public/icons-img/cuore.png" class="cuore-img" alt="cuore">
                            </div>
                            <p class="font-desc">
                                Trova il professionista sanitario <span class="p-color fw-medium">più vicino a te</span> e 
                                prenota la <span class="p-color fw-medium">prima disponibilità.</span>
                            </p>
                        </div>
                    </li>
                    <!-- immagine megafono -->
                    <li class="list-group-item">
                       <div class="text-center margin-sm-55 respons-768-margin d-flex flex-column align-items-center">
                            <div class="img-container">
                                <img src="../../../public/icons-img/megaf.png" class="megafono-img" alt="megafono">
                            </div>
                            <p class="font-desc">
                                Scambia e <span class="p-color fw-medium">condividi strumenti</span> 
                                con i tuoi professionisti sanitari in completa sicurezza.
                            </p>
                       </div>
                    </li>
                </ul>
            </div>
            <!-- statistiche -->
            <div class="statistics d-none d-sm-flex d-md-flex justify-content-center mt-3">
                <ul class="statistics-list-container d-flex justify-content-around justify-content-md-between text-center">
                   <li class="list-group-item">
                        <div>
                            <h3 class="col-green-600 number-stat-fs">80 milioni</h3>
                            <p class="font-desc">Di pazienti</p>
                        </div>
                   </li>
               
                    <li class="list-group-item list-statistics-item">
                       <div>
                            <h3 class="col-green-600 number-stat-fs">900 000</h3>
                            <p class="font-desc">Professionisti del settore sanitario.</p>
                       </div>
                    </li>
               
                    <li class="list-group-item">
                        <div class="wid-200">
                            <h3 class="col-green-600 number-stat-fs">97%</h3>
                            <p class="font-desc">Dei pazienti lo consiglia</p>
                        </div>
                    </li>
                </ul>
            </div>
        </div>
    </section>
</template>

<style scoped lang="scss">
    @use'../../style/partials/palette.scss' as *;

    // ul icone
    .responsive-ul{
        margin-top: 1.25rem;
    }
    // immagini icone
    .img-container{
        width: 70px;
        .calendario-img{
            width: 65%;
        }
        .cuore-img{
            width: 95%;
        }
        .megafono-img{
            width: 80%;
        }
    }
    // statistiche
    .statistics{
        width: 100%;
        .statistics-list-container{
            width: 100%;
        }
        .number-stat-fs{
            font-size: 1.4375rem;
        }
    }
    .list-group-item{
        width: 100%;
    }
    /*
        UTILITY
    */

     // titolo
     .title-color, .p-color{
        color: $blue-950;
    }
    // titlo info 
    .title-font-responsive{
        font-size:1.25rem;
    }
    // paragrafo informazioni 
    .fs-14{
        font-size: .875rem;
    }
    // lista icone
    .padding-set{
        padding: 0;
        .fs-55{
            font-size: 2.5rem;
        }
    }
    .margin-sm-55{
        margin: 0 3.4375rem;
    }
    .col-green-600{
        color: $green-600;
    }
    // descrizione icone
    .font-desc{
        font-size: 0.8rem;
    }

    /*
        RESPONSIVITA'
    */
    @media screen and (min-width: 579px){
                // li
                .margin-sm-55{
                    margin: 0 .9375rem;
                }
            }

    @media screen and (min-width: 768px){
                //contenitore icone
                .img-container{
                    width: 5.625rem;
                }
                // paragrafo informazioni 
                .fs-14{
                    font-size: 1.25rem;
                }
                // titolo informazioni
                .title-font-responsive{
                    font-size:2.1875rem;
                }
                .respons-768-margin{
                    margin: 0 1.875rem;
                }
                .statistics-list-container{
                padding: 0;
                }
                .statistics{
                    width: 70%;
                }
            }

</style>