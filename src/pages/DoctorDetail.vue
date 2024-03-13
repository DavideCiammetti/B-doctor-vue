<script>
import axios from "axios";
import moment from "moment";
import { store } from "../store";

export default {
  name: "doctor-detail",
  data() {
    return {
      store,
      activeReviews: true,
      activeServices: false,
      activeSpecializations: false,
      activeCv:false,
      doctor: {},
      // form reviews show
      showFormReviews: false,
      showButton:true,
      // form messages show
      showFormMessage:false,
      // invio recenzioni
      formReviews: {
        name: null,
        surname: null,
        email: null,
        phoneNumber: null,
        content: null,
      },
      // invio messaggi
      formMessages: {
        name: null,
        surname: null,
        email: null,
        phoneNumber: null,
        message: null,
      },
      // invio voto
      formVotes:{
        vote_id: null,
      },
      selectedStars: 0,
    };
  },
  methods: {
    // invio recenzioni
    sendReviews() {
      const data = {
        doctor_id: this.doctor.id,
        name: this.formReviews.name,
        surname: this.formReviews.surname,
        email: this.formReviews.email,
        phone_number: this.formReviews.phoneNumber,
        content: this.formReviews.content,
      };
      console.log(data);
      axios
        .post(this.store.api.baseUrl + this.store.apiReviews, data)
        .then((response) => {
          console.log(response);
          if (response.status === 201) {
            this.doctor.reviews.push(response.data);
          }
        })
        .catch((error) => {
          console.log(error);
        });
      this.formReviews.name = "";
      this.formReviews.surname = "";
      this.formReviews.email = "";
      this.formReviews.phoneNumber = "";
      this.formReviews.content = "";
    },
    sendMessages() {
      const data = {
        doctor_id: this.doctor.id,
        name: this.formMessages.name,
        surname: this.formMessages.surname,
        email: this.formMessages.email,
        phone_number: this.formMessages.phoneNumber,
        message: this.formMessages.message,
      };
      console.log(data);
      axios
        .post(this.store.api.baseUrl + this.store.apiMessages, data)
        .then((response) => {
          console.log("messages", response);
        })
        .catch((error) => {
          console.log(error);
        });
      this.formMessages.name = "";
      this.formMessages.surname = "";
      this.formMessages.email = "";
      this.formMessages.phoneNumber = "";
      this.formMessages.message = "";
    },
    sendVotes(){
      const data = {
          vote_id: this.formVotes.vote_id,  
          doctor_id: this.doctor.id,
      };

      console.log(data);
      axios.post(this.store.api.baseUrl + this.store.apiVotes, data
        )
        .then((response) => {
         console.log('messages', response);
        })
        .catch((error) => {
          console.log(error);
        });
        this.formMessages.vote_id = '';
    },
    // click stelle voti
    clickStar(key){
      console.log(key);
      this.selectedStars = key;
      return  this.formVotes.vote_id = this.selectedStars;
    },
    reviews() {
      this.activeReviews = true;
      this.activeServices = false;
      this.activeSpecializations = false;
      this. activeCv = false;
    },
    services() {
      this.activeReviews = false;
      this.activeServices = true;
      this.activeSpecializations = false;
      this. activeCv = false;
    },
    specializations() {
      this.activeReviews = false;
      this.activeServices = false;
      this.activeSpecializations = true;
      this. activeCv = false;
    },
    docCv(){
      this.activeReviews = false;
      this.activeServices = false;
      this.activeSpecializations = false;
      this. activeCv = true;
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
      if (this.doctor.votes && this.doctor.votes.length > 0) {
        const votes = this.doctor.votes;
        let somma = 0;
        // scorro l'array
        votes.forEach((vote) => {
          somma = somma + vote.id; // sommo gli id
        });
        const numStelleRimanenti = Math.round(somma / this.doctor.votes?.length); // divido la somma per la lunghezza dell'array
        return numStelleRimanenti; // restituisco il numero di stelle mancanti
      } else {
        return 0; // Se non ci sono voti, restituisci 0
      }
    },

    formatDate(data) {
      return moment(data).format("DD/MM/YYYY");
    },
    // mostra form inserimento reviews
    showForm() {
      this.showFormReviews = !this.showFormReviews;
      this.showButton = !this.showButton;
    },
    // apre un altro button che chiude il form
    closeReview(){
      this.showFormReviews = !this.showFormReviews;
      this.showButton = !this.showButton;
    },
    showFormMessages(){
      this.showFormMessage = !this.showFormMessage;
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
        <div class="d-flex flex-wrap flex-md-nowrap gap-5 height-tot">
          <!-- card -->
          <div class="doc-card rounded-4 px-3 px-md-5 py-3 py-md-4 w50-percento">
            <!-- top -->
            <div class="top gap-4 d-flex">
              <div class="img">
                <img
                  v-if="doctor.doctor_img"
                  :src="'http://127.0.0.1:8000/storage/' + doctor.doctor_img"
                  alt="doctor image"
                  class="rounded-4"
                />
              </div>
              <div class="info d-flex flex-column gap-2">
                <div>
                  <div class="name d-flex gap-1">
                  <h4>Dott.</h4>
                  <h4>{{ doctor.user?.name }}</h4>
                  <h4>{{ doctor.user?.surname }}</h4>
                </div>
                <div class="d-flex gap-1" v-if="doctor.phone_number">
                  <span>Telefono:</span>
                  <a :href="'tel:' + doctor.phone_number">{{
                    doctor.phone_number
                  }}</a>
                </div>
                
                <h6 class="my-3">Indirizzo: {{ doctor.address }}</h6>
                <div class="cont d-flex flex-column gap-2 mt-2 mb-2 pb-4">
                  <div class="stelle d-flex gap-1 mb-2">
                    <font-awesome-icon v-for="star in stars()" :icon="['fas', 'star']"/>
                  </div>
                  <div>
                    <button
                      class="btn btn-primary"
                      type="button"
                      data-bs-toggle="offcanvas"
                      @click="showFormMessages"
                      data-bs-target="#offcanvasExample"
                      aria-controls="offcanvasExample"
                    >
                      Contatta il Medico
                    </button>
                  </div>
                </div>
                <!-- offcanvas form messaggi -->
                <div
                  class="offcanvas offcanvas-start off-width"
                  tabindex="-1"
                  id="offcanvasExample"
                  aria-labelledby="offcanvasExampleLabel"
                >
                  <div class="offcanvas-header">
                    <h5 class="offcanvas-title" id="offcanvasExampleLabel">
                      Inserisci il messaggio
                    </h5>
                    <button
                      type="button"
                      class="btn-close"
                      data-bs-dismiss="offcanvas"
                      aria-label="Close"
                    ></button>
                  </div>
                  <div class="offcanvas-body">
                    <div v-if="this.showFormMessage">
                  <form action="" @submit.prevent="sendMessages" method="post">
                    <!-- name -->
                    <label for="nameRev" class="d-none">Nome</label>
                    <input type="text" id="nameRev" placeholder="Nome" class="input-reviews p-2" name="name" v-model="formMessages.name">
                    <!-- surname -->
                    <label for="surnameRev" class="d-none">surname</label>
                    <input type="text" name="surname" class="input-reviews p-2" placeholder="Cognome" v-model="formMessages.surname">
                    <!-- email -->
                    <label for="emailRev" class="d-none">email</label>
                    <input type="email" name="email" class="input-reviews p-2" placeholder="Email" v-model="formMessages.email">
                    <!-- phone number -->
                    <label for="phoneRev" class="d-none">phone</label>
                    <input type="text" name="phoneNumber" class="input-reviews p-2" placeholder="Tel" id="phoneRev" v-model="formMessages.phoneNumber">
                    <!-- content -->
                    <textarea name="content" id="reviewsText" class="input-reviews p-1" placeholder="Recenzione" cols="80" rows="4" v-model="formMessages.message"></textarea>
                    <button class="ms-2 butt-Reviews p-2">Invia Messaggio </button>
                  </form>
                </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
            <!-- /top -->
            <!-- bottom -->
            <div
              class="bottom d-flex flex-column flex-md-row justify-content-center gap-3 gap-md-5 mt-5">
              <p class="p-2 rounded-3 text-center" @click="reviews">
                Recensioni
              </p>
              <p class="p-2 rounded-3 text-center" @click="services">
                Prestazioni
              </p>
              <p class="p-2 rounded-3 text-center" @click="specializations">
                Specializzazioni
              </p>
              <p class="p-2 rounded-3 text-center" @click="docCv">
                Cv
              </p>
            </div>
            <!-- /bottom -->
          </div>
          <!-- /card -->





            <!-- sezioni -->
          <div class="section rounded-4 px-3 px-md-5 py-4 w50-percento overflow-auto" :class="activeCv === true ? 'd-none' : 'd-block'">
            <!-- recensioni -->
            <div
              class="recensioni d-flex flex-column gap-2"
              :class="activeReviews === true ? 'd-block' : 'd-none'"
            >
              <!-- top -->
              <div
                class="cont d-flex justify-content-between align-items-center"
              >
              <!-- davide -->
                <h4>{{ doctor.reviews?.length }} Recensioni</h4>
                <button class="btn border border-2 col-black" v-if="showButton" @click="showForm">Aggiungi recensione</button>
                <button class="btn border border-2 col-black" v-if="!showButton" @click="closeReview">Chiudi form recensione</button>
              </div>
              <!-- invio dati reviews -->
              <div v-if="showFormReviews">
                  <form action="" @submit.prevent="sendReviews" method="post">
                    <!-- name -->
                    <label for="nameRev" class="d-none">Nome</label>
                    <input type="text" id="nameRev" placeholder="Nome" class="input-reviews p-2" name="name" v-model="formReviews.name">
                    <!-- surname -->
                    <label for="surnameRev" class="d-none">surname</label>
                    <input type="text" name="surname" class="input-reviews p-2" placeholder="Cognome" v-model="formReviews.surname">
                    <!-- email -->
                    <label for="emailRev" class="d-none">email</label>
                    <input type="email" name="email" class="input-reviews p-2" placeholder="Email" v-model="formReviews.email">
                    <!-- phone number -->
                    <label for="phoneRev" class="d-none">phone</label>
                    <input type="text" name="phoneNumber" class="input-reviews p-2" placeholder="Tel" id="phoneRev" v-model="formReviews.phoneNumber">
                    <!-- content -->
                    <textarea name="content" id="reviewsText" class="input-reviews p-1" placeholder="Recensione" cols="53" rows="4" v-model="formReviews.content"></textarea>
                    <button class="ms-2 butt-Reviews p-2">Invia Recensione</button>
                  </form>
              </div>
              <!-- /top -->

              <div class="cont p-2">
                <!-- aggiungi voto davide-->
                <p class="m-0 fs-5 mb-md-3">Dai un voto</p>
                <div>
                  <form action="" @submit.prevent="sendVotes" method="post">
                    <font-awesome-icon class="stars-vote" :class="{'bg-star-c': key + 1 <= selectedStars }" v-for="(star, key) in 5":icon="['fas', 'star']" @click="clickStar(key+1)"/>
                    <button v-show="selectedStars" class="send-vote-bt">Invia Voto</button>
                  </form>
                </div>
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
                <ul
                  class="cont px-5"
                  v-if="doctor.reviews && doctor.reviews.length > 0"
                >
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
                <div v-else>
                  <p>Non sono presenti recensioni</p>
                </div>
              </div>
              <!-- /lista recensioni -->
            </div>
            <!-- /recensioni -->

            <!-- prestazioni -->
            <div
              class="prestazioni"
              :class="activeServices === true ? 'd-block' : 'd-none'"
            >
              <h4>Prestazioni</h4>
              <div class="p-0 mt-4">
                <p class="p-2" v-if="doctor.services !== null">
                  {{ doctor.services }}
                </p>
                <p v-else>
                  Il dottore non ha ancora inserito le sue prestazioni
                </p>
              </div>
            </div>
            <!-- /prestazioni -->

            <!-- specializzazioni -->
            <div
              class="specializzazioni"
              :class="activeSpecializations === true ? 'd-block' : 'd-none'"
            >
              <h4 class="fs-5">Specializzazioni</h4>
              <ul class="p-0 mt-4">
                <li
                  v-for="specialization in doctor.specializations"
                  class="p-2"
                >
                  {{ specialization.title }}
                </li>
              </ul>
            </div>
            <!-- /specializzazioni -->
          </div>
          <!-- /sezioni -->
           <!-- cv -->
           <div class="cv-width mx-auto mt-5 mt-lg-0"  :class="activeCv === true ? 'd-block' : 'd-none'">
              <iframe
                v-if="doctor.doctor_cv"
                :src="'http://127.0.0.1:8000/storage/' + doctor.doctor_cv"
                frameborder="0"
                style="width: 600px; height: 600px"
              ></iframe>
              <h6 v-else>Il dottore non ha ancora inserito il CV</h6>
            </div>
            <!-- cv -->
        </div>
      </div>
    </div>
  </main>
</template>

<style scoped lang="scss">
  @use "../style/partials/palette.scss" as *;
.cv-width{
  width: 50%;
}
li {
  list-style-type: none;
}
.stelle {
  color: #00c3a5;
}
.stars-vote{
  font-size: 20px;
}
.bg-star-c{
  color: #00c3a5;
}
// button che invia voto
.send-vote-bt{
  background-color: #00566e;
  margin-left: 5px;
  padding: 3px 5px;
  border-radius: 3px;
  color: white;
  border: none;
  font-size: 12px;
}
.input-reviews, .butt-Reviews{
  border: 0;
  outline: none;
  margin: 10px;
  border-radius: 6px;
  border: 2px solid #00264c;
}
.buttMessage {
  margin: 0 10px;
}
.off-width {
  width: 700px;
}
.butt-Reviews:hover {
  border: 2px solid #2dd4b8;
  background-color: #00264c;
  color: white;
}
.input-reviews:hover {
  border: 2px solid #2dd4b8;
}
/*
  crads
*/
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

/*
  sezioni
*/
.section {
  background-color: #eef2f2;

  /*
 recenzioni
*/
  .recensioni {
    .data {
      color: #627282;
    }
  }
}
/*
  responsivity
*/ 
@media (min-width: 768px) {
  .img {
    width: 100% !important;
  }
  .w50-percento{
  width: 50%;
  height: 100%;

  }
  .height-tot{
    height: 600px;
  }
}
</style>
