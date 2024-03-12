<script>
import { store } from "../../store.js";
import axios from "axios";
export default {
  name: "DownHeader",
  data() {
    return {
      store,
    };
  },
  methods: {
    // chiamata axios per ricerca base dottori con validazioni
    getDoctors() {
      const validRegex = /^[a-zA-Z\s]+$/;
      const maxThree = document.querySelector(".max-three");
      const onlyLetters = document.querySelector(".only-letters");

      // valido campo ricerca base che abbia più di 3 caratteri
      if (this.store.filtred.doctors.key.trim().length < 3) {
        this.store.doctor = {};
        maxThree.classList.remove("d-none");
        console.log("la ricerca deve avere più di 3 caratteri");

        //valido campo ricerca base che non contenga numeri o caratteri speciali
      } else if (!validRegex.test(this.store.filtred.doctors.key)) {
        this.store.doctor = {};
        onlyLetters.classList.remove("d-none");
        console.log("la ricerca deve contenere solo lettere");

        // chiamata axios ricerca base dottori per specializzazione
      } else {
        onlyLetters.classList.add("d-none");
        maxThree.classList.add("d-none");
        axios
          .get(this.store.api.baseUrl + this.store.apiUrls.doctors, {
            params: {
              key: this.store.filtred.doctors.key,
            },
          })
          .then((response) => {
            this.store.doctor = response.data.results;
            console.log(this.store.doctor);
            this.showSearchbar();
            // ricerca che non produce risultati
            if (this.store.doctor.length === 0) {
              this.store.searchNotFound = true;
              this.$router.push("/notFound");
            } else {
              this.store.searchNotFound = false;
              // this.store.doctors.searchKey = '';
              this.$router.push("/ricerca-avanzata");
            }
          })
          .catch((error) => {
            console.log(error);
            this.store.doctor.results = [];
          });
      }
    },
    // mostra searchbar
    showSearchbar() {
      this.store.changedSearchbar = true;
    },
  },
};
</script>

<template>
  <nav class="navbar navbar-light rounded-pill nav-cstm p-0">
    <div class="container-fluid pe-0">
      <form
        class="d-flex align-items-center p-0 custom-search-bar"
        @submit.prevent="getDoctors"
      >
        <div class="search-icon">
          <font-awesome-icon icon="fa-solid fa-magnifying-glass" />
        </div>
        <datalist id="searchSpecial">
          <option value="Logopedista"></option>
          <option value="Anestesista"></option>
          <option value="Ostetrica"></option>
          <option value="Osteopata"></option>
          <option value="Cardiologo"></option>
          <option value="Dentista"></option>
          <option value="Nutrizionista"></option>
          <option value="Ginecologo"></option>
          <option value="Oculista"></option>
          <option value="Psicologo"></option>
          <option value="Dermatologo"></option>
          <option value="Ortopedico"></option>
        </datalist>

        <input
          list="searchSpecial"
          class="form-control me-2 search-input"
          type="search"
          placeholder="Inserisci una specializzazione..."
          aria-label="Search"
          v-model="store.filtred.doctors.key"
        />

        <button class="btn btn-outline-success search-button" type="submit">
          Cerca
        </button>
      </form>
    </div>
    <div>
      <p class="m-0 text-warning ms-4 pt-1 max-three d-none">
        la ricerca deve contenere almeno 3 caratteri
      </p>
      <p class="m-0 text-warning ms-4 only-letters d-none">
        la ricerca non può contenere numeri o caratteri speciali
      </p>
    </div>
  </nav>
</template>

<style scoped lang="scss">
@use "../../style/partials/palette.scss" as *;

.nav-cstm {
  background-color: white;
  height: 3.75rem;
  border-top-right-radius: 1.5625rem;
  border-bottom-right-radius: 1.5625rem;

  > :first-child {
    height: 100%;
    border-top-right-radius: 1.5625rem;
    border-bottom-right-radius: 1.5625rem;
  }

  .custom-search-bar {
    position: relative;
    width: 100%;
    height: 3.75rem;
    background: white;
    border: 0.125rem solid white;
    border-radius: 1.5625rem;
    display: flex;
    align-items: center;
    padding: 0 0.9375rem;

    .search-icon {
      background-color: white;
      color: black;
      padding: 0.5rem;
      border-right: none;
      border-top-left-radius: 0.3125rem;
      border-bottom-left-radius: 0.3125rem;
    }

    .search-input {
      border: none;
      flex-grow: 1;
      padding: 0.5rem;
      background-color: white;
      color: black;
      margin-left: 0.625rem;
    }
    .search-button {
      width: 70%;
      height: 90%;
      background-color: #00264c;
      color: white;
      border-color: #00264c;
      border-top-right-radius: 1.5625rem;
      border-bottom-right-radius: 1.5625rem;
      padding: 0.25rem 0.9375rem;
      font-size: 0.75rem;

      @media (min-width: 768px) {
        width: 50%;
        padding-top: 0.9375rem;
        padding-bottom: 0.9375rem;
        margin-right: 0.25rem;
      }

      @media (min-width: 992px) {
        width: 20%;
        padding-top: 0.9375rem;
        padding-bottom: 0.9375rem;
        margin-right: 0.25rem;
      }

      @media (min-width: 992px) and (max-width: 1243px) {
        width: 35%;
      }

      @media (min-width: 1244px) and (max-width: 1340px) {
        width: 37%;
      }
    }
  }
}

@media (min-width: 768px) {
  .custom-search-bar {
    height: auto;
  }
}

@media (min-width: 992px) and (max-width: 1243px) {
  .custom-search-bar {
    height: 100%;
  }
}
</style>
