<script>
import MainCards from "./MainCards.vue";
import InfoSectionGreen from "./InfoSectionGreen.vue";
export default {
  name: "SponsorshipHome",
  components: {
    MainCards,
    InfoSectionGreen,
  },
};
</script>

<template>
  <section
    id="sponsorship-sec"
    class="mt-4 mb-4 d-flex flex-column align-items-center"
  >
    <MainCards />
    <InfoSectionGreen />
  </section>
</template>

<style scoped lang="scss">
@use "../../style/partials/palette.scss" as *;

/*
        UTILITY
    */
.title-col {
  color: $blue-950;
  font-size: 20px;
}
</style>
