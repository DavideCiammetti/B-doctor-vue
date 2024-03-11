<script>
import { store } from "../../store.js";
import axios from 'axios';

export default {
    name: 'MainCards',
    data() {
        return {
            activeIndex: 0, // Indice del dottore attualmente attivo nel carosello
            numVisibleCards: 1, // Numero di card visibili in base alla larghezza dello schermo
        };
    },
    computed: {
        sponsoredDoctors() {
            return store.sponsoredDoctors;
        },
        imgUrl() {
            return store.imgUrl;
        },
        activeDoctors() {
            let startIdx = this.activeIndex;
            let endIdx = (startIdx + this.numVisibleCards) % this.sponsoredDoctors.length;

            // Se l'endIdx è 0, abbiamo raggiunto l'ultimo elemento dell'array, quindi mostriamo gli ultimi elementi prima di ricominciare dall'inizio
            if (endIdx === this.sponsoredDoctors.length - 1) {
                endIdx = this.sponsoredDoctors.length;
            }

            return this.sponsoredDoctors.slice(startIdx, endIdx);
        }
    },
    methods: {
        getSponsoredDoctors() {
            axios
                .get(
                    store.api.baseUrl +
                    "/api/sponsor"
                )
                .then((response) => {
                    store.sponsoredDoctors = response.data.results;
                })
                .catch((error) => {
                    console.log(error);
                });
        },
        setActiveIndex(index) {
            this.activeIndex = index;
        },
        next() {
            this.activeIndex = (this.activeIndex + 1) % this.sponsoredDoctors.length;
        },
        prev() {
            this.activeIndex = (this.activeIndex - 1 + this.sponsoredDoctors.length) % this.sponsoredDoctors.length;
        },
        redirectToDoctorDetail(slug) {
            this.$router.push({ name: "doctor-detail", params: { slug: slug } });
        },
        updateVisibleCards() {
            if (window.innerWidth < 768) {
                this.numVisibleCards = 1; // Mobile: una card visibile
            } else if (window.innerWidth < 992) {
                this.numVisibleCards = 3; // Tablet: tre card visibili
            } else {
                this.numVisibleCards = 5; // Desktop: cinque card visibili
            }
        }
    },
    created() {
        this.getSponsoredDoctors();
        this.updateVisibleCards(); // Aggiorna il numero di card visibili al caricamento della pagina
        window.addEventListener('resize', this.updateVisibleCards); // Aggiorna il numero di card visibili quando si ridimensiona la finestra
    },
    beforeDestroy() {
        window.removeEventListener('resize', this.updateVisibleCards); // Rimuove l'ascoltatore degli eventi prima di distruggere il componente
    }
}
</script>

<template>
    <div class="d-md-flex gap-5 mt-5 flex-wrap justify-content-center">
        <div v-for="(doctor, index) in activeDoctors" :key="index" class="doctor-container position-relative">
            <!-- Rimuovi il div info-doctor-container e inserisci direttamente il contenuto -->
            <div class="img-container">
                <img :src="`${imgUrl}/${doctor.doctor_img}`" :alt="`${doctor.user.name} ${doctor.user.surname} image`"
                    class="round-img">
            </div>
            <div class="position-absolute info-doctor-container d-flex justify-content-center align-items-center p-0">
                <div class="info-doctor text-start width-80">
                    <p class="m-0 text-white font-s-15 fw-medium md-1">{{ doctor.user.name }} {{ doctor.user.surname }}</p>
                    <p class="m-0 text-white font-s-13 md-1">
                        <span v-for="(specialization, index) in doctor.specializations" :key="index">
                            {{ specialization.title }}
                            <span v-if="index < doctor.specializations.length - 1">, </span>
                        </span>
                    </p>
                    <p class="m-0 text-white font-s-13 md-1"><font-awesome-icon icon="fa-solid fa-location-dot" /> {{
                        doctor.address }}</p>
                    <p class="m-0 text-white font-s-13 md-1">{{ doctor.reviews.length }} Recensioni</p>
                    <p @click="redirectToDoctorDetail(doctor.slug)" class="col-grey dettaglio m-0 font-s-13 md-1">Dettaglio
                    </p>
                </div>
            </div>
        </div>
        <!-- Pulsanti per navigare nel carosello -->
        <div class="d-flex justify-content-between mt-3" v-if="sponsoredDoctors.length > numVisibleCards">
            <button @click="prev">Indietro</button>
            <button @click="next">Avanti</button>
        </div>
    </div>
</template>

<style scoped lang="scss">
@use'../../style/partials/palette.scss' as *;

.doctor-container {
    width: 250px;
    height: 250px;
    margin-bottom: 30px;
    transition: transform 0.3s ease-in-out;

    &:hover {
        transform: scale(1.05);
    }

    .img-container {
        width: 100%;
        height: 100%;

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

        .col-grey {
            color: rgb(169, 169, 169);
        }

        .dettaglio {
            cursor: pointer;
        }
    }
}

.width-80 {
    width: 100%;
}

@media screen and (max-width: 767px) {
    .doctor-container {
        width: 100%;
    }
}

@media screen and (min-width: 768px) and (max-width: 991px) {
    .doctor-container {
        width: calc(100% / 3);
    }
}

@media screen and (min-width: 992px) {
    .doctor-container {
        width: calc(100% / 5);
    }
}
</style>
