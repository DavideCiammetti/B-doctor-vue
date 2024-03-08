<script>
import InfoHome from "./../components/MainComponents/InfoHome.vue";
import SponsorshipHome from "./../components/MainComponents/SponsorshipHome.vue";
export default {
  name: "HomePage",
  components: {
    InfoHome,
    SponsorshipHome,
  },
};
</script>

<template>
  <main class="mt-3 d-flex align-items-center flex-column py-5">
    <InfoHome />
    <SponsorshipHome />
  </main>
</template>

<style scoped lang="scss">
@use "../style/partials/palette.scss" as *;
</style>
