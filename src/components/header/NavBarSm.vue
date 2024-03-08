<script>
import {store} from '../../store.js'
import axios from 'axios';
export default {
    name: 'DownHeader',
    data(){
        return{
            store,
        }
    },
    methods:{
    // chiamata axios per ricerca base dottori con validazioni
    getDoctors(){
        const validRegex = /^[a-zA-Z\s]+$/;
        const maxThree = document.querySelector(".max-three");
        const onlyLetters = document.querySelector(".only-letters");

        // valido campo ricerca base che abbia più di 3 caratteri
       if(this.store.doctors.searchKey.trim().length < 3){

            this.store.doctor = {};
            maxThree.classList.remove("d-none");
            console.log('la ricerca deve avere più di 3 caratteri');

        //valido campo ricerca base che non contenga numeri o caratteri speciali 
       }else if(!validRegex.test(this.store.doctors.searchKey)){
        
            this.store.doctor = {};
            onlyLetters.classList.remove("d-none");
            console.log('la ricerca deve contenere solo lettere');

            // chiamata axios ricerca base dottori per specializzazione
       }else{
            onlyLetters.classList.add("d-none");
            maxThree.classList.add("d-none");
            axios.get(this.store.api.baseUrl + this.store.apiUrls.doctors, {
            params:{
                key: this.store.doctors.searchKey,
            },
        }).then((response)=>{
            this.store.doctor = response.data.results;
            console.log(this.store.doctor);
            // ricerca che non produce risultati
            if( this.store.doctor.length === 0){
                this.store.searchNotFound = true;
                this.$router.push('/notFound');
            }else{
                this.store.searchNotFound = false;
                this.store.doctors.searchKey = '';
                this.$router.push('/ricerca-avanzata');
            }
            }).catch((error)=>{
                console.log(error);
                this.store.doctor.results = [];
            });
        }
        },
    },
    created(){
       
    },
}
</script>

<template>
    <nav class="navbar navbar-light rounded-pill nav-cstm p-0">
        <div class="container-fluid pe-0">
            <form class="d-flex align-items-center p-0 custom-search-bar" @submit.prevent="getDoctors">
                <div class="search-icon">
                    <font-awesome-icon icon="fa-solid fa-magnifying-glass" />
                </div>
                <input class="form-control me-2 search-input" type="search"
                    placeholder="Cerca dottore, specializzazione, ..." aria-label="Search" v-model="this.store.doctors.searchKey">
                <button class="btn btn-outline-success search-button" type="submit">Cerca</button>
            </form>
        </div>
        <div>
            <p class="m-0 text-warning ms-4 pt-1 max-three d-none">la ricerca deve contenere almeno 3 caratteri</p>
            <p class="m-0 text-warning ms-4 only-letters d-none">la ricerca non può contenere numeri o caratteri speciali</p>
        </div>
    </nav>
</template>

<style scoped lang="scss">
@use'../../style/partials/palette.scss' as *;

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
        border: .125rem solid white;
        border-radius: 1.5625rem;
        display: flex;
        align-items: center;
        padding: 0 .9375rem;

        .search-icon {
            background-color: white;
            color: black;
            padding: .5rem;
            border-right: none;
            border-top-left-radius: .3125rem;
            border-bottom-left-radius: .3125rem;
        }

        .search-input {
            border: none;
            flex-grow: 1;
            padding: .5rem;
            background-color: white;
            color: black;
            margin-left: .625rem;
        }
        .search-button {
            width: 70%;
            height: 90%;
            background-color: #00264C;
            color: white;
            border-color: #00264C;
            border-top-right-radius: 1.5625rem;
            border-bottom-right-radius: 1.5625rem;
            padding: .25rem .9375rem;
            font-size: .75rem;

            @media (min-width: 768px) {
                width: 50%;
                padding-top: .9375rem;
                padding-bottom: .9375rem;
                margin-right: .25rem;
            }

            @media (min-width: 992px) {
                width: 20%;
                padding-top: .9375rem;
                padding-bottom: .9375rem;
                margin-right: .25rem;
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