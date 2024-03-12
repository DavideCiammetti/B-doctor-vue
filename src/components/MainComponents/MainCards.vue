<script>
import { store } from "../../store.js";
import axios from 'axios';
import { DOMDirectiveTransforms } from "@vue/compiler-dom";

export default {
    name: 'MainCards',
    data() {
        return {
            store,
            currentPage: 1,
            totalSponsoredDoctors: 0,
        };
    },
    computed: {
        sponsoredDoctors() {
            return store.sponsoredDoctors;
        },
        imgUrl() {
            return store.imgUrl;
        }
    },
    methods: {
        getSponsoredDoctors() {
            axios
                .get(
                    store.api.baseUrl + "/api/sponsor", { params: { page: this.currentPage } }
                )
                .then((response) => {
                    store.sponsoredDoctors = response.data.results.data;
                    store.next = response.data.results.next_page_url;
                    this.totalSponsoredDoctors = response.data.results.total;
                })
                .catch((error) => {
                    console.log(error);
                });
        },
        nextPage() {
            this.currentPage++;
            this.getSponsoredDoctors(this.currentPage);
        },
        prevPage() {
            if (this.currentPage > 1) {
                this.currentPage--;
                this.getSponsoredDoctors(this.currentPage);
            }
        },
        redirectToDoctorDetail(slug) {
            this.$router.push({ name: "doctor-detail", params: { slug: slug } });
        },
    },
    created() {
        this.getSponsoredDoctors();
    },
}
</script>


<template>
    <div class="mb-3">
        <h2 class="title-col fw-bolder">Medici Sponsorizzati {{ totalSponsoredDoctors }}</h2>
    </div>
    <div class="d-md-flex gap-5 mt-5 flex-wrap justify-content-center">
        <div v-for="(doctor, index) in sponsoredDoctors" :key="index" class="doctor-container position-relative">
            <div class="img-container">
                <!-- immagine -->
                <img :src="`${imgUrl}/${doctor.doctor_img}`" :alt="`${doctor.user.name} ${doctor.user.surname} image`"
                    class="round-img">
            </div>
            <div class="position-absolute info-doctor-container d-flex justify-content-center align-items-center p-0">
                <div class="info-doctor text-start width-80">
                    <!-- Nome e cognome del dottore -->
                    <p class="m-0 text-white font-s-15 fw-medium md-1">{{ doctor.user.name }} {{ doctor.user.surname
                    }}</p>
                    <!-- Specializzazioni del dottore -->
                    <p class="m-0 text-white font-s-13 md-1">
                        <span v-for="(specialization, index) in doctor.specializations" :key="index">
                            {{ specialization.title }}
                            <span v-if="index < doctor.specializations.length - 1">, </span>
                        </span>
                    </p>
                    <!-- indirizzo -->
                    <p class="m-0 text-white font-s-13 md-1"><font-awesome-icon icon="fa-solid fa-location-dot" />
                        {{ doctor.address }}</p>
                    <!-- recensioni -->
                    <p class="m-0 text-white font-s-13 md-1">{{ doctor.reviews.length }} Recensioni</p>
                    <!-- dettaglio  -->
                    <p @click="redirectToDoctorDetail(doctor.slug)" class="col-grey dettaglio m-0 font-s-13 md-1">
                        Dettaglio</p>
                </div>
            </div>
        </div>

    </div>

    <div class="pagination-container mt-5 d-flex justify-content-center align-items-center">
        <button @click="prevPage" :disabled="currentPage === 1" class="btn btn-cstm text-white">Precedente</button>
        <span class="mx-2">{{ currentPage }}</span>
        <button @click="nextPage" :disabled="store.next === null" class="btn btn-cstm text-white">Successiva</button>
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


/*
        UTILITY
    */
.width-80 {
    width: 100%;
}

/*
        RESPONSIVITA'
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