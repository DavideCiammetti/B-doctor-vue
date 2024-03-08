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
    <!-- contenitore cards -->
    <div
      class="card-container d-flex justify-content-center flex-wrap justify-content-md-around p-3 gap-5"
    >
      <!-- card -->
      <div
        class="d-flex card-item col-12 col-md-5 position-relative"
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
        <div class="w-63 mt-4">
          <div class="d-flex justify-content-between w-100">
            <h4 class="text-dark">
              {{ new_doctor.user.name }} {{ new_doctor.user.surname }}
            </h4>
            <div class="sponsor-img-cont" v-if="new_doctor.sponsorships !== []">
              <div
                class="sponsor-img"
                v-for="sponsorship in new_doctor.sponsorships"
              >
                <img
                  v-if="sponsorship.price == 9.99"
                  src="../../../public/advancedSearch-img/Ellipse-gold.png"
                  alt="gold"
                />
                <img
                  v-if="sponsorship.price == 5.99"
                  src="../../../public/advancedSearch-img/Ellipse-silver.png"
                  alt="gold"
                />
                <img
                  v-if="sponsorship.price == 2.99"
                  src="../../../public/advancedSearch-img/Ellipse-bronze.png"
                  alt="gold"
                />
              </div>
            </div>
          </div>
          <div class="d-flex flex-wrap mb-2">
            <p
              v-for="(specialization, key) in new_doctor.specializations"
              class="m-0 pe-2"
            >
              <span v-if="key !== 0"> - </span>{{ specialization.title }}
            </p>
          </div>
          <!-- <div class="col-stars d-flex">-------voti feature
                        <font-awesome-icon v-for="star in 5 - this.store.numStelleRimanenti" :icon="['fas', 'star']"/>
                    </div> -->
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
</style>
