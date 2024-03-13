<script>
import { store } from "../../store.js";
import axios from "axios";

export default {
  name: "NavBarLg",
  data() {
    return {
      store,
      message: false,
    };
  },
  methods: {
    // redirect alla pagina not found
    notFound() {
      this.$router.push({
        name: "/notFound",
      });
    },
    // ricerca avanzata
    filtredDoctors() {
      // Oggetto per memorizzare i parametri da includere nella richiesta
      let params = {};
      store.filtred.parametri = params;

      // Controlla la key e aggiunge all'oggetto params
      Object.keys(store.filtred.doctors).forEach((doc) => {
        if (store.filtred.doctors[doc] !== "") {
          params[doc] = store.filtred.doctors[doc];
        }
      });

      // Controlla le specializzazioni e aggiunge all'oggetto params
      Object.keys(store.filtred.specializations).forEach((spec) => {
        if (store.filtred.specializations[spec] == true) {
          params[spec] = store.filtred.specializations[spec];
        }
      });

      // Controlla i voti e aggiunge all'oggetto params
      Object.keys(store.filtred.votes).forEach((vote) => {
        if (store.filtred.votes[vote] == true) {
          params[vote] = store.filtred.votes[vote];
        }
      });

      // Controlla il numero di recensioni e aggiunge all'oggetto params
      Object.keys(store.filtred.reviews).forEach((review) => {
        if (store.filtred.reviews[review] == true) {
          params[review] = store.filtred.reviews[review];
        }
      });

      // Esegue la chiamata API solo se ci sono parametri da inviare
      if (Object.keys(params).length > 0) {
        this.message = false; // nasconde il messaggio d'errore
        store.searchNotFound = false; // nasconde pagina not found
        // axios
        axios
          .get(store.api.baseUrl + "/api/doctorsadvanced", {
            params: params,
          })
          .then((response) => {
            store.doctor = response.data.results;
            params = {}; // svuota i params dopo aver salvato i dati
            // se si verifica la condizione mostra pagina not found
            if (store.doctor.length === 0) {
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
  },
};
</script>

<template>
  <nav class="navbar navbar-expand-lg navbar-light bg-white rounded-pill nav-cstm p-0">
    <div class="container-fluid p-1">
      <form class="d-flex w-100" role="search">
        <!-- ricerca  -->
        <div class="flex-grow-1 d-flex gap-1">
          <span class="input-group-text bg-white" id="basic-addon1">
            <font-awesome-icon icon="fa-solid fa-magnifying-glass" />
          </span>
          <input class="form-control me-1 p-0 with-border" type="search" placeholder="Ricerca..." aria-label="Search"
            v-model="store.filtred.doctors.key" />
        </div>
        <!-- /ricerca  -->

        <!-- specializzazione  -->
        <div class="flex-grow-1 d-flex gap-1 align-items-center align-content-center prov-spec">
          <span class="input-group-text bg-white p-0" id="basic-addon2">
            <font-awesome-icon icon="fa-solid fa-stethoscope" />
          </span>
          <div class="dropdown">
            <button class="btn btn-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown"
              aria-expanded="false">
              Specializzazione
            </button>
            <ul class="dropdown-menu">
              <li>
                <div class="d-flex align-iitems-center gap-2 p-1">
                  <input type="checkbox" id="ortopedico" name="ortopedico"
                    :checked="store.filtred.doctors.key === 'Ortopedico'"
                    v-model="store.filtred.specializations.ortopedico" />
                  <label for="ortopedico">Ortopedico</label>
                </div>
              </li>
              <li>
                <div class="d-flex align-iitems-center gap-2 p-1">
                  <input type="checkbox" id="osteopata" name="osteopata"
                    :checked="store.filtred.doctors.key === 'Osteopata'"
                    v-model="store.filtred.specializations.osteopata" />
                  <label for="osteopata">Osteopata</label>
                </div>
              </li>
              <li>
                <div class="d-flex align-iitems-center gap-2 p-1">
                  <input type="checkbox" id="dermatologo" name="dermatologo"
                    :checked="store.filtred.doctors.key === 'Dermatologo'"
                    v-model="store.filtred.specializations.dermatologo" />
                  <label for="dermatologo">Dermatologo</label>
                </div>
              </li>
              <li>
                <div class="d-flex align-iitems-center gap-2 p-1">
                  <input type="checkbox" id="oculista" name="oculista" :checked="store.filtred.doctors.key === 'Oculista'"
                    v-model="store.filtred.specializations.oculista" />
                  <label for="oculista">Oculista</label>
                </div>
              </li>
              <li>
                <div class="d-flex align-iitems-center gap-2 p-1">
                  <input type="checkbox" id="ginecologo" name="ginecologo"
                    :checked="store.filtred.doctors.key === 'Ginecologo'"
                    v-model="store.filtred.specializations.ginecologo" />
                  <label for="ginecologo">Ginecologo</label>
                </div>
              </li>
              <li>
                <div class="d-flex align-iitems-center gap-2 p-1">
                  <input type="checkbox" id="nutrizionista" name="nutrizionista" value="nutrizionista"
                    :checked="store.filtred.doctors.key === 'Nutrizionista'"
                    v-model="store.filtred.specializations.nutrizionista" />
                  <label for="nutrizionista">Nutrizionista</label>
                </div>
              </li>
              <li>
                <div class="d-flex align-iitems-center gap-2 p-1">
                  <input type="checkbox" id="psicologo" name="psicologo"
                    :checked="store.filtred.doctors.key === 'Psicologo'"
                    v-model="store.filtred.specializations.psicologo" />
                  <label for="psicologo">Psicologo</label>
                </div>
              </li>
              <li>
                <div class="d-flex align-iitems-center gap-2 p-1">
                  <input type="checkbox" id="dentista" name="dentista" :checked="store.filtred.doctors.key === 'Dentista'"
                    v-model="store.filtred.specializations.dentista" />
                  <label for="dentista">Dentista</label>
                </div>
              </li>
              <li>
                <div class="d-flex align-iitems-center gap-2 p-1">
                  <input type="checkbox" id="cardiologo" name="cardiologo"
                    :checked="store.filtred.doctors.key === 'Cardiologo'"
                    v-model="store.filtred.specializations.cardiologo" />
                  <label for="cardiologo">Cardiologo</label>
                </div>
              </li>
              <li>
                <div class="d-flex align-iitems-center gap-2 p-1">
                  <input type="checkbox" id="ostetrica" name="ostetrica"
                    :checked="store.filtred.doctors.key === 'Ostetrica'"
                    v-model="store.filtred.specializations.ostetrica" />
                  <label for="ostetrica">Ostetrica</label>
                </div>
              </li>
              <li>
                <div class="d-flex align-iitems-center gap-2 p-1">
                  <input type="checkbox" id="anestesista" name="anestesista"
                    :checked="store.filtred.doctors.key === 'Anestesista'"
                    v-model="store.filtred.specializations.anestesista" />
                  <label for="anestesista">Anestesista</label>
                </div>
              </li>
              <li>
                <div class="d-flex align-iitems-center gap-2 p-1">
                  <input type="checkbox" id="logopedista" name="logopedista"
                    :checked="store.filtred.doctors.key === 'Logopedista'"
                    v-model="store.filtred.specializations.logopedista" />
                  <label for="logopedista">Logopedista</label>
                </div>
              </li>
            </ul>
          </div>
        </div>
        <!-- /specializzazione  -->

        <!-- voti  -->
        <div class="flex-grow-1 d-flex gap-1 align-items-center align-content-center prov-vot">
          <span class="input-group-text bg-white p-0" id="basic-addon3">
            <font-awesome-icon icon="fa-regular fa-star" />
          </span>
          <div class="dropdown">
            <button class="btn btn-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown"
              aria-expanded="false">
              Voti
            </button>
            <ul class="dropdown-menu">
              <li>
                <div class="d-flex align-iitems-center gap-2 p-1">
                  <input type="checkbox" id="scarso" name="5" v-model="this.store.filtred.votes.scarso" />
                  <label for="scarso">Scarso</label>
                </div>
              </li>
              <li>
                <div class="d-flex align-iitems-center gap-2 p-1">
                  <input type="checkbox" id="sufficiente" name="4" v-model="this.store.filtred.votes.sufficiente" />
                  <label for="sufficiente">Sufficiente</label>
                </div>
              </li>
              <li>
                <div class="d-flex align-iitems-center gap-2 p-1">
                  <input type="checkbox" id="buono" name="3" v-model="this.store.filtred.votes.buono" />
                  <label for="buono">Buono</label>
                </div>
              </li>
              <li>
                <div class="d-flex align-iitems-center gap-2 p-1">
                  <input type="checkbox" id="discreto" name="2" v-model="this.store.filtred.votes.discreto" />
                  <label for="discreto">Discreto</label>
                </div>
              </li>
              <li>
                <div class="d-flex align-iitems-center gap-2 p-1">
                  <input type="checkbox" id="1" name="1" v-model="this.store.filtred.votes.ottimo" />
                  <label for="ottimo">Ottimo</label>
                </div>
              </li>
            </ul>
          </div>
        </div>
        <!-- /voti  -->

        <!-- recensioni  -->
        <div class="flex-grow-1 d-flex gap-1 align-items-center align-content-center prov-rec">
          <span class="input-group-text bg-white p-0" id="basic-addon3">
            <font-awesome-icon icon="fa-regular fa-file-lines" />
          </span>
          <div class="dropdown">
            <button class="btn btn-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown"
              aria-expanded="false">
              Recensioni
            </button>
            <ul class="dropdown-menu">
              <li>
                <div class="d-flex align-iitems-center gap-2 p-1">
                  <input type="checkbox" id="minDieci" name="minDieci" v-model="this.store.filtred.reviews.minDieci" />
                  <label for="minDieci">
                    < 10</label>
                </div>
              </li>
              <li>
                <div class="d-flex align-iitems-center gap-2 p-1">
                  <input type="checkbox" id="maxDieci" name="maxDieci" v-model="this.store.filtred.reviews.maxDieci" />
                  <label for="maxDieci"> > 10</label>
                </div>
              </li>
            </ul>
          </div>
        </div>
        <!-- /recensioni  -->

        <!-- bottone cerca  -->
        <div class="col-1 d-flex justify-content-end">
          <button @click.prevent="filtredDoctors" class="btn btn-outline-success flex-grow-1 search-button" type="submit">
            Cerca >
          </button>
        </div>
        <!-- /bottone cerca  -->
      </form>
    </div>
  </nav>
  <div class="alert alert-danger mt-3" :class="message === true ? 'd-block' : 'd-none'" role="alert">
    Seleziona almeno un filtro prima di effettuare la ricerca.
  </div>
</template>

<style scoped lang="scss">
@use "../../style/partials/palette.scss" as *;

.nav-cstm {
  height: 60px;

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
    border-radius: 0 50px 50px 0;
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
</style>
