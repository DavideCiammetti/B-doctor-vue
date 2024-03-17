<script>
import { store } from "../../store.js";
import axios from "axios";

export default {
  name: "MainCards",
  data() {
    return {
      store,
      currentPage: 1,
      totalSponsoredDoctors: 0,
      totalPages: 0,
    };
  },
  computed: {
    sponsoredDoctors() {
      return store.sponsoredDoctors;
    },
    imgUrl() {
      return store.imgUrl;
    },
    visiblePages() {
      const start = Math.max(1, this.currentPage - 1);
      const end = Math.min(start + 2, this.totalPages);
      return Array.from({ length: end - start + 1 }, (_, i) => start + i);
    },
  },
  methods: {
    getSponsoredDoctors() {
      axios
        .get(store.api.baseUrl + "/api/sponsor", {
          params: { page: this.currentPage },
        })
        .then((response) => {
          store.sponsoredDoctors = response.data.results.data;
          store.next = response.data.results.next_page_url;
          this.totalSponsoredDoctors = response.data.results.total;
          this.totalPages = response.data.results.last_page;
        })
        .catch((error) => {
          console.log(error);
        });
    },
    nextPage() {
      if (this.currentPage < this.totalPages) {
        this.goToPage(this.currentPage + 1);
      }
    },
    prevPage() {
      if (this.currentPage > 1) {
        this.goToPage(this.currentPage - 1);
      }
    },
    goToPage(pageNumber) {
      this.currentPage = pageNumber;
      this.getSponsoredDoctors();
    },
    redirectToDoctorDetail(slug) {
      this.$router.push({ name: "doctor-detail", params: { slug: slug } });
    },
  },
  created() {
    this.getSponsoredDoctors();
  },
};
</script>

<template>
  <!-- titolo  -->
  <div class="mb-3">
    <h2 class="title-col fw-bolder">
      {{ totalSponsoredDoctors }} - Medici Sponsorizzati
    </h2>
  </div>
  <!-- big container  -->
  <div class="w-100 d-flex justify-content-center align-items-center">
    <!-- div bottone precedente  -->
    <div class="d-block d-md-none px-3">
      <button @click="prevPage" :disabled="currentPage === 1" class="btn btn-cstm rounded-circle text-white">
        <font-awesome-icon icon="fa-solid fa-circle-chevron-left" />
      </button>
    </div>
    <!-- /div bottone precedente  -->

    <!-- card docs sponsored  -->
    <div class="d-flex gap-md-5 mt-5 flex-wrap justify-content-center">
      <div v-for="(doctor, index) in sponsoredDoctors" :key="index" @click="redirectToDoctorDetail(doctor.slug)"
        class="doctor-container position-relative">
        <div class="img-container">
          <!-- immagine -->
          <img v-if="doctor.doctor_img" :src="`${imgUrl}/${doctor.doctor_img}`" :alt="`${doctor.user.name} ${doctor.user.surname} image`"
            class="round-img" />
            <img v-else src="../../../public/img/BDoctors.png" alt="avatar"  class="round-img border-avatar">
        </div>
        <div class="position-absolute info-doctor-container d-flex justify-content-center align-items-center p-0">
          <div class="info-doctor text-start width-80">
            <!-- Nome e cognome del dottore -->
            <p class="m-0 text-white font-s-15 fw-medium md-1">
              {{ doctor.user.name }} {{ doctor.user.surname }}
            </p>
            <!-- Specializzazioni del dottore -->
            <p class="m-0 text-white font-s-13 md-1">
              <span v-for="(specialization, index) in doctor.specializations" :key="index">
                {{ specialization.title }}
                <span v-if="index < doctor.specializations.length - 1">, </span>
              </span>
            </p>
            <!-- indirizzo -->
            <p class="m-0 text-white font-s-13 md-1">
              <font-awesome-icon icon="fa-solid fa-location-dot" />
              {{ doctor.address }}
            </p>
            <!-- recensioni -->
            <p class="m-0 text-white font-s-13 md-1">
              {{ doctor.reviews.length }} Recension{{ doctor.reviews.length === 1 ? 'e' : 'i' }}
            </p>
            <!-- dettaglio  -->
            <!-- <p @click="redirectToDoctorDetail(doctor.slug)" class="col-grey dettaglio m-0 font-s-13 md-1">
                            Dettaglio</p> -->
          </div>
        </div>
      </div>
    </div>
    <!-- /card docs sponsored  -->

    <!-- div bottone successivo fontawesome  -->
    <div class="d-block d-md-none px-3">
      <button @click="nextPage" :disabled="currentPage === totalPages" class="btn btn-cstm rounded-circle text-white">
        <font-awesome-icon icon="fa-solid fa-circle-chevron-right" />
      </button>
    </div>
    <!-- div bottone successimo fontawesome  -->
  </div>

  <!-- bottoni prec succ e num page  -->
  <div class="pagination-container mt-5 d-flex justify-content-center align-items-center gap-2">
    <button @click="prevPage" :disabled="currentPage === 1" class="btn btn-cstm text-white d-none d-md-block">
      Precedente
    </button>
    <button @click="goToPage(1)" class="btn text-white" :class="{
      'btn-cstm': 1 === currentPage,
      'btn-secondary': 1 !== currentPage,
    }">
      1
    </button>
    <span v-if="currentPage > 3">...</span>
    <template v-for="page in visiblePages">
      <button v-if="page !== 1 && page !== totalPages" :key="page" @click="goToPage(page)" class="btn text-white" :class="{
        'btn-secondary': page !== currentPage,
        'btn-cstm': page === currentPage,
      }">
        {{ page }}
      </button>
    </template>
    <span v-if="currentPage + 2 < totalPages">...</span>
    <button @click="goToPage(totalPages)" class="btn text-white" :class="{
      'btn-cstm': totalPages === currentPage,
      'btn-secondary': totalPages !== currentPage,
    }">
      {{ totalPages }}
    </button>
    <button @click="nextPage" :disabled="currentPage === totalPages" class="btn btn-cstm text-white d-none d-md-block">
      Successiva
    </button>
  </div>
  <!-- /bottoni prec succ e num page  -->
