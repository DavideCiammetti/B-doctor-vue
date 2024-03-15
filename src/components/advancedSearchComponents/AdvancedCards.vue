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
    // calcolo stelle
    stars(index) {
      if (store.doctor[index].votes.length > 0) {
        let votes = store.doctor[index].votes;
        let somma = 0;
        // scorro l'array
        votes.forEach((vote) => {
          somma = somma + +vote; // sommo i voti dopo aver convertito voto in numero
        });
        let numStelle = Math.round(somma / votes.length); // divido la somma per la lunghezza dell'array
        return numStelle; // restituisco il numero di stelle
      } else {
        return 0; // Se non ci sono voti, restituisci 0
      }
    },
    showClick(index) {
      this.$router.push({
        name: "doctor-detail",
        params: { slug: this.store.doctor[index].slug },
      });
    },
  },
};
</script>

<template>
  <main class="main py-5" v-show="!this.store.searchNotFound">
    <!-- info ricerca -->
    <div class="info-ricerca px-5 mb-5">
      <h6>Numero dottori trovati: {{ store.doctor.length }}</h6>
    </div>
    <!-- /info ricerca -->

    <!-- contenitore cards -->
    <div
      class="card-container d-flex justify-content-center flex-wrap justify-content-md-around p-3 gap-5"
    >
      <!-- card -->
      <div
        class="d-flex align-items-center card-item col-12 col-md-5 position-relative"
        v-for="(new_doctor, index) in this.store.doctor"
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
        <div class="w-63">
          <div class="d-flex justify-content-between w-100">
            <h4 class="text-dark">
              {{ new_doctor.name }} {{ new_doctor.surname }}
            </h4>
          </div>
          <div class="d-flex flex-wrap mb-2">
            <p
              v-for="(specialization, index) in new_doctor.specializations"
              class="m-0 pe-2"
            >
              {{ specialization }}
              <span v-if="index !== new_doctor.specializations.length - 1"
                >-</span
              >
            </p>
          </div>
          <div class="stelle d-flex gap-1 mb-2">
            <font-awesome-icon
              v-for="star in stars(index)"
              :icon="['fas', 'star']"
            />
            <p v-if="new_doctor.votes[0] === ''" class="mb-0">Nussun Voto</p>
          </div>
          <div class="recensioni pb-1">
            <div class="singola" v-if="new_doctor.reviews.length === 1">
              {{ new_doctor.reviews.length }} Recensione
            </div>
            <div class="singola" v-else>
              {{ new_doctor.reviews.length }} Recensioni
            </div>
          </div>
          <p>
            <font-awesome-icon icon="fa-solid fa-location-dot" />
            {{ new_doctor.address }}
          </p>
          <p
            @click="showClick(index)"
            class="btn-dettaglio px-3 py-2 rounded-3 fw-medium"
          >
            Dettaglio
          </p>
        </div>
      </div>
    </div>
  </main>
</template>

<style scoped lang="scss">
@use "../../style/partials/palette.scss" as *;

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

.btn-dettaglio {
  color: white;
  background: rgb(20, 184, 159);
  background: linear-gradient(
    140deg,
    rgba(15, 118, 106, 1) 10% rgba(20, 184, 159, 1) 100%
  );
  border: none;
  display: inline;
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
  color: $green-600;
  font-size: 1.125rem;
}

.dettaglio {
  cursor: pointer;
}

.lower-case {
  text-transform: lowercase;
}

.stelle {
  color: $green-w-400;
}
</style>
