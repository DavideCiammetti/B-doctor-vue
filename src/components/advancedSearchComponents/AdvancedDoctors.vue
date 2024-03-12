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
        params: { slug: this.store.doctor[index].slug },
      });
    },
    // calcolo numero stelle da rappresentare in card
    stars(index) {
      if (this.store.advancedDoctor[index].votes.length > 0) {
        let voti = this.store.advancedDoctor[index].votes;
        let numeroVoti = this.store.advancedDoctor[index].votes.length;
        let somma = 0;
        console.log(this.numeroVoti);
        // scorro l'array
        voti.forEach((vote) => {
          somma = somma + vote.id; // sommo gli id
          console.log(somma);
        });
        let numStelleRimanenti = Math.floor(somma / numeroVoti);
        return numStelleRimanenti; // divido la somma per la lunghezza dell'array
      } else {
        let numStelleRimanenti = 0;
        return numStelleRimanenti; // Se non ci sono voti, restituisci 5
      }
    },
  },
};
</script>

<template>
  <main class="main py-5" v-show="!this.store.searchNotFound">
    <!-- info ricerca -->
    <div class="info-ricerca px-5 mb-5 d-flex justify-content-between">
      <div class="left">
        <h6>Numero dottori trovati: {{ store.doctor.length }}</h6>
        <!-- visualizza le info dopo aver selezionato almeno una checkbox -->
        <h6 v-if="Object.keys(store.filtred.parametri).length > 1">
          Filtri Applicati:
        </h6>
        <!-- visualizza i parametri della richiesta -->
        <div
          v-for="(key, index) in Object.keys(store.filtred.parametri)"
          :key="index"
        >
          <!-- tranne il chiavi di voti e recensioni -->
          <h6
            class="lower-case"
            v-if="key !== 'voteValue' && key !== 'reviewValue'"
          >
            {{ key }}
          </h6>
        </div>
        <h6 v-if="store.filtred.votes.voteValue > 0">
          Media voto > {{ store.filtred.votes.voteValue }} stella
        </h6>
        <h6 v-if="store.filtred.reviews.reviewValue > 0">
          Numero Recensioni > {{ store.filtred.reviews.reviewValue }}
        </h6>
      </div>
      <div class="right">
        <button class="btn btn-danger" @click="emptyParams()">
          Svuota Ricerca
        </button>
      </div>
    </div>
    <!-- /info ricerca -->

    <!-- contenitore cards -->
    <div
      class="card-container d-flex justify-content-center flex-wrap justify-content-md-around p-3 gap-5"
    >
      <!-- card -->
      <div
        class="d-flex card-item col-12 col-md-5 position-relative"
        v-for="(new_doctor, index) in this.store.advancedDoctor"
      >
        <!-- immagine -->
        <div class="img-container">
          <img
            v-if="new_doctor.doctor_img"
            :src="this.store.imgUrl + new_doctor.doctor_img"
            class="card-img"
            alt=""
          />
        </div>
        <!-- informazioni -->
        <div class="w-63 mt-4">
          <div class="d-flex justify-content-between w-100">
            <h4 class="text-dark">
              {{ new_doctor.user.name }} {{ new_doctor.user.surname }}
            </h4>
            <div class="sponsor-img-cont" v-if="new_doctor.sponsorships !== []">
              <div class="sponsor-img">
                <img
                  v-if="new_doctor.price == 9.99"
                  src="../../../public/advancedSearch-img/Ellipse-gold.png"
                  alt="gold"
                />
                <img
                  v-if="new_doctor.price == 5.99"
                  src="../../../public/advancedSearch-img/Ellipse-silver.png"
                  alt="gold"
                />
                <img
                  v-if="new_doctor.price == 2.99"
                  src="../../../public/advancedSearch-img/Ellipse-bronze.png"
                  alt="gold"
                />
              </div>
            </div>
          </div>
          <div class="d-flex flex-wrap mb-2">
            <p
              v-for="specializations in new_doctor.specializations"
              class="m-0 pe-2"
            >
              {{ specializations.title }}
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
.sponsor-img-cont {
  margin-right: 20px;
  .sponsor-img {
    width: 35px;
    img {
      width: 100%;
    }
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
</style>
./AdvancedDoctors.vue/index.js
