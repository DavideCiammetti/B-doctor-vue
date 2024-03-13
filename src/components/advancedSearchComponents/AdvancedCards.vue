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
      <!-- visualizza le info dopo aver selezionato almeno una checkbox -->
      <h6 v-if="Object.keys(store.filtred.parametri) > 1">Filtri Applicati:</h6>
      <!-- visualizza la key se presente -->
      <h6 v-if="store.filtred.doctors.key" class="lower-case">
        {{ store.filtred.doctors.key }}
      </h6>
      <!-- visualizza i parametri della richiesta -->
      <div v-for="(key, index) in Object.keys(store.filtred.parametri)" :key="index">
        <!-- tranne il primo elemento perchè è la key -->
        <h6 v-if="index > 0" class="lower-case">{{ key }}</h6>
      </div>
    </div>
    <!-- /info ricerca -->

    <!-- contenitore cards -->
    <div class="card-container d-flex justify-content-center flex-wrap justify-content-md-around p-3 gap-5">
      <!-- card -->
      <div class="d-flex card-item col-12 col-md-5 position-relative" v-for="(new_doctor, index) in this.store.doctor">
        <!-- immagine -->
        <div class="img-container">
          <img v-if="new_doctor.doctor_img" :src="this.store.imgUrl + new_doctor.doctor_img" class="card-img" alt="" />
        </div>
        <!-- informazioni -->
        <div class="w-63 mt-4">
          <div class="d-flex justify-content-between w-100">
            <h4 class="text-dark">
              {{ new_doctor.name }} {{ new_doctor.surname }}
            </h4>
          </div>
          <div class="d-flex flex-wrap mb-2">
            <p v-for="specializations in new_doctor.specializations" class="m-0 pe-2">
              {{ specializations }}
            </p>
          </div>
          <!-- <div class="col-stars d-flex">-------voti feature
                        <font-awesome-icon v-for="star in 5 - this.store.numStelleRimanenti" :icon="['fas', 'star']"/>
                    </div> -->
          <!-- <p>{{ new_doctor.reviews.length }} Recensioni</p> -->
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
