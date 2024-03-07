<script>
export default {
    name: 'NavBarLg',
}
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
                    <input class="form-control me-1 p-0 with-border" type="search" placeholder="Ricerca..."
                        aria-label="Search">
                </div>
                <!-- /ricerca  -->

                <!-- specializzazione  -->
                <div class="flex-grow-1 d-flex gap-1 align-items-center align-content-center">
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
                                    <input type="checkbox" id="checkbox1" name="checkbox1" value="value1">
                                    <label for="checkbox1">Ortopedico</label>
                                </div>
                            </li>
                            <li>
                                <div class="d-flex align-iitems-center gap-2 p-1">
                                    <input type="checkbox" id="checkbox2" name="checkbox2" value="value2">
                                    <label for="checkbox2">Dermatologo</label>
                                </div>
                            </li>
                            <li>
                                <div class="d-flex align-iitems-center gap-2 p-1">
                                    <input type="checkbox" id="checkbox3" name="checkbox3" value="value3">
                                    <label for="checkbox3">Psicologo</label>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>
                <!-- /specializzazione  -->

                <!-- recensione  -->
                <div class="flex-grow-1 d-flex gap-1 align-items-center">
                    <span class="input-group-text bg-white p-0" id="basic-addon3">
                        <font-awesome-icon icon="fa-regular fa-star" />
                    </span>
                    <div class="dropdown">
                        <button class="btn btn-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown"
                            aria-expanded="false">
                            Recensione
                        </button>
                        <ul class="dropdown-menu">
                            <li>
                                <div class="d-flex align-iitems-center gap-2 p-1">
                                    <input type="checkbox" id="checkbox1" name="checkbox1" value="value1">
                                    <label for="checkbox1">Scarso</label>
                                </div>
                            </li>
                            <li>
                                <div class="d-flex align-iitems-center gap-2 p-1">
                                    <input type="checkbox" id="checkbox2" name="checkbox2" value="value2">
                                    <label for="checkbox2">Sufficiente</label>
                                </div>
                            </li>
                            <li>
                                <div class="d-flex align-iitems-center gap-2 p-1">
                                    <input type="checkbox" id="checkbox2" name="checkbox3" value="value3">
                                    <label for="checkbox3">Buono</label>
                                </div>
                            </li>
                            <li>
                                <div class="d-flex align-iitems-center gap-2 p-1">
                                    <input type="checkbox" id="checkbox4" name="checkbox2" value="value4">
                                    <label for="checkbox4">Discreto</label>
                                </div>
                            </li>
                            <li>
                                <div class="d-flex align-iitems-center gap-2 p-1">
                                    <input type="checkbox" id="checkbox5" name="checkbox2" value="value5">
                                    <label for="checkbox5">Ottimo</label>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>
                <!-- /recensione  -->

                <!-- dove  -->
                <div class="flex-grow-1 d-flex gap-1">
                    <span class="input-group-text rounded-pill rounded-end bg-white p-0" id="basic-addon4">
                        <font-awesome-icon icon="fa-solid fa-location-dot" />
                    </span>
                    <input class="form-control me-1 p-0 with-border" type="search" placeholder="Dove?" aria-label="Search">
                </div>
                <!-- /dove  -->

                <!-- bottone cerca  -->
                <div class="col-1 d-flex justify-content-end">
                    <button class="btn btn-outline-success flex-grow-1 search-button" type="submit">Cerca ></button>
                </div>
                <!-- /bottone cerca  -->

            </form>
        </div>
    </nav>
    <div><br></div>
</template>


<style scoped lang="scss">
@use '../../style/partials/palette.scss' as *;

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

    button.btn.btn-secondary.dropdown-toggle {
        background-color: white;
        border: none;
        color: black;
    }

    // bottone
    .search-button {
        background-color: #00264C;
        color: white;
        border-color: #00264C;
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
