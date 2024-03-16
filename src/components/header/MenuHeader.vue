<script>
export default {
  name: "MenuHeader",
};
</script>

<template>
  <!-- Hamburger mobile -->
  <div class="hamburger-menu d-block d-lg-none align-items-center">
    <div class="dropdown d-flex align-items-center">
      <button
        class="btn btn-sm btn-green dropdown-toggle"
        type="button"
        id="dropdownMenuButton"
        data-bs-toggle="dropdown"
        aria-expanded="false"
      >
        <font-awesome-icon icon="fa-solid fa-bars" />
      </button>
      <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton">
        <li>
          <a class="dropdown-item" href="#">Visualizza Dottori</a>
        </li>
        <li><a class="dropdown-item" href="#">Centro Assistenza</a></li>
        <li>
          <a class="dropdown-item" href="http://127.0.0.1:8000/register"
            >Registrati</a
          >
        </li>
        <li>
          <a class="dropdown-item" href="http://127.0.0.1:8000/login">Accedi</a>
        </li>
      </ul>
    </div>
  </div>

  <!-- Menu schermi grandi -->
  <div class="menu-items d-none d-lg-block d-flex my-auto">
    <ul class="d-flex gap-4 list-unstyled my-auto align-items-center">
      <li>
        <font-awesome-icon icon="fa-regular fa-circle-question" /> Centro
        Assistenza
      </li>
      <li>
        <div class="d-flex align-items-center me-2">
          <font-awesome-icon
            icon="fa-solid fa-arrow-right-to-bracket"
            class="pe-2"
          />
          <a
            class="dropdown-item"
            href="http://127.0.0.1:8000/login"
            target="_blank"
            >Accedi</a
          >
        </div>
      </li>
      <li>
        <div class="d-flex align-items-center">
          <font-awesome-icon icon="fa-solid fa-address-card" class="pe-2" />
          <a
            class="dropdown-item"
            href="http://127.0.0.1:8000/register"
            target="_blank"
            >Registrati</a
          >
        </div>
      </li>
    </ul>
  </div>
</template>

<style scoped lang="scss">
@use "../../style/partials/palette.scss" as *;

.hamburger-menu {
  font-size: 1.875rem;
}

div.d-flex {
  span:first-child {
    font-size: 0.75rem;
  }

  span:last-child {
    font-size: 0.625rem;
    color: gainsboro;
  }
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
  content: none;
}
</style>
