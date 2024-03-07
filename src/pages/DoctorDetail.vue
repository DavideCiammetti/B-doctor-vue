<script>
import axios from "axios";
import moment from "moment";

export default {
  name: "doctor-detail",
  data() {
    return {
      activeReviews: true,
      activeServices: false,
      activeSpecializations: false,
      doctor: {},
    };
  },
  methods: {
    reviews() {
      this.activeReviews = true;
      this.activeServices = false;
      this.activeSpecializations = false;
    },
    services() {
      this.activeReviews = false;
      this.activeServices = true;
      this.activeSpecializations = false;
    },
    specializations() {
      this.activeReviews = false;
      this.activeServices = false;
      this.activeSpecializations = true;
    },
    getDoctor() {
      axios
        .get(
          "http://127.0.0.1:8000" +
            "/api/doctors" +
            "/" +
            this.$route.params.slug
        )
        .then((response) => {
          this.doctor = response.data.results;
          this.stars();
        })
        .catch((error) => {
          console.log(error);
        });
    },
    stars() {
      if (this.doctor.votes) {
        const votes = this.doctor.votes;
        let somma = 0;
        // scorro l'array
        votes.forEach((vote) => {
          somma = somma + vote.id; // sommo gli id
        });
        const numStelleRimanenti = Math.floor(somma / this.doctor.votes.length); // divido la somma per la lunghezza dell'array
        return numStelleRimanenti; // restituisco il numero di stelle mancanti
      }
    },
    formatDate(data) {
      return moment(data).format("DD/MM/YYYY");
    },
  },
  created() {
    this.getDoctor();
  },
};
</script>

