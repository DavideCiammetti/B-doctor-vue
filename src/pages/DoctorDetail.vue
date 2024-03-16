<script>
import axios from "axios";
import moment from "moment";
import { store } from "../store";

export default {
  name: "doctor-detail",
  data() {
    return {
      store,
      activeServices: true,
      activeSpecializations: false,
      activeCv: false,
      disableOverflow: false,
      // disattiva il colore delle stelle e il numero
      noStarsColor: true,
      doctor: {},
      // form reviews show
      showFormReviews: false,
      showButton: true,
      // form messages show
      showFormMessage: false,
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
      formVotes: {
        vote_id: null,
      },
      selectedStars: 0,
      // alert invio messaggio 
      messageAlertSuccess: false,
      // alert invio review
      messageAlertSuccessReview: false,
      // alert invio voto
      messageAlertSuccessVote: false,
      // date management 
      currentDate: new Date(),
    };
  },
  methods: {
    // funzione data
    sponsorshipsDate(data) {
      return moment(data).format();
    },
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
          this.messageAlertSuccessReview = false;
        });

        this.messageAlertSuccessReview = true;
      if (this.messageAlertSuccessReview === true) {
        setTimeout(() => {
          this.messageAlertSuccessReview = false;
        }, 3000);
      }
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
          this.messageAlertSuccess = false;
        });
        this.messageAlertSuccess = true;
      if (this.messageAlertSuccess === true) {
        setTimeout(() => {
          this.messageAlertSuccess = false;
        }, 3000);
      }
      this.formMessages.name = "";
      this.formMessages.surname = "";
      this.formMessages.email = "";
      this.formMessages.phoneNumber = "";
      this.formMessages.message = "";
    },
    sendVotes() {
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
          this.messageAlertSuccessVote = false;
        });

        this.messageAlertSuccessVote = true;
      if (this.messageAlertSuccessVote === true) {
        setTimeout(() => {
          this.messageAlertSuccessVote = false;
        }, 3000);
      }
      this.formMessages.vote_id = '';
    },
    // click stelle voti
    clickStar(starIndex) {
      console.log(starIndex);
      this.selectedStars = starIndex;
      this.formVotes.vote_id = starIndex;
    },
    services() {
      this.activeServices = true;
      this.activeSpecializations = false;
      this.activeCv = false;
    },
    specializations() {
      this.activeServices = false;
      this.activeSpecializations = true;
      this.activeCv = false;
    },
    docCv() {
      this.activeServices = false;
      this.activeSpecializations = false;
      this.activeCv = true;
      this.disableOverflow = true;
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
    closeReview() {
      this.showFormReviews = !this.showFormReviews;
      this.showButton = !this.showButton;
    },
    showFormMessages() {
      this.showFormMessage = !this.showFormMessage;
    },

  },
  created() {
    this.getDoctor();
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  },
};
</script>

