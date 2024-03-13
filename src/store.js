import { reactive } from "vue";

// Funzione per inizializzare lo store, recuperando i dati dal localStorage se presenti
function initializeStore() {
  const savedStore = localStorage.getItem("store");
  if (savedStore) {
    const parsedStore = JSON.parse(savedStore);
    // Elimina il campo searchKey
    delete parsedStore.doctors.searchKey;
    return parsedStore;
  } else {
    return {
      api: {
        baseUrl: "http://127.0.0.1:8000",
      },
      apiUrls: {
        doctors: "/api/doctors",
      },
      doctors: {
        searchKey: "",
      },
      searchNotFound: false,
      changedSearchbar: false,
      filtred: {
        parametri: {},
        doctors: {
          key: "",
        },
        specializations: {
          ortopedico: "",
          dermatologo: "",
          psicologo: "",
          oculista: "",
          ginecologo: "",
          nutrizionista: "",
          dentista: "",
          cardiologo: "",
          osteopata: "",
          ostetrica: "",
          anestesista: "",
          logopedista: "",
        },
        votes: {
          voteValue: 0,
        },
        reviews: {
          reviewValue: 0,
        },
      },
      imgUrl: "http://127.0.0.1:8000/storage/",
      sponsoredDoctors: [],
      next: null,
      advancedCards: false,
      advancedDoctors: false,
    };
  }
}

export const store = reactive(initializeStore());

// Funzione per salvare lo store nel localStorage
function saveStore() {
  localStorage.setItem("store", JSON.stringify(store));
}

// Aggiungere un event listener per il beforeunload per salvare lo store prima del refresh
window.addEventListener("beforeunload", saveStore);
