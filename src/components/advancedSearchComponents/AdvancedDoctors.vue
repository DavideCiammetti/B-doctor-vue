<script>
import { store } from "../../store.js";
import axios from "axios";
export default {
  name: "Main",
  data() {
    return {
      store,
    };
  },
  methods: {
    // specializzazioni
    closeParam(parametro) {
      store.filtred.parametri[parametro] = false;
      store.filtred.specializations[parametro] = false;
    },
    // voti
    closeVote(parametro) {
      store.filtred.parametri[parametro] = 0;
      store.filtred.votes[parametro] = 0;
    },
    // recensioni
    closeReview(parametro) {
      store.filtred.parametri[parametro] = 0;
      store.filtred.reviews[parametro] = 0;
    },
    // svuota ricerca
    emptyParams() {
      this.store.filtred.parametri = {};
      this.store.filtred.specializations = {};
      this.store.filtred.votes = {};
      this.store.filtred.reviews = {};
    },
    // redirect a pagina di dettaglio
    showClick(index) {
      this.$router.push({
        name: "doctor-detail",
        params: { slug: this.store.advancedDoctor[index].slug },
      });
    },
    // calcolo numero stelle da rappresentare in card
    stars(index) {
      if (this.store.advancedDoctor[index].votes.length > 0) {
        let voti = this.store.advancedDoctor[index].votes;
        let numeroVoti = this.store.advancedDoctor[index].votes.length;
        let somma = 0;
        // scorro l'array
        voti.forEach((vote) => {
          somma = somma + vote.id; // sommo gli id
        });
        let numStelle = Math.floor(somma / numeroVoti); // divido la somma per la lunghezza dell'array
        return numStelle;
      } else {
        let numStelle = 0;
        return numStelle; // Se non ci sono voti, restituisci 0
      }
    },
  },
};
</script>

