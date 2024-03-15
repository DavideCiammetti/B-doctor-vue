<script>
import { store } from "../../store.js";
import axios from "axios";

export default {
  name: "NavBarLg",
  data() {
    return {
      store,
      // array per numero stelle da rappresentare nel range
      voteIcons: [],
      // specializzazioni
      specializations: [
        "ortopedico",
        "dermatologo",
        "psicologo",
        "oculista",
        "ginecologo",
        "nutrizionista",
        "dentista",
        "cardiologo",
        "osteopata",
        "ostetrica",
        "anestesista",
        "logopedista",
      ],
    };
  },
  methods: {
    // redirect alla pagina not found
    notFound() {
      this.$router.push({
        name: "/notFound",
      });
    },
    fillSpecializations() {
      this.specializations.forEach((specialization) => {
        this.store.filtred.specializations[specialization] = true;
      });
    },
    // ricerca avanzata
    filtredDoctors() {
      this.$router.push("/ricerca-avanzata");
      store.error = false;
      // variabili per mostrare/nascondere i componenti
      store.advancedCards = false;
      store.advancedDoctors = true;

      // Oggetto per memorizzare i parametri da includere nella richiesta
      let params = {};
      store.filtred.parametri = params;

      // svuotare il key della ricerca base
      store.filtred.doctors.key = "";

      // Controlla le specializzazioni e aggiunge all'oggetto params
      Object.keys(store.filtred.specializations).forEach((spec) => {
        if (store.filtred.specializations[spec] == true) {
          params[spec] = store.filtred.specializations[spec];
        }
      });

      // Esegue la chiamata API solo se ci sono parametri da inviare
      if (Object.keys(params).length > 0) {
        store.searchNotFound = false; // nasconde pagina not found
        // axios
        axios
          .get(store.api.baseUrl + "/api/doctorsadvanced", {
            params: params,
          })
          .then((response) => {
            this.store.advancedDoctor = response.data.results;
            if (this.store.filtred.votes.voteValue > 0) {
              this.voteFilter();
            }
            if (this.store.filtred.reviews.reviewValue > 0) {
              this.reviewFilter();
            }
            params = {}; // svuota i params dopo aver salvato i dati
            // se si verifica la condizione mostra pagina not found
            if (store.advancedDoctor.length === 0) {
              store.searchNotFound = true;
            }
          })
          .catch((error) => {
            console.log(error);
          });
      } else {
        // Avvisa l'utente che non ha selezionato nessun filtro
        this.message = true;
      }
    },
    voteFilter() {
      this.store.advancedDoctor = this.store.advancedDoctor.filter((doctor) => {
        if (doctor.votes.length > 0) {
          let media = 0;
          let voti = doctor.votes;
          let numeroVoti = doctor.votes.length;
          let somma = 0;
          voti.forEach((vote) => {
            somma = somma + vote.id; // sommo gli id
          });
          media = Math.round(somma / numeroVoti); // Calcolo della media corretto
          return media >= this.store.filtred.votes.voteValue; // Restituisce true solo se la media è maggiore o uguale al valore di voto filtrato
        }
        return false; // Se non ci sono voti, il dottore non viene incluso nei risultati
      });
    },
    reviewFilter() {
      this.store.advancedDoctor = this.store.advancedDoctor.filter((doctor) => {
        // Filtra i dottori con un numero di recensioni maggiore o uguale a quello specificato
        return doctor.reviews.length >= this.store.filtred.reviews.reviewValue;
      });
    },
  },
  // watcher per visualizzare stelle nel range
  watch: {
    // Watcher per il cambio di store.filtred.votes.voteValue
    "store.filtred.votes.voteValue": function (newVal, oldVal) {
      // Pulisci l'array di icone prima di aggiornarlo
      this.voteIcons = [];

      // Aggiungi nuove icone in base al nuovo valore
      for (let i = 0; i < newVal; i++) {
        this.voteIcons.push(i);
      }
    },
  },
};
</script>

