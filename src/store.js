import {reactive} from 'vue';

export const store = reactive({
    // url base
    api:{
        baseUrl: 'http://127.0.0.1:8000',
    },
    // api per ricerca dottori
    apiUrls:{
        doctors: '/api/doctors',
    },
    // chiave per ricerca dottori in ricerca base
    doctors:{
        searchKey: '',
    },
    // oggetto vuoto per ricerca base
    doctor:{},
    // url immagini
    imgUrl: 'http://127.0.0.1:8000/storage/',

    // errore nella ricerca elemento non trovato
    searchNotFound: false,
    // variabile searchbar 
    changedSearchbar: false,

});