<script>
export default {
    name: 'MenuHeader',
}
</script>

<template>
    <!-- Hamburger mobile -->
    <div class="hamburger-menu d-block d-lg-none align-items-center">
        <div class="dropdown d-flex align-items-center">
            <button class="btn btn-sm btn-green dropdown-toggle" type="button" id="dropdownMenuButton"
                data-bs-toggle="dropdown" aria-expanded="false">
                <font-awesome-icon icon="fa-solid fa-bars" />
            </button>
            <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton">
                <li><a class="dropdown-item" href="#">Visualizza Dottori</a></li>
                <li><a class="dropdown-item" href="#">Centro Assistenza</a></li>
                <li><a class="dropdown-item" href="#">Accedi</a></li>
            </ul>
        </div>
    </div>

    <!-- Menu schermi grandi -->
    <div class="menu-items d-none d-lg-block d-flex my-auto">
        <ul class="d-flex gap-3 list-unstyled my-auto">
            <li class="btn btn-sm btn-white btn-hover-none">Visualizza elenco Dottori</li>
            <li>Centro Assistenza</li>
            <li>Accedi</li>
        </ul>
    </div>
</template>

<style scoped lang="scss">
@use'../../style/partials/palette.scss' as *;

.hamburger-menu {
    font-size: 1.875rem;
}

.btn-white {
    background-color: white;
}

.btn-green {
    background-color: $green-900;
    color: white;
}

.btn-hover-none:hover {
    color: black !important;
    background-color: white !important;
}

.btn.dropdown-toggle::after {
    content: none; // Nasconde l'icona generata
}
</style>