<template>
  <nav class="navbar navbar-expand-lg nav-cstm p-0">
    <div class="container-fluid p-1">
      <form
        class="d-flex flex-column flex-md-row ps-3 pt-1 pe-3 p-md-1 ps-md-3 justify-content-between w-100 bg-white rounded-5"
        role="search"
      >
        <!-- specializzazione  -->
        <div
          class="d-flex gap-1 align-items-center align-content-center prov-spec"
        >
          <span class="input-group-text bg-white p-0" id="basic-addon2">
            <font-awesome-icon icon="fa-solid fa-stethoscope" />
          </span>
          <div class="dropdown">
            <button
              class="btn btn-secondary dropdown-toggle"
              type="button"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              Specializzazione
            </button>
            <ul class="dropdown-menu pb-0 overflow-hidden">
              <li>
                <div class="d-flex align-iitems-center gap-2 p-1">
                  <input
                    type="checkbox"
                    id="ortopedico"
                    name="ortopedico"
                    :checked="store.filtred.specializations.ortopedico === true"
                    v-model="store.filtred.specializations.ortopedico"
                  />
                  <label for="ortopedico">Ortopedico</label>
                </div>
              </li>
              <li>
                <div class="d-flex align-iitems-center gap-2 p-1">
                  <input
                    type="checkbox"
                    id="osteopata"
                    name="osteopata"
                    :checked="store.filtred.specializations.osteopata === true"
                    v-model="store.filtred.specializations.osteopata"
                  />
                  <label for="osteopata">Osteopata</label>
                </div>
              </li>
              <li>
                <div class="d-flex align-iitems-center gap-2 p-1">
                  <input
                    type="checkbox"
                    id="dermatologo"
                    name="dermatologo"
                    :checked="
                      store.filtred.specializations.dermatologo === true
                    "
                    v-model="store.filtred.specializations.dermatologo"
                  />
                  <label for="dermatologo">Dermatologo</label>
                </div>
              </li>
              <li>
                <div class="d-flex align-iitems-center gap-2 p-1">
                  <input
                    type="checkbox"
                    id="oculista"
                    name="oculista"
                    :checked="store.filtred.specializations.oculista === true"
                    v-model="store.filtred.specializations.oculista"
                  />
                  <label for="oculista">Oculista</label>
                </div>
              </li>
              <li>
                <div class="d-flex align-iitems-center gap-2 p-1">
                  <input
                    type="checkbox"
                    id="ginecologo"
                    name="ginecologo"
                    :checked="store.filtred.specializations.ginecologo === true"
                    v-model="store.filtred.specializations.ginecologo"
                  />
                  <label for="ginecologo">Ginecologo</label>
                </div>
              </li>
              <li>
                <div class="d-flex align-iitems-center gap-2 p-1">
                  <input
                    type="checkbox"
                    id="nutrizionista"
                    name="nutrizionista"
                    value="nutrizionista"
                    :checked="
                      store.filtred.specializations.nutrizionista === true
                    "
                    v-model="store.filtred.specializations.nutrizionista"
                  />
                  <label for="nutrizionista">Nutrizionista</label>
                </div>
              </li>
              <li>
                <div class="d-flex align-iitems-center gap-2 p-1">
                  <input
                    type="checkbox"
                    id="psicologo"
                    name="psicologo"
                    :checked="store.filtred.specializations.psicologo === true"
                    v-model="store.filtred.specializations.psicologo"
                  />
                  <label for="psicologo">Psicologo</label>
                </div>
              </li>
              <li>
                <div class="d-flex align-iitems-center gap-2 p-1">
                  <input
                    type="checkbox"
                    id="dentista"
                    name="dentista"
                    :checked="store.filtred.specializations.dentista === true"
                    v-model="store.filtred.specializations.dentista"
                  />
                  <label for="dentista">Dentista</label>
                </div>
              </li>
              <li>
                <div class="d-flex align-iitems-center gap-2 p-1">
                  <input
                    type="checkbox"
                    id="cardiologo"
                    name="cardiologo"
                    :checked="store.filtred.specializations.cardiologo === true"
                    v-model="store.filtred.specializations.cardiologo"
                  />
                  <label for="cardiologo">Cardiologo</label>
                </div>
              </li>
              <li>
                <div class="d-flex align-iitems-center gap-2 p-1">
                  <input
                    type="checkbox"
                    id="ostetrica"
                    name="ostetrica"
                    :checked="store.filtred.specializations.ostetrica === true"
                    v-model="store.filtred.specializations.ostetrica"
                  />
                  <label for="ostetrica">Ostetrica</label>
                </div>
              </li>
              <li>
                <div class="d-flex align-iitems-center gap-2 p-1">
                  <input
                    type="checkbox"
                    id="anestesista"
                    name="anestesista"
                    :checked="
                      store.filtred.specializations.anestesista === true
                    "
                    v-model="store.filtred.specializations.anestesista"
                  />
                  <label for="anestesista">Anestesista</label>
                </div>
              </li>
              <li>
                <div class="d-flex align-iitems-center gap-2 p-1">
                  <input
                    type="checkbox"
                    id="logopedista"
                    name="logopedista"
                    :checked="
                      store.filtred.specializations.logopedista === true
                    "
                    v-model="store.filtred.specializations.logopedista"
                  />
                  <label for="logopedista">Logopedista</label>
                </div>
              </li>
              <li @click="fillSpecializations()">
                <div
                  class="btn-specialization p-2 text-center text-white fw-medium"
                >
                  Seleziona tutte le specializzazioni
                </div>
              </li>
            </ul>
          </div>
        </div>
        <!-- /specializzazione  -->

        <!-- voti  -->
        <div
          class="d-flex gap-1 align-items-center align-content-center prov-vot"
        >
          <span class="input-group-text bg-white p-0" id="basic-addon3">
            <font-awesome-icon icon="fa-regular fa-star" />
          </span>
          <div class="dropdown">
            <button
              class="btn btn-secondary dropdown-toggle"
              type="button"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              Voti
            </button>
            <div class="dropdown-menu px-3">
              <label for="customRange1" class="form-label">Media Voto</label>
              <input
                type="range"
                class="form-range"
                id="customRange1"
                min="0"
                max="5"
                step="1"
                v-model="store.filtred.votes.voteValue"
                name="vote"
              />
              <div class="stars">
                <font-awesome-icon
                  v-for="star in voteIcons"
                  :icon="['fas', 'star']"
                />
                {{ store.filtred.votes.voteValue }}
              </div>
            </div>
          </div>
        </div>
        <!-- /voti  -->

        <!-- recensioni  -->
        <div
          class="d-flex gap-1 align-items-center align-content-center prov-rec"
        >
          <span class="input-group-text bg-white p-0" id="basic-addon3">
            <font-awesome-icon icon="fa-regular fa-file-lines" />
          </span>
          <div class="dropdown">
            <button
              class="btn btn-secondary dropdown-toggle"
              type="button"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              Recensioni
            </button>
            <div class="dropdown-menu w-full px-3">
              <label for="customRange1" class="form-label"
                >Num. Recensioni</label
              >
              <input
                type="range"
                class="form-range"
                id="customRange1"
                min="0"
                max="50"
                step="10"
                name="review"
                v-model="store.filtred.reviews.reviewValue"
              />
              <div class="d-flex gap-4">
                <label for="number">Num. Selezionato</label>
                <input
                  v-model="store.filtred.reviews.reviewValue"
                  type="number"
                  name="reviews"
                  class="input number px-2"
                />
              </div>
            </div>
          </div>
        </div>
        <!-- /recensioni  -->

        <!-- bottone cerca  -->
        <div class="col-12 col-md-1 d-flex justify-content-end mb-2 mb-md-0">
          <button
            @click.prevent="filtredDoctors"
            class="btn btn-outline-success flex-grow-1 search-button"
            type="submit"
          >
            Cerca >
          </button>
        </div>
        <!-- /bottone cerca  -->
      </form>
    </div>
  </nav>