<template>
  <main class="main py-5" v-show="!this.store.searchNotFound">
    <!-- info ricerca -->
    <h6 class="px-5">
      Numero dottori trovati: {{ store.advancedDoctor.length }}
    </h6>

    <div class="info-ricerca px-5 mb-5 d-flex justify-content-between mt-3">
      <!-- sinistra -->
      <div class="left">
        <div class="filtri d-flex gap-1">
          <!-- ortopedico -->
          <div v-if="store.filtred.parametri.ortopedico"
            class="alert alert-success d-flex flex-column flex-md-row gap-1 mb-0 position-relative" role="alert">
            <font-awesome-icon :icon="['fas', 'xmark']" class="close position-absolute p-1"
              @click="closeParam('ortopedico')" />
            <h6 class="mt-2 me-2">ortopedico</h6>
          </div>
          <!-- /ortopedico -->
          <!-- dermatologo -->
          <div v-if="store.filtred.parametri.dermatologo"
            class="alert alert-success d-flex flex-column flex-md-row gap-1 mb-0 position-relative" role="alert">
            <font-awesome-icon :icon="['fas', 'xmark']" class="close position-absolute p-1"
              @click="closeParam('dermatologo')" />
            <h6 class="mt-2 me-2">dermatologo</h6>
          </div>
          <!-- /dermatologo -->
          <!-- psicologo -->
          <div v-if="store.filtred.parametri.psicologo"
            class="alert alert-success d-flex flex-column flex-md-row gap-1 mb-0 position-relative" role="alert">
            <font-awesome-icon :icon="['fas', 'xmark']" class="close position-absolute p-1"
              @click="closeParam('psicologo')" />
            <h6 class="mt-2 me-2">psicologo</h6>
          </div>
          <!-- /psicologo -->
          <!-- oculista -->
          <div v-if="store.filtred.parametri.oculista"
            class="alert alert-success d-flex flex-column flex-md-row gap-1 mb-0 position-relative" role="alert">
            <font-awesome-icon :icon="['fas', 'xmark']" class="close position-absolute p-1"
              @click="closeParam('oculista')" />
            <h6 class="mt-2 me-2">oculista</h6>
          </div>
          <!-- /oculista -->
          <!-- ginecologo -->
          <div v-if="store.filtred.parametri.ginecologo"
            class="alert alert-success d-flex flex-column flex-md-row gap-1 mb-0 position-relative" role="alert">
            <font-awesome-icon :icon="['fas', 'xmark']" class="close position-absolute p-1"
              @click="closeParam('ginecologo')" />
            <h6 class="mt-2 me-2">ginecologo</h6>
          </div>
          <!-- /ginecologo -->
          <!-- nutrizionista -->
          <div v-if="store.filtred.parametri.nutrizionista"
            class="alert alert-success d-flex flex-column flex-md-row gap-1 mb-0 position-relative" role="alert">
            <font-awesome-icon :icon="['fas', 'xmark']" class="close position-absolute p-1"
              @click="closeParam('nutrizionista')" />
            <h6 class="mt-2 me-2">nutrizionista</h6>
          </div>
          <!-- /nutrizionista -->
          <!-- dentista -->
          <div v-if="store.filtred.parametri.dentista"
            class="alert alert-success d-flex flex-column flex-md-row gap-1 mb-0 position-relative" role="alert">
            <font-awesome-icon :icon="['fas', 'xmark']" class="close position-absolute p-1"
              @click="closeParam('dentista')" />
            <h6 class="mt-2 me-2">dentista</h6>
          </div>
          <!-- /dentista -->
          <!-- cardiologo -->
          <div v-if="store.filtred.parametri.cardiologo"
            class="alert alert-success d-flex flex-column flex-md-row gap-1 mb-0 position-relative" role="alert">
            <font-awesome-icon :icon="['fas', 'xmark']" class="close position-absolute p-1"
              @click="closeParam('cardiologo')" />
            <h6 class="mt-2 me-2">cardiologo</h6>
          </div>
          <!-- /cardiologo -->
          <!-- osteopata -->
          <div v-if="store.filtred.parametri.osteopata"
            class="alert alert-success d-flex flex-column flex-md-row gap-1 mb-0 position-relative" role="alert">
            <font-awesome-icon :icon="['fas', 'xmark']" class="close position-absolute p-1"
              @click="closeParam('osteopata')" />
            <h6 class="mt-2 me-2">osteopata</h6>
          </div>
          <!-- /osteopata -->
          <!-- ostetrica -->
          <div v-if="store.filtred.parametri.ostetrica"
            class="alert alert-success d-flex flex-column flex-md-row gap-1 mb-0 position-relative" role="alert">
            <font-awesome-icon :icon="['fas', 'xmark']" class="close position-absolute p-1"
              @click="closeParam('ostetrica')" />
            <h6 class="mt-2 me-2">ostetrica</h6>
          </div>
          <!-- /ostetrica -->
          <!-- anestesista -->
          <div v-if="store.filtred.parametri.anestesista"
            class="alert alert-success d-flex flex-column flex-md-row gap-1 mb-0 position-relative" role="alert">
            <font-awesome-icon :icon="['fas', 'xmark']" class="close position-absolute p-1"
              @click="closeParam('anestesista')" />
            <h6 class="mt-2 me-2">anestesista</h6>
          </div>
          <!-- /anestesista -->
          <!-- logopedista -->
          <div v-if="store.filtred.parametri.logopedista"
            class="alert alert-success d-flex flex-column flex-md-row gap-1 mb-0 position-relative" role="alert">
            <font-awesome-icon :icon="['fas', 'xmark']" class="close position-absolute p-1"
              @click="closeParam('logopedista')" />
            <h6 class="mt-2 me-2">logopedista</h6>
          </div>
          <!-- /logopedista -->
          <!-- voto -->
          <div v-if="store.filtred.votes.voteValue > 0"
            class="alert alert-success d-flex flex-column flex-md-row gap-1 mb-0 position-relative" role="alert">
            <font-awesome-icon :icon="['fas', 'xmark']" class="close position-absolute p-1"
              @click="closeVote('voteValue')" />
            <h6 class="mt-2 me-2">
              Media voto maggiore di {{ store.filtred.votes.voteValue }} stelle
            </h6>
          </div>
          <!-- /voto -->
          <!-- recensione -->
          <div v-if="store.filtred.reviews.reviewValue > 0"
            class="alert alert-success d-flex flex-column flex-md-row gap-1 mb-0 position-relative" role="alert">
            <font-awesome-icon :icon="['fas', 'xmark']" class="close position-absolute p-1"
              @click="closeReview('reviewValue')" />
            <h6 class="mt-2 me-2">
              Numero recensioni maggiore di
              {{ store.filtred.reviews.reviewValue }}
            </h6>
          </div>
        </div>
        <div class="alert alert-danger d-flex gap-1 mb-0 mt-2" role="alert" :class="Object.keys(store.filtred.parametri).length === 0
            ? 'd-block'
            : 'd-none'
          ">
          Devi selezionare almeno una specializzazione
        </div>
        <!-- /elenco filtri applicati -->
      </div>
      <!-- /sinistra -->

      <!-- destra -->
      <div class="right">
        <button class="btn btn-danger" @click="emptyParams()">
          Svuota Campi
        </button>
      </div>
      <!-- /destra -->
    </div>
    <!-- /info ricerca -->

    <!-- contenitore cards -->
    <div class="card-container d-flex justify-content-center flex-wrap justify-content-md-around p-3 gap-5">
      <!-- card -->
      <div class="d-flex card-item col-12 col-md-5 position-relative"
        v-for="(new_doctor, index) in this.store.advancedDoctor">
        <div class="sponsor d-flex align-items-center gap-1 position-absolute py-2 px-3"
          v-if="new_doctor.sponsorships.length > 0">
          <font-awesome-icon :icon="['fas', 'circle-info']" />
          <h6>Sponsorizzato</h6>
        </div>
        <!-- immagine -->
        <div class="img-container">
          <img v-if="new_doctor.doctor_img" :src="this.store.imgUrl + new_doctor.doctor_img" class="card-img" alt="" />
        </div>
        <!-- informazioni -->
        <div class="w-63 mt-5">
          <div class="w-100">
            <h4 class="text-dark">
              {{ new_doctor.user.name }} {{ new_doctor.user.surname }}
            </h4>
          </div>
          <div class="d-flex flex-wrap mb-2">
            <p v-for="specializations in new_doctor.specializations" class="m-0 pe-2">
              {{ specializations.title }}
            </p>
          </div>
          <div class="col-stars d-flex gap-1 mb-1">
            <font-awesome-icon v-for="star in stars(index)" :icon="['fas', 'star']" />
            <p v-if="new_doctor.votes.length === 0" class="mb-0">Nussun Voto</p>
          </div>
          <p>{{ new_doctor.reviews.length }} Recensioni</p>
          <p>
            <font-awesome-icon icon="fa-solid fa-location-dot" />
            {{ new_doctor.address }}
          </p>
          <p @click="showClick(index)" class="col-grey dettaglio">Dettaglio</p>
        </div>
      </div>
    </div>
  </main>
