<script>
import { store } from "../../store.js";
import axios from 'axios';

export default {
    data() {
        return {
            sponsoredDoctors: {}, // Risultati della ricerca paginati
        };
    },
    computed: {
        // Ottieni la lista dei dottori per la pagina corrente
        paginatedDoctors() {
            return sponsoredDoctors.data || [];
        },
    },
    methods: {
        // Ottieni i dottori sponsorizzati per la pagina corrente
        getPaginatedDoctors(page) {
            axios
                .get(store.state.api.baseUrl + "/api/sponsor?page=" + page)
                .then((response) => {
                    this.sponsoredDoctors = response.data.results;
                })
                .catch((error) => {
                    console.log(error);
                });
        },
        // Reindirizza alla pagina di dettaglio del dottore
        redirectToDoctorDetail(slug) {
            this.$router.push({ name: "doctor-detail", params: { slug: slug } });
        },
    },
    created() {
        this.getPaginatedDoctors(1); // Carica i risultati della prima pagina all'avvio del componente
    },
};
</script>

<template>
    <div class="d-md-flex gap-5 mt-5 flex-wrap justify-content-center">
        <div v-for="(doctor, index) in paginatedDoctors" :key="index" class="doctor-container position-relative">
            <!-- Contenuto della card -->
            <div class="img-container">
                <!-- Immagine -->
                <img :src="`${imgUrl}/${doctor.doctor_img}`" :alt="`${doctor.user.name} ${doctor.user.surname} image`"
                    class="round-img">
            </div>
            <div class="position-absolute info-doctor-container d-flex justify-content-center align-items-center p-0">
                <div class="info-doctor text-start width-80">
                    <!-- Nome e cognome del dottore -->
                    <p class="m-0 text-white font-s-15 fw-medium md-1">{{ doctor.user.name }} {{ doctor.user.surname }}</p>
                    <!-- Specializzazioni del dottore -->
                    <p class="m-0 text-white font-s-13 md-1">
                        <span v-for="(specialization, index) in doctor.specializations" :key="index">
                            {{ specialization.title }}
                            <span v-if="index < doctor.specializations.length - 1">, </span>
                        </span>
                    </p>
                    <!-- Indirizzo -->
                    <p class="m-0 text-white font-s-13 md-1">
                        <font-awesome-icon icon="fa-solid fa-location-dot" />
                        {{ doctor.address }}
                    </p>
                    <!-- Recensioni -->
                    <p class="m-0 text-white font-s-13 md-1">{{ doctor.reviews.length }} Recensioni</p>
                    <!-- Dettaglio -->
                    <p @click="redirectToDoctorDetail(doctor.slug)" class="col-grey dettaglio m-0 font-s-13 md-1">Dettaglio
                    </p>
                </div>
            </div>
        </div>
    </div>
    <!-- Paginazione -->
    <nav aria-label="Pagination" v-if="sponsoredDoctors.last_page > 1">
        <ul class="pagination justify-content-center mt-3">
            <li class="page-item" :class="{ disabled: sponsoredDoctors.current_page === 1 }">
                <button class="page-link" @click="getPaginatedDoctors(sponsoredDoctors.current_page - 1)">Previous</button>
            </li>
            <li class="page-item" :class="{ disabled: sponsoredDoctors.current_page === sponsoredDoctors.last_page }">
                <button class="page-link" @click="getPaginatedDoctors(sponsoredDoctors.current_page + 1)">Next</button>
            </li>
        </ul>
    </nav>
</template>

<style scoped lang="scss">
/* Stili per le card dei dottori */
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

/* Stili per la paginazione */
.pagination {
    display: flex;
    justify-content: center;
    list-style: none;
}

.page-item {
    margin: 0 2px;
}

.page-link {
    cursor: pointer;
    background-color: #007bff;
    border: 1px solid #007bff;
    color: #fff;
}

.page-link:hover {
    background-color: #0056b3;
}

.page-link:focus {
    box-shadow: 0 0 0 0.2rem rgba(0, 123, 255, 0.5);
}

.page-item.disabled .page-link {
    pointer-events: none;
    background-color: #6c757d;
    border-color: #6c757d;
}

.page-item.disabled .page-link:hover {
    background-color: #6c757d;
}

.page-item.disabled .page-link:focus {
    box-shadow: none;
}
</style>