</template>

<style scoped lang="scss">
@use "../../style/partials/palette.scss" as *;

.nav-cstm {
  height: 60px;

  .btn-specialization {
    background-color: $green-500;
    cursor: pointer;
  }

  input.form-control.me-1.p-0.with-border::placeholder {
    font-size: 16px;
  }

  .input-group-text.bg-white {
    height: auto;
    border-color: white;

    &:first-of-type {
      border-radius: 50px 0 0 50px;
    }
  }

  input.form-control.me-1.p-0.with-border {
    font-size: 11px;
    height: auto;
    border: none;
  }

  // prove resposive
  .search-button {
    @media (min-width: 768px) {
      border-radius: 0 50px 50px 0;
    }

    @media (max-width: 768px) {
      border-radius: 20px;
    }
  }

  .flex-grow-1.d-flex.gap-1 {
    @media (max-width: 606px) {
      flex-grow: 0; // Impedisce al elemento di espandersi
      flex-basis: 25%; // Imposta la larghezza iniziale al 25%
      max-width: 25%; // Imposta la larghezza massima al 25%
    }
  }

  .prov-spec {
    @media (max-width: 606px) {
      flex-grow: 0;
      flex-basis: 16.6667%;
      max-width: 16.6667%;
    }
  }

  .prov-vot {
    @media (max-width: 606px) {
      flex-grow: 0;
      flex-basis: 16.6667%;
      max-width: 16.6667%;
    }
  }

  .prov-rec {
    @media (max-width: 606px) {
      flex-grow: 0;
      flex-basis: 25%;
      max-width: 25%;
    }
  }

  button.btn.btn-secondary.dropdown-toggle {
    background-color: white;
    border: none;
    color: black;
  }

  // bottone
  .search-button {
    background-color: #00264c;
    color: white;
    border-color: #00264c;
    height: 54px;
    display: block;

    @media (max-width: 934px) {
      font-size: 5px;
      padding: 0 5px;
    }

    @media (max-width: 1052px) {
      font-size: 13px;
    }
  }
}

.number {
  display: inline;
  border: none;
  width: 50px;
}

input:focus-visible {
  border: none;
}

.stars svg {
  color: $green-400;
}
</style>