</template>

<style scoped lang="scss">
@use "../../style/partials/palette.scss" as *;

.main {
  background-color: $grey-100;
}

// card
.card-item {
  background-color: white;
  border-radius: 25px;
  box-shadow: 0px 4px 0px rgb(189, 175, 175, 0.5);

  .w-63 {
    width: 63%;
  }

  .col-stars {
    color: $green-w-400;
  }
}

.butt-home {
  button {
    border: none;
    background-color: $green-400;
    margin-bottom: 7px;
    margin-right: 11px;
    border-radius: 10px;
    padding: 3px;
  }
}

// immagine card
.img-container {
  width: 250px;
  height: 300px;
  margin-right: 30px;

  .card-img {
    width: 100%;
    height: 100%;
    border-radius: 25px;
    object-fit: cover;
  }
}

// immagine sponsor cerchi
.sponsor {
  top: 0;
  right: 0;
  color: $green-400;

  h6 {
    font-size: 12px;
  }
}

// tag a colore
.col-grey {
  color: rgb(169, 169, 169);
}

.dettaglio {
  cursor: pointer;
}

.lower-case {
  text-transform: lowercase;
}

h6 {
  margin-bottom: 0;
}

.close {
  top: 0;
  right: 5px;
  font-size: 14px;
  cursor: pointer;
}
</style>
