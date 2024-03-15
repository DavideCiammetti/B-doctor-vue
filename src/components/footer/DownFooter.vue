<script>
export default {
  name: "DownFooter",
};
</script>

<template>
  <div class="hr-container">
    <hr class="hr-line" />
  </div>
  <div class="col-12 col-md-8 mx-auto text-center mt-3">
    <span>Copyright © 2024 BDoctors, tutti i diritti riservati.</span>
  </div>
</template>

<style scoped lang="scss">
@use "../../style/partials/palette.scss" as *;

.hr-container {
  display: flex;
  justify-content: center;
}

.hr-line {
  width: 100%; // Lunghezza iniziale per mobile

  @media (min-width: 992px) {
    // Desktop
    width: 90%;
  }
}
</style>
