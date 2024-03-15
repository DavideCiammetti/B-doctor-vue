<script>
import NavBarSm from "./NavBarSm.vue";
export default {
  name: "ContentDHeader",
  components: {
    NavBarSm,
  },
};
</script>

<template>
  <div class="row mx-auto align-items-center justify-content-between pt-3">
    <!-- Colonna sinistra -->
    <div class="col-12 col-md-6">
      <div class="mt-5">
        <h1 class="text-cstm">
          Cerchi appuntamento<br />con un medico specialista?
        </h1>
        <h3 class="text-cstm mt-3">
          <strong>Prenota la tua visista online!</strong>
        </h3>
      </div>
      <NavBarSm />
    </div>
    <!-- Colonna destra -->
    <div class="col-6 d-none d-md-block">
      <div class="image-container">
        <img src="../../assets/img/doctor-home.png" alt="Immagine dottore" />
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
@use "../../style/partials/palette.scss" as *;

.row {
  max-width: 1080px;

  h1.text-cstm {
    @media (min-width: 768px) {
      font-size: 1.75rem;
    }

    @media (min-width: 992px) {
      font-size: 42px;
    }
  }

  h3.text-cstm {
    color: $green-200;
    font-size: 1.125rem;

    @media (min-width: 768px) {
      font-size: 1.375rem;
    }

    @media (min-width: 992px) {
      font-size: 1.625rem;
    }
  }

  .image-container {
    height: 100%;
    width: 100%;

    img {
      height: 100%;
      width: 100%;
      object-fit: cover;
    }
  }
}
</style>
