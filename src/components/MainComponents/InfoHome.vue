<script>
export default {
  name: "InfoHome",
};
</script>

<template>
  <div class="info-home px-5">
    <section class="d-flex flex-column align-items-center my-5">
      <!-- titolo e paragrafo -->
      <div class="title-paragraph-container text-center">
        <div
          class="d-flex align-items-center justify-content-center gap-3 mb-3"
        >
          <h2 class="title-font-responsive fw-bolder">
            La Tua Visita a Portata Di Click!
          </h2>
        </div>
        <div>
          <p class="fs-14 p-color">
            Prenotare una visita specialistica non è mai stato così facile! Con
            BDoctors, hai accesso a un'ampia rete di medici specialisti pronti a
            prendersi cura della tua salute. Che tu stia cercando un cardiologo,
            un dermatologo o qualsiasi altro specialista, siamo qui per
            semplificare il processo di prenotazione.
          </p>
        </div>
      </div>

      <!-- statistiche -->
      <div
        class="statistics d-none d-sm-flex d-md-flex justify-content-center align-items-center my-5 py-5 rounded-3 text-light"
      >
        <ul
          class="statistics-list-container d-flex justify-content-around justify-content-md-between align-items-center text-center m-0"
        >
          <li class="list-group-item">
            <div>
              <h3 class="mb-2">Pazienti</h3>
              <h4 class="mb-0">+2000</h4>
            </div>
          </li>
          <li class="list-group-item list-statistics-item">
            <div>
              <h3 class="mb-2">Professionisti Del Settore</h3>
              <h4 class="mb-0">+500</h4>
            </div>
          </li>
          <li class="list-group-item">
            <div class="wid-200">
              <h3 class="mb-2">Valutazione Positiva</h3>
              <h4 class="mb-0">97%</h4>
            </div>
          </li>
        </ul>
      </div>
      <!-- /statistiche -->

      <!-- icone e statistiche -->
      <div
        class="icons-statistiscs-container d-sm-flex d-md-flex flex-sm-column align-items-sm-center flex-md-column align-items-md-center"
      >
        <!-- icone -->
        <div class="icon">
          <ul
            class="padding-set responsive-ul mb-4 d-flex flex-wrap flex-sm-nowrap flex-md-nowrap"
          >
            <!-- immagine calendario -->
            <li class="list-group-item">
              <div
                class="text-center margin-sm-55 respons-768-margin d-flex flex-column align-items-center"
              >
                <div class="icon mb-4">
                  <font-awesome-icon :icon="['fas', 'calendar-check']" />
                </div>
                <p>
                  <span class="p-color">Prenota visite</span> online in modo
                  facile e veloce, per te e i tuoi familiari.
                </p>
              </div>
            </li>
            <!-- immagine cuore -->
            <li class="list-group-item mt-3 m-md-0">
              <div
                class="text-center margin-sm-55 respons-768-margin d-flex flex-column align-items-center"
              >
                <div class="icon mb-4">
                  <font-awesome-icon :icon="['fas', 'stethoscope']" />
                </div>
                <p>
                  Trova il professionista sanitario, scegli tra una vasta gamma
                  di <span class="p-color">specialisti e filtri</span>.
                </p>
              </div>
            </li>
            <!-- immagine megafono -->
            <li class="list-group-item mt-3 m-md-0">
              <div
                class="text-center margin-sm-55 respons-768-margin d-flex flex-column align-items-center"
              >
                <div class="icon mb-4">
                  <font-awesome-icon :icon="['fas', 'comments']" />
                </div>
                <p>
                  Comunica con facilità,
                  <span class="p-color">invia messaggi</span>
                  direttamente ai dottori per chiedere informazioni e
                  chiarimenti
                </p>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </section>
  </div>
</template>

<style scoped lang="scss">
@use "../../style/partials/palette.scss" as *;

.info-home {
  max-width: 1180px;

  .title-font-responsive {
    font-size: 1.625rem;
  }

  @media screen and (min-width: 768px) {
    // titolo informazioni
    h2.title-font-responsive {
      font-size: 2.125rem;
    }
  }
}

// ul icone
.responsive-ul {
  margin-top: 1.25rem;
}
// immagini icone
.img-container {
  width: 70px;
  .calendario-img {
    width: 65%;
  }
  .cuore-img {
    width: 95%;
  }
  .megafono-img {
    width: 80%;
  }
}
// statistiche
.statistics {
  border: 5px solid $green-400;
  background-color: $green-600;

  width: 100%;
  .statistics-list-container {
    width: 100%;
  }

  h3 {
    font-size: 1.375rem;
  }

  h4 {
    font-size: 2rem;
  }
}
.list-group-item {
  width: 100%;
}
/*
        UTILITY
    */

// font-awesome
svg {
  font-size: 50px;
  color: $green-500;
}

.icons-statistiscs-container {
  .p-color {
    color: $green-500;
    font-weight: bold;
  }
}

// paragrafo informazioni
.fs-14 {
  font-size: 0.875rem;
}
// lista icone
.padding-set {
  padding: 0;
  .fs-55 {
    font-size: 2.5rem;
  }
}
.margin-sm-55 {
  margin: 0 3.4375rem;
}
.col-green-600 {
  color: $green-600;
}
// descrizione icone
.font-desc {
  font-size: 0.8rem;
}

/*
        RESPONSIVITA'
    */
@media screen and (min-width: 579px) {
  // li
  .margin-sm-55 {
    margin: 0 0.9375rem;
  }
}

@media screen and (min-width: 768px) {
  //contenitore icone
  .img-container {
    width: 5.625rem;
  }
  // paragrafo informazioni
  .fs-14 {
    font-size: 1.25rem;
  }
  .respons-768-margin {
    margin: 0 1.875rem;
  }
  .statistics-list-container {
    padding: 0;
  }
  .statistics {
    width: 70%;
  }
}
</style>
