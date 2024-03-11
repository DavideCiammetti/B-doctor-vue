<script>
import { store } from "../../store.js";
import axios from 'axios';

export default {
    name: 'MainCards',
    data() {
        return {
            // sponsBaseColor: '#CD7F32', // Bronzo
            // sponsStandardColor: '#C0C0C0', // Argento
            // sponsPremiumColor: '#FFD700', // Oro
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
        // sponsorshipBorderColor(sponsorshipId) {
        //     switch (sponsorshipId) {
        //         case 1:
        //             return 'bronze-border'; // bronzo
        //         case 2:
        //             return 'silver-border'; // argento
        //         case 3:
        //             return 'gold-border'; // oro
        //         default:
        //             return 'default-border';
        //     }
        // },
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
    <div class="d-md-flex gap-5 mt-5 flex-wrap justify-content-center">
        <div v-for="(doctor, index) in sponsoredDoctors" :key="index" class="doctor-container position-relative">
            <!-- Badge -->
            <!-- <div class="position-absolute top-0 start-0 ms-2 mt-1">
                <span v-if="doctor.sponsorship_id === 1" class="badge badge-bg-base">Base</span>
                <span v-else-if="doctor.sponsorship_id === 2" class="badge badge-bg-standard">Standard</span>
                <span v-else-if="doctor.sponsorship_id === 3" class="badge badge-bg-premium">Premium</span>
            </div> -->
            <div class="img-container">
                <!-- immagine -->
                <!-- <img :src="'http://127.0.0.1:8000/storage/' + doctor.doctor_img" alt="doctor image" class="round-img"> -->
                <img :src="`${imgUrl}/${doctor.doctor_img}`" :alt="`${doctor.user.name} ${doctor.user.surname} image`"
                    class="round-img">
            </div>
            <div class="position-absolute info-doctor-container d-flex justify-content-center align-items-center p-0">
                <div class="info-doctor text-start width-80">
                    <!-- :class="sponsorshipBorderColor(doctor.sponsorship_id)" -->
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

    // .badge.badge-bg-premium {
    //     background-color: $spons-premium;
    // }

    // .badge.badge-bg-standard {
    //     background-color: $spons-standard;
    // }

    // .badge.badge-bg-base {
    //     background-color: $spons-base;
    // }

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
    // padding: 20px;

    .info-doctor {
        background-color: rgba(13, 148, 129, 0.8);
        border-radius: 20px;
        border-color: #0d9482;
        padding-left: 10px;
        border-width: 4px;
        border-style: solid;
        padding-left: 10px;

        // &.bronze-border {
        //     border-color: $spons-base; // Bronzo
        // }

        // &.silver-border {
        //     border-color: $spons-standard; // Argento
        // }

        // &.gold-border {
        //     border-color: $spons-premium; // Oro
        // }

        // &.default-border {
        //     border-color: #0d9482; // Colore predefinito
        // }

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

    // .width-80 {
    //     width: 80%;
    // }
}
</style>