<template>
  <main>
    <div class=" my-5 justify-content-center d-flex flex-wrap">
      <div class="justify-content-center flex-column flex-lg-row d-flex flex-wrap flex-md-nowrap gap-5 p-3 px-md-3 section-width" >
        <!-- card -->
        <div class="justify-content-center doc-card rounded-4 px-1 px-md-2 py-3 py-md-4 section-width">
          <!-- top -->
          <div class="top gap-4 d-flex mb-2">
            <div class="img">
              <img v-if="doctor.doctor_img" :src="'http://127.0.0.1:8000/storage/' + doctor.doctor_img"
                alt="doctor image" class="rounded-4" />
            </div>
            <div class="d-flex flex-column gap-2 w-62-sponsor">
              <div>
                <div class="name d-flex flex-wrap gap-1 justify-content-between ">
                  <div class="d-flex gap-1">
                    <h4>Dott.</h4>
                    <h4>{{ doctor.user?.name }}</h4>
                    <h4>{{ doctor.user?.surname }}</h4>
                  </div>
                  <div v-if="doctor.sponsorships[doctor.sponsorships.length - 1]?.pivot?.end_date >  sponsorshipsDate(currentDate)" class="d-flex sponsor" >
                    <font-awesome-icon :icon="['fas', 'circle-info']" class="me-1"/>
                    <h6 class="line-he-1">Sponsorizzato</h6>
                </div>
                </div>
                <div class="d-flex flex-wrap gap-2" v-if="doctor.phone_number">
                  <span class="f-style">Telefono:</span>
                  <a :href="'tel:' + doctor.phone_number">{{
                    doctor.phone_number
                  }}</a>
                </div>

               <div class="d-flex flex-wrap my-3 gap-2">
                <h6 class="f-style">Indirizzo:</h6>
                <span> {{ doctor.address }}</span>
               </div>
                <div class="d-flex flex-column gap-2 mt-2 mb-2 pb-4">
                  <div class="stelle d-flex gap-1 mb-2">
                    <font-awesome-icon v-for="star in stars()" :icon="['fas', 'star']" />
                  </div>
                  <div>
                    <button class="btn message-button" type="button" data-bs-toggle="offcanvas" @click="showFormMessages"
                      data-bs-target="#offcanvasExample" aria-controls="offcanvasExample">
                      Contatta il Medico
                    </button>
                  </div>
                </div>
                <!-- offcanvas form messaggi -->
                <div class="offcanvas offcanvas-start off-width" tabindex="-1" id="offcanvasExample"
                  aria-labelledby="offcanvasExampleLabel">
                  <div class="offcanvas-header">
                    <h4 class="offcanvas-title fs-1" id="offcanvasExampleLabel">
                      Invia il messaggio
                    </h4>
                    <button type="button" class="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
                  </div>
                  <p class=" ps-3 required-fields-text">* I seguenti campi sono obbligatri</p>
                  <div class="offcanvas-body">
                    <div>
                      <form action="" @submit.prevent="sendMessages" method="post">
                        <!-- name -->
                        <label for="nameRev" class="d-none">Nome</label>
                        <input type="text" id="nameRev" placeholder="Nome" class="rev-w input-reviews p-2" name="name"
                          v-model="formMessages.name">
                        <!-- surname -->
                        <label for="surnameRev" class="d-none">surname</label>
                        <input type="text" name="surname" class="rev-w input-reviews p-2" placeholder="Cognome"
                          v-model="formMessages.surname">
                        <!-- email -->
                        <label for="emailRev" class="d-none">email</label>
                        <input type="email" name="email" class="rev-w input-reviews p-2" placeholder="Email*"
                          v-model="formMessages.email">
                        <!-- phone number -->
                        <label for="phoneRev" class="d-none">phone</label>
                        <input type="text" name="phoneNumber" class="rev-w input-reviews p-2" placeholder="Tel" id="phoneRev"
                          v-model="formMessages.phoneNumber">
                        <!-- content -->
                        <textarea name="content" id="reviewsText" class="text-rev-w input-reviews p-1" placeholder="Messaggio*"
                          cols="60" rows="4" v-model="formMessages.message"></textarea>
                      <div>
                        <button class="ms-2 butt-Reviews p-2">Invia Messaggio </button>
                      </div>
                      </form>
                    </div>
                    <div v-show="messageAlertSuccess" class="alert alert-success" role="alert">
                      il messaggio è stato inviato correttamente
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <!-- /top -->
          <!-- recensioni -->
          <div class="recensioni d-flex flex-column gap-2 mt-5">
            <!-- top -->
            <!-- sicurezza recensioni -->
            <div class=" d-flex align-items-center gap-4 border border-2 py-3 px-4">
              <font-awesome-icon :icon="['fas', 'shield-halved']" />
              <p class="mb-0">
                Tutte le recensioni contano e non possono essere rimosse o
                modificate dai dottori a proprio piacimento.
              </p>
            </div>
            <!-- /sicurezza recensioni -->

            <!-- lista recensioni -->
            <h4 class="mt-4 reviews-list-title">Lista Recensioni</h4>
            <div class=" d-flex justify-content-between align-items-center">
              <h4 class="sponsorships-title">Numero di Recensioni: {{ doctor.reviews?.length }}</h4>
            </div>
            <div class=" overflow-auto mb-4 reviews-list-container">
              <ul class="px-5" v-if="doctor.reviews && doctor.reviews.length > 0">
                <li v-for="review in doctor.reviews" class="cont d-flex flex-column gap-2 mt-5">
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
                <p>Non sono presenti Recensioni</p>
              </div>
            </div>
            <!-- /lista recensioni -->
          </div>

            <!-- voto -->
            <div class="p-2">
              <h4 class="m-0 mb-5 votes-title">Invia una Recensione o Dai un Voto</h4>
              <div class="ps-4">
                  <p class="ms-3 col-insert-vote">Inserisci un Voto</p>
                <form class="d-flex ps-3" action="" @submit.prevent="sendVotes" method="post">
                  <font-awesome-icon class="stars-vote" 
                  :class="{ 'bg-star-c': key + 1 <= selectedStars }"
                  v-for="(star, key) in 5" 
                  :icon="[key + 1 <= selectedStars ? 'fas' : 'far', 'star']"
                  @click="clickStar(key + 1)" />
                  <button v-show="selectedStars" class="send-vote-bt">Invia Voto</button>
                </form>
                <div v-show="messageAlertSuccessVote " class="alert alert-success mt-3" role="alert">
                  voto inviato correttamente
                </div>
              </div>
            </div>
            <!-- /voto -->

            <!-- invio dati reviews -->
            <div class="review-form-send mt-4">
              <div class="ps-3">
              <h4 class="ps-3 fs-1">Invia una recensione</h4>
              <p class=" ps-3 required-fields-text">* I seguenti campi sono obbligatri</p>
              </div>
              <form action="" class="text-center" @submit.prevent="sendReviews" method="post">
                <!-- name -->
                <label for="nameRev" class="d-none">Nome</label>
                <input type="text" id="nameRev" placeholder="Nome*" class="rev-w input-reviews p-2" name="name"
                  v-model="formReviews.name">
                <!-- surname -->
                <label for="surnameRev" class="d-none">surname</label>
                <input type="text" name="surname" class="rev-w input-reviews p-2" placeholder="Cognome*"
                  v-model="formReviews.surname">
                <!-- email -->
                <label for="emailRev" class="d-none">email</label>
                <input type="email" name="email" class="rev-w input-reviews p-2" placeholder="Email*"
                  v-model="formReviews.email">
                <!-- phone number -->
                <label for="phoneRev" class="d-none">phone</label>
                <input type="text" name="phoneNumber" class="rev-w input-reviews p-2" placeholder="Tel" id="phoneRev"
                  v-model="formReviews.phoneNumber">
                <!-- content -->
                <textarea name="content" id="reviewsText" class="text-rev-w input-reviews p-1" placeholder="Recensione*" cols="43"
                  rows="4" v-model="formReviews.content"></textarea>
                <div class="button-reviews ps-3">
                <button class="ms-2 butt-Reviews p-2 ms-3">Invia Recensione</button>
                </div>
              </form>
              <div v-show="messageAlertSuccessReview" class="alert alert-success" role="alert">
                il messaggio è stato inviato correttamente
              </div>
            </div>
        </div>
        <!-- /recensioni -->
        <!-- /card -->
        
        <!-- sezioni-->
        <div class="section rounded-4 px-3 px-md-5 py-4 w50-percento section-width height-cv">
          <div>
            <div class="bottom d-flex flex-column flex-md-row justify-content-center gap-3 gap-md-5 mt-5 mb-4">
              <button :class="activeServices === true ? 'button-fix': ''" class="button-detali-doc fs-4 p-2 rounded-3 text-center" @click="services">
                Prestazioni
              </button>
              <button :class="activeSpecializations === true ? 'button-fix': ''" class="button-detali-doc fs-4 p-2 rounded-3 text-center" @click="specializations">
                Specializzazioni
              </button>
              <button :class="activeCv === true ? 'button-fix': ''" class="button-detali-doc fs-4 p-2 rounded-3 text-center" @click="docCv">
                Cv
              </button>
            </div>

            <!-- prestazioni -->
            <div class="prestazioni" :class="activeServices === true ? 'd-block' : 'd-none'">
              <h4 class="prestazioni-title">Prestazioni</h4>
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
            <div class="specializzazioni" :class="activeSpecializations === true ? 'd-block' : 'd-none'">
              <h4 class="specializzazioni-title">Specializzazioni</h4>
              <ul class="p-0 mt-4">
                <li v-for="specialization in doctor.specializations" class="p-2">
                  {{ specialization.title }}
                </li>
              </ul>
            </div>
          </div>
            <!-- cv -->
          <div class="cv-width mx-auto mt-5 mt-lg-0 text-center" :class="activeCv === true ? 'd-block' : 'd-none'">
            <iframe v-if="doctor.doctor_cv" :src="'http://127.0.0.1:8000/storage/' + doctor.doctor_cv" frameborder="0" 
              style="width: 100%; height: 100%;;">
            </iframe>
            <h6 v-else>Il dottore non ha ancora inserito il CV</h6>
          </div>
            <!-- cv -->
          <!-- /specializzazioni -->
        </div>
        <!-- /sezioni -->
      </div>
    </div>
  </main>
