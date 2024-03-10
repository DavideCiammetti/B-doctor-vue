<script>
import { store } from "../../store.js";
import axios from 'axios';

export default {
    name: 'MainCards',
    data() {
        return {
            sponsBaseColor: '#CD7F32', // Bronzo
            sponsStandardColor: '#C0C0C0', // Argento
            sponsPremiumColor: '#FFD700', // Oro
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
        sponsorshipBorderColor(sponsorshipId) {
            switch (sponsorshipId) {
                case 1:
                    return 'bronze-border'; // bronzo
                case 2:
                    return 'silver-border'; // argento
                case 3:
                    return 'gold-border'; // oro
                default:
                    return 'default-border';
            }
        },
    },
    created() {
        this.getSponsoredDoctors();
    },
}
</script>

<template>
    <div class="d-md-flex gap-5 mt-5 flex-wrap justify-content-center">
        <div v-for="(doctor, index) in sponsoredDoctors" :key="index" class="doctor-container mb-3">
            <div class="img-container">
                <!-- immagine -->
                <!-- <img :src="'http://127.0.0.1:8000/storage/' + doctor.doctor_img" alt="doctor image" class="round-img"> -->
                <img :src="`${imgUrl}/${doctor.doctor_img}`" :alt="`${doctor.user.name} ${doctor.user.surname} image`"
                    class="round-img">
            </div>
            <div class="position-relative info-doctor-container d-flex justify-content-center px-2">
                <div class="info-doctor text-start width-80" :class="sponsorshipBorderColor(doctor.sponsorship_id)">
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
                    <!-- <p @click="showClick(new_doctor)" class="col-grey dettaglio">Dettaglio</p> -->
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped lang="scss">
@use'../../style/partials/palette.scss' as *;

.doctor-container {
    width: 200px;
    height: 200px;

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
    top: -90px;
    padding: 20px;

    .info-doctor {
        background-color: rgba(13, 148, 129, 0.8);
        border-radius: 20px;
        padding-left: 10px;
        border-width: 4px;
        border-style: solid;
        padding-left: 10px;

        &.bronze-border {
            border-color: $spons-base; // Bronzo
        }

        &.silver-border {
            border-color: $spons-standard; // Argento
        }

        &.gold-border {
            border-color: $spons-premium; // Oro
        }

        &.default-border {
            border-color: #0d9482; // Colore predefinito
        }

        .font-s-13 {
            font-size: 13px;
        }

        .font-s-15 {
            font-size: 15px;
        }
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
    }

    .info-doctor-container {
        top: -130px;
        padding: 20px;

        .info-doctor {
            background-color: rgba(13, 148, 129, 0.8);
            border-radius: 20px;
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

    .width-80 {
        width: 80%;
    }
}
</style>