<script>
import { store } from "../store.js";
import AdvancedCards from "../components/advancedSearchComponents/AdvancedCards.vue";
import SearchNotFound from "../components/advancedSearchComponents/SearchNotFound.vue";
import AdvancedDoctors from "../components/advancedSearchComponents/AdvancedDoctors.vue";

export default {
  name: "AdvancedSearchPage",
  components: {
    AdvancedCards,
    AdvancedDoctors,
    SearchNotFound,
  },
  data() {
    return {
      store,
    };
  },
};
</script>

<template>
  <AdvancedCards v-if="store.advancedCards === true" />
  <AdvancedDoctors v-if="store.advancedDoctors === true" />
  <main v-show="this.store.searchNotFound">
    <SearchNotFound />
  </main>
</template>

<style scoped lang="scss">
@use "../style/partials/palette.scss" as *;
</style>
