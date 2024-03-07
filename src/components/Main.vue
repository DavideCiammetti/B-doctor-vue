<script>
import { RouterView } from "vue-router";

import InfoHome from "./MainComponents/InfoHome.vue";
import SponsorshipHome from "./MainComponents/SponsorshipHome.vue";
export default {
  name: "Main",
  components: {
    InfoHome,
    SponsorshipHome,
    RouterView,
  },
};
</script>

<template>
  <!-- <main class="mt-3 d-flex align-items-center flex-column">
        <InfoHome />
        <SponsorshipHome/>
    </main> -->
  <router-view></router-view>
</template>

<style scoped lang="scss">
@use "../style/partials/palette.scss" as *;
</style>