</template>

<style scoped lang="scss">
@use "../style/partials/palette.scss" as *;
// dimensioni sezione
.section-width{
  width: 97%;
}
// sponsoships su card 
  .sponsor {
    color: $green-400;
  }
  .w-62-sponsor{
    width: 62%;
      .line-he-1{
        line-height: 1;
      }
  }
  .sponsorships-title{
    background-color: rgb(1 136 91 / 10%);
    border-radius: 4px;
    width: 97%;
    padding: 0 5px;
    padding-top: 3px;
    color: #006556;
  }
/*
  crads
*/
.doc-card {
  background-color: #eef2f2;

  .img {
    width: 220px;

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }
// testo telefono e indirizzo accanto alla foto
.f-style{
  font-style: italic;
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

// input field forms
.rev-w{
  width: 42%;
}
// campi obbligatori testo
.required-fields-text{
  color: rgb(255, 0, 0);
}
.message-button{
  background-color: rgb(15, 118, 106);
  color: white;
}
// form invio reviews
  .review-form-send{
      border-radius: 20px;
      padding: 20px;
  }
  .input-reviews,
  .butt-Reviews {
    border: 0;
    outline: none;
    margin: 10px;
    border-radius: 6px;
    border: 1px solid #00c3a5;
  }
  .off-width {
    width: 700px;
  }
  .text-rev-w{
    width: 91%;
  }
  .button-reviews{
    text-align: justify;
  }
  .butt-Reviews:hover {
    background-color: #027779;
    color: white;
  }
// cv 
iframe {
  height: 350px;
  width: 240px;
}

li {
  list-style-type: none;
}

.stelle,
.bg-star-c  {
  color: #00c3a5;
}

.stars-vote {
  font-size: 20px;
  padding: 2px;
}
// testo inserisci un voto accanto a stelle 
.col-insert-vote{
  color: rgb(0, 0, 0);
  font-size: 2rem;
}
// button che invia voto
.send-vote-bt {
  background-color: rgb(15, 118, 106);
  margin-left: 5px;
  padding: 3px 5px;
  border-radius: 3px;
  color: white;
  border: none;
  font-size: 12px;
}


.buttMessage {
  margin: 0 10px;
}

// button che mostrano i dettagli
.button-detali-doc{
  border: none;
  outline: none;
  width: 50%;
  background-color: #eef2f2;
}
.button-fix{
  background-color: rgb(15, 118, 106);
  // background-color: #00566e;
  color: white;
}
.button-detali-doc:hover{
  background-color: rgb(15, 118, 106);
  // background-color: #00566e;
  color: white;
}
.prestazioni-title, 
.specializzazioni-title,
.reviews-list-title,
.votes-title{
  background-color: rgb(20, 184, 159) ;
    color: white;
    padding: 7px 3px;
    border-radius: 3px;
}
// lista reviews
.reviews-list-container{
  height: 300px;
}
// cv
.cv-width {
  height: 182px;
    width: 314px;
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
  .height-cv{
    height: 50%;
  }
  .cv-width {
    width: 500px; 
    height: 600px;
  }
  .section-width{
  width: 100%;
}
.sponsorships-title{
    width: 45%;
  }
}
</style>
