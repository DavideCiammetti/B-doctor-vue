<script>
import { store } from "../../store.js";
import axios from "axios";
import moment from "moment";

export default {
  name: "Main",
  data() {
    return {
      store,
      currentDate: new Date(),
    };
  },
  methods: {
    // data corrente
    formatDate(data) {
      return moment(data).format();
    },
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
        let numStelle = Math.round(somma / numeroVoti); // divido la somma per la lunghezza dell'array
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
    <div class="d-flex justify-content-between align-items-center">
      <h6 class="px-5">
        Numero dottori trovati: {{ store.advancedDoctor.length }}
      </h6>
      <!-- bottone elimina filtri  -->
      <div class="right py-2 py-lg-0 text-center me-5">
        <button class="btn btn-danger" @click="emptyParams()">
          Elimina Filtri
        </button>
      </div>
      <!-- /bottone elimina filtri  -->
    </div>

    <div
      class="info-ricerca px-5 mb-5 d-flex justify-content-between mt-3 flex-wrap align-items-center"
    >
      <!-- filtri -->
      <div class="left col-12">
        <div class="filtri col d-flex gap-1 flex-wrap overflow-auto">
          <!-- ortopedico -->
          <div
            v-if="store.filtred.parametri.ortopedico"
            class="alert alert-success d-flex flex-column flex-md-row gap-1 mb-0 position-relative p-2"
            role="alert"
          >
            <font-awesome-icon
              :icon="['fas', 'xmark']"
              class="close position-absolute p-1"
              @click="closeParam('ortopedico')"
            />
            <h6 class="mt-2 me-2">ortopedico</h6>
          </div>
          <!-- /ortopedico -->
          <!-- dermatologo -->
          <div
            v-if="store.filtred.parametri.dermatologo"
            class="alert alert-success d-flex flex-column flex-md-row gap-1 mb-0 position-relative p-2"
            role="alert"
          >
            <font-awesome-icon
              :icon="['fas', 'xmark']"
              class="close position-absolute p-1"
              @click="closeParam('dermatologo')"
            />
            <h6 class="mt-2 me-2">dermatologo</h6>
          </div>
          <!-- /dermatologo -->
          <!-- psicologo -->
          <div
            v-if="store.filtred.parametri.psicologo"
            class="alert alert-success d-flex flex-column flex-md-row gap-1 mb-0 position-relative p-2"
            role="alert"
          >
            <font-awesome-icon
              :icon="['fas', 'xmark']"
              class="close position-absolute p-1"
              @click="closeParam('psicologo')"
            />
            <h6 class="mt-2 me-2">psicologo</h6>
          </div>
          <!-- /psicologo -->
          <!-- oculista -->
          <div
            v-if="store.filtred.parametri.oculista"
            class="alert alert-success d-flex flex-column flex-md-row gap-1 mb-0 position-relative p-2"
            role="alert"
          >
            <font-awesome-icon
              :icon="['fas', 'xmark']"
              class="close position-absolute p-1"
              @click="closeParam('oculista')"
            />
            <h6 class="mt-2 me-2">oculista</h6>
          </div>
          <!-- /oculista -->
          <!-- ginecologo -->
          <div
            v-if="store.filtred.parametri.ginecologo"
            class="alert alert-success d-flex flex-column flex-md-row gap-1 mb-0 position-relative p-2"
            role="alert"
          >
            <font-awesome-icon
              :icon="['fas', 'xmark']"
              class="close position-absolute p-1"
              @click="closeParam('ginecologo')"
            />
            <h6 class="mt-2 me-2">ginecologo</h6>
          </div>
          <!-- /ginecologo -->
          <!-- nutrizionista -->
          <div
            v-if="store.filtred.parametri.nutrizionista"
            class="alert alert-success d-flex flex-column flex-md-row gap-1 mb-0 position-relative p-2"
            role="alert"
          >
            <font-awesome-icon
              :icon="['fas', 'xmark']"
              class="close position-absolute p-1"
              @click="closeParam('nutrizionista')"
            />
            <h6 class="mt-2 me-2">nutrizionista</h6>
          </div>
          <!-- /nutrizionista -->
          <!-- dentista -->
          <div
            v-if="store.filtred.parametri.dentista"
            class="alert alert-success d-flex flex-column flex-md-row gap-1 mb-0 position-relative p-2"
            role="alert"
          >
            <font-awesome-icon
              :icon="['fas', 'xmark']"
              class="close position-absolute p-1"
              @click="closeParam('dentista')"
            />
            <h6 class="mt-2 me-2">dentista</h6>
          </div>
          <!-- /dentista -->
          <!-- cardiologo -->
          <div
            v-if="store.filtred.parametri.cardiologo"
            class="alert alert-success d-flex flex-column flex-md-row gap-1 mb-0 position-relative p-2"
            role="alert"
          >
            <font-awesome-icon
              :icon="['fas', 'xmark']"
              class="close position-absolute p-1"
              @click="closeParam('cardiologo')"
            />
            <h6 class="mt-2 me-2">cardiologo</h6>
          </div>
          <!-- /cardiologo -->
          <!-- osteopata -->
          <div
            v-if="store.filtred.parametri.osteopata"
            class="alert alert-success d-flex flex-column flex-md-row gap-1 mb-0 position-relative p-2"
            role="alert"
          >
            <font-awesome-icon
              :icon="['fas', 'xmark']"
              class="close position-absolute p-1"
              @click="closeParam('osteopata')"
            />
            <h6 class="mt-2 me-2">osteopata</h6>
          </div>
          <!-- /osteopata -->
          <!-- ostetrica -->
          <div
            v-if="store.filtred.parametri.ostetrica"
            class="alert alert-success d-flex flex-column flex-md-row gap-1 mb-0 position-relative p-2"
            role="alert"
          >
            <font-awesome-icon
              :icon="['fas', 'xmark']"
              class="close position-absolute p-1"
              @click="closeParam('ostetrica')"
            />
            <h6 class="mt-2 me-2">ostetrica</h6>
          </div>
          <!-- /ostetrica -->
          <!-- anestesista -->
          <div
            v-if="store.filtred.parametri.anestesista"
            class="alert alert-success d-flex flex-column flex-md-row gap-1 mb-0 position-relative p-2"
            role="alert"
          >
            <font-awesome-icon
              :icon="['fas', 'xmark']"
              class="close position-absolute p-1"
              @click="closeParam('anestesista')"
            />
            <h6 class="mt-2 me-2">anestesista</h6>
          </div>
          <!-- /anestesista -->
          <!-- logopedista -->
          <div
            v-if="store.filtred.parametri.logopedista"
            class="alert alert-success d-flex flex-column flex-md-row gap-1 mb-0 position-relative p-2"
            role="alert"
          >
            <font-awesome-icon
              :icon="['fas', 'xmark']"
              class="close position-absolute p-1"
              @click="closeParam('logopedista')"
            />
            <h6 class="mt-2 me-2">logopedista</h6>
          </div>
          <!-- /logopedista -->
          <!-- voto -->
          <div
            v-if="store.filtred.votes.voteValue > 0"
            class="alert alert-success d-flex flex-column flex-md-row gap-1 mb-0 position-relative p-2"
            role="alert"
          >
            <font-awesome-icon
              :icon="['fas', 'xmark']"
              class="close position-absolute p-1"
              @click="closeVote('voteValue')"
            />
            <h6 class="mt-2 me-2">
              Media voto maggiore di {{ store.filtred.votes.voteValue }} stelle
            </h6>
          </div>
          <!-- /voto -->
          <!-- recensione -->
          <div
            v-if="store.filtred.reviews.reviewValue > 0"
            class="alert alert-success d-flex flex-column flex-md-row gap-1 mb-0 position-relative p-2"
            role="alert"
          >
            <font-awesome-icon
              :icon="['fas', 'xmark']"
              class="close position-absolute p-1"
              @click="closeReview('reviewValue')"
            />
            <h6 class="mt-2 me-2">
              Numero recensioni maggiore di
              {{ store.filtred.reviews.reviewValue }}
            </h6>
          </div>
        </div>
        <div
          class="alert alert-danger mb-0 mt-2"
          role="alert"
          :class="
            Object.keys(store.filtred.parametri).length === 0
              ? 'd-block'
              : 'd-none'
          "
        >
          Devi selezionare almeno una specializzazione
        </div>
        <!-- /elenco filtri applicati -->
      </div>
      <!-- /filtri -->

      <!-- destra -->
      <!-- <div class="right col-2 py-2 py-lg-0 text-center">
        <button class="btn btn-danger" @click="emptyParams()">
          Elimina Filtri
        </button>
      </div> -->
      <!-- /destra -->
    </div>
    <!-- /info ricerca -->

    <!-- contenitore cards -->
    <div
      class="card-container d-flex justify-content-center flex-wrap justify-content-md-around p-3 gap-5"
    >
      <!-- card -->
      <div
        class="d-flex align-items-center card-item col-12 col-md-5 position-relative"
        v-for="(new_doctor, index) in this.store.advancedDoctor"
      >
        <div
          class="sponsor d-flex align-items-center gap-1 position-absolute py-2 px-3"
          v-if="
            new_doctor.sponsorships[new_doctor.sponsorships.length - 1]?.pivot
              ?.end_date > formatDate(currentDate)
          "
        >
          <font-awesome-icon :icon="['fas', 'circle-info']" />
          <h6>Sponsorizzato</h6>
        </div>
        <!-- immagine -->
        <div class="img-container">
          <img
            v-if="new_doctor.doctor_img"
            :src="this.store.imgUrl + new_doctor.doctor_img"
            class="card-img"
            alt=""
          />
          <img v-else src="../../../public/img/BDoctors.png" alt="avatar"  class="card-img">
        </div>
        <!-- informazioni -->
        <div class="w-63">
          <div class="w-100">
            <h4 class="text-dark">
              {{ new_doctor.user.name }} {{ new_doctor.user.surname }}
            </h4>
          </div>
          <div class="d-flex flex-wrap mb-2">
            <p
              v-for="(specializations, index) in new_doctor.specializations"
              class="m-0 pe-2"
            >
              {{ specializations.title }}
              <span v-if="index !== new_doctor.specializations.length - 1"
                >-</span
              >
            </p>
          </div>
          <div class="col-stars d-flex gap-1 mb-1">
            <font-awesome-icon
              v-for="star in stars(index)"
              :icon="['fas', 'star']"
            />
            <p v-if="new_doctor.votes.length === 0" class="mb-0">Nussun Voto</p>
          </div>
          <p>{{ new_doctor.reviews.length }} Recensioni</p>
          <p>
            <font-awesome-icon icon="fa-solid fa-location-dot" />
            {{ new_doctor.address }}
          </p>
          <p
            @click="showClick(index)"
            class="btn-dettaglio px-3 py-2 rounded-3 fw-medium"
          >
            <strong>Dettaglio</strong>
          </p>
        </div>
      </div>
    </div>
  </main>
</template>

<style scoped lang="scss">
@use "../../style/partials/palette.scss" as *;

.btn-dettaglio {
  color: white;
  background: rgb(20, 184, 159);
  background: linear-gradient(
    140deg,
    rgba(15, 118, 106, 1) 10% rgba(20, 184, 159, 1) 100%
  );
  border: none;
  display: inline;
  cursor: pointer;
}

.info-ricerca {
  max-height: 450px;
}

.filtri {
  max-height: 450px;
}

.alert.alert-success.d-flex.flex-column.flex-md-row.gap-1.mb-0.position-relative.p-2 {
  max-height: 3.75rem;
}

.alert.alert-danger.mb-0.mt-2 {
  max-width: 400px;
}

// card
.card-item {
  background-color: white;
  border-radius: 25px;
  border-top: 4px solid rgba(162, 162, 162, 0.75);
  border-left: 2px solid rgba(162, 162, 162, 0.75);
  border-right: 2px solid rgba(162, 162, 162, 0.75);
  border-bottom: 4px solid rgba(162, 162, 162, 0.75);

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
  color: $green-600;
  font-size: 1.125rem;
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
