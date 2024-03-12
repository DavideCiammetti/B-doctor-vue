import { reactive } from "vue";

export const store = reactive({
  // url base
  api: {
    baseUrl: "http://127.0.0.1:8000",
  },
  // api per ricerca dottori
  apiUrls: {
    doctors: "/api/doctors",
  },
  // chiave per ricerca dottori in ricerca base
  doctors: {
    searchKey: "",
  },
  // oggetto vuoto per ricerca base
  doctor: {},
  // oggetto vuoto per ricerca avanzata
  advancedDoctor: {},
  // errore nella ricerca elemento non trovato
  searchNotFound: false,
  // variabile searchbar
  changedSearchbar: false,
  // invio recenzioni
  apiReviews: "/api/reviews",
  // invio messggio
  apiMessages: "/api/messages",
  // ricerca avanzata
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
  // url immagini
  imgUrl: "http://127.0.0.1:8000/storage/",
  // errore nella ricerca elemento non trovato
  searchNotFound: false,
  // variabile searchbar
  changedSearchbar: false,
  sponsoredDoctors: [],
  next: null,
  // advanced...
  advancedCards: false,
  advancedDoctors: false,
});