</template>

<style scoped lang="scss">
@use "../../style/partials/palette.scss" as *;

.btn-cstm {
  background-color: #0d9482;
}
// avatar
.border-avatar{
  border: 1px solid #00ab86;
}

.doctor-container {
  width: 250px;
  height: 250px;
  margin-bottom: 30px;
  transition: transform 0.3s ease-in-out;
  cursor: pointer;

  &:hover {
    transform: scale(1.05);
  }

  .img-container {
    width: 100%;
    height: 100%;
    overflow: hidden;

    .round-img {
      border-radius: 20px;
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }
}

.info-doctor-container {
  bottom: 5px;
  left: 5px;
  right: 5px;

  .info-doctor {
    background-color: rgba(13, 148, 129, 0.8);
    border-radius: 20px;
    border-color: #0d9482;
    padding-left: 10px;
    border-width: 4px;
    border-style: solid;
    padding-left: 10px;

    .font-s-13 {
      font-size: 13px;
    }

    .font-s-15 {
      font-size: 15px;
    }

    // tag a colore
    .col-grey {
      color: rgb(169, 169, 169);
    }

    .dettaglio {
      cursor: pointer;
    }
  }
}

.pagination-container.mt-5.d-flex.justify-content-center {
  .btn-cstm {
    background-color: #0d9482;
  }
}

.width-80 {
  width: 100%;
}

/*
    responsività
*/

@media screen and (min-width: 768px) {

  // contenitore immagini
  .doctor-container {
    width: 300px;
    height: 300px;
    margin-bottom: 0;
  }

  .info-doctor-container {
    bottom: 10px;
    left: 30px;
    right: 30px;

    .info-doctor {
      background-color: rgba(13, 148, 129, 0.8);
      border-radius: 20px;
      border-color: #0d9482;
      padding-left: 10px;
      border-width: 4px;
      border-style: solid;
      padding-left: 10px;

      .font-s-13 {
        font-size: 13px;
      }

      .font-s-15 {
        font-size: 15px;
      }
    }
  }
}
</style>