<template>
  <main>
    <div class="container my-5">
      <div class="row">
        <!-- sinistra -->
        <div class="col-10 col-lg-7 mx-auto">
          <!-- card -->
          <div class="doc-card rounded-4 px-3 px-md-5 py-3 py-md-4">
            <!-- top -->
            <div class="top d-flex flex-column flex-md-row gap-4">
              <div class="img">
                <img
                  :src="'http://127.0.0.1:8000/storage/' + doctor.doctor_img"
                  alt="doctor image"
                  class="rounded-4"
                />
              </div>
              <div class="info d-flex flex-column gap-2">
                <div class="name d-flex gap-1">
                  <h4>Dott.</h4>
                  <h4>{{ doctor.user?.name }}</h4>
                  <h4>{{ doctor.user?.surname }}</h4>
                </div>
                <h6 v-for="specialization in doctor.specializations">
                  {{ specialization.title }}
                </h6>
                <div class="d-flex gap-1">
                  <span>Telefono:</span>
                  <a :href="'tel:' + doctor.phone_number">{{
                    doctor.phone_number
                  }}</a>
                </div>
                <h6>Indirizzo: {{ doctor.address }}</h6>
                <div
                  class="cont d-flex flex-column flex-md-row align-items-center gap-2 mt-2"
                >
                  <div class="stelle d-flex gap-1">
                    <font-awesome-icon
                      v-for="star in 5 - stars()"
                      :icon="['fas', 'star']"
                    />
                  </div>
                  <span>{{ doctor.reviews?.length }} Recensioni</span>
                </div>
                <button class="btn btn-primary mt-2">Contatta il Medico</button>
              </div>
            </div>
            <!-- /top -->
            <!-- bottom -->
            <div
              class="bottom d-flex flex-column flex-md-row justify-content-center gap-3 gap-md-5 mt-5"
            >
              <p class="p-2 rounded-3 text-center" @click="reviews">
                Recensioni
              </p>
              <p class="p-2 rounded-3 text-center" @click="services">
                Prestazioni
              </p>
              <p class="p-2 rounded-3 text-center" @click="specializations">
                Specializzazioni
              </p>
            </div>
            <!-- /bottom -->
          </div>
          <!-- card -->

          <!-- sezioni -->
          <div class="section rounded-4 px-3 px-md-5 py-4 mt-5">
            <!-- recensioni -->
            <div
              class="recensioni d-flex flex-column gap-2"
              :class="activeReviews === true ? 'd-block' : 'd-none'"
            >
              <!-- top -->
              <div
                class="cont d-flex justify-content-between align-items-center"
              >
                <h4>{{ doctor.reviews?.length }} Recensioni</h4>
                <button class="btn border border-2">Aggiungi recensione</button>
              </div>
              <!-- /top -->

              <!-- voto -->
              <div class="cont">
                <div class="stelle d-flex gap-1 mt-2">
                  <font-awesome-icon
                    v-for="star in 5 - stars()"
                    :icon="['fas', 'star']"
                  />
                </div>
                <p class="mb-0">Punteggio Medio</p>
              </div>
              <!-- /voto -->

              <!-- sicurezza recensioni -->
              <div
                class="cont d-flex align-items-center gap-4 border border-2 py-3 px-4"
              >
                <font-awesome-icon :icon="['fas', 'shield-halved']" />
                <p class="mb-0">
                  Tutte le recensioni contano e non possono essere rimosse o
                  modificate dai dottori a proprio piacimento.
                </p>
              </div>
              <!-- /sicurezza recensioni -->

              <!-- lista recensioni -->
              <div class="cont">
                <h4 class="mt-4">Lista recensioni</h4>
                <ul class="cont px-5">
                  <li
                    v-for="review in doctor.reviews"
                    class="cont d-flex flex-column gap-2 mt-5"
                  >
                    <div class="d-flex gap-1">
                      <h6>{{ review.name }}</h6>
                      <h6>{{ review.surname }}</h6>
                    </div>
                    <h6 class="data">
                      {{ formatDate(review.updated_at) }}
                    </h6>
                    <p>
                      {{ review.content }}
                    </p>
                  </li>
                </ul>
              </div>
              <!-- /lista recensioni -->

              <!-- button -->
              <!-- <div class="cont border-top border-2 p-3 text-center">
                <button class="btn border border-w bg-light">
                  Mosta Altro
                </button>
              </div> -->
              <!-- /button -->
            </div>
            <!-- /recensioni -->

            <!-- prestazioni -->
            <div
              class="prestazioni"
              :class="activeServices === true ? 'd-block' : 'd-none'"
            >
              <h4>Prestazioni</h4>
              <div class="p-0 mt-4">
                <p class="p-2">{{ doctor.services }}</p>
              </div>
            </div>
            <!-- /prestazioni -->

            <!-- specializzazioni -->
            <div
              class="specializzazioni"
              :class="activeSpecializations === true ? 'd-block' : 'd-none'"
            >
              <h4 class="fs-5">Specializzazioni</h4>
              <ul
                class="p-0 mt-4"
                v-for="specialization in doctor.specializations"
              >
                <li class="p-2">{{ specialization.title }}</li>
              </ul>
            </div>
            <!-- /specializzazioni -->
          </div>
          <!-- /sezioni -->
        </div>
        <!-- /sinistra -->

        <!-- destra -->
        <div class="col-10 col-lg-4 mx-auto mt-5 mt-lg-0">
          <!-- cv -->
          <iframe
            v-if="doctor.doctor_cv"
            :src="'http://127.0.0.1:8000/storage/' + doctor.doctor_cv"
            frameborder="0"
            style="width: 100%; height: 500px"
          ></iframe>
          <h6 v-else>Il dottore non ha ancora inserito il CV</h6>
          <!-- /cv -->
        </div>
        <!-- /destra -->
      </div>
    </div>
  </main>
</template>

<style lang="scss" scoped>
li {
  list-style-type: none;
}
.stelle {
  color: #00c3a5;
}

// card
.doc-card {
  background-color: #eef2f2;

  .img {
    height: 200px;
    width: 200px;

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }

  .bottom p {
    transition: all 0.5s;
  }

  .bottom p:hover {
    cursor: pointer;
    background-color: #00c3a5;
    color: white;
  }
}

// sezioni
.section {
  background-color: #eef2f2;

  // recensioni
  .recensioni {
    .data {
      color: #627282;
    }
  }
}

@media (max-width: 768px) {
  .img {
    width: 100% !important;
  }
}
</style>
