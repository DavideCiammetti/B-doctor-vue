<script>
import { store } from "../store.js";
import AdvancedCards from "../components/advancedSearchComponents/AdvancedCards.vue";
import SearchNotFound from "../components/advancedSearchComponents/SearchNotFound.vue";

export default {
  name: "AdvancedSearchPage",
  components: {
    AdvancedCards,
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
  <AdvancedCards />
  <main v-show="this.store.searchNotFound">
    <SearchNotFound />
  </main>
</template>

<style scoped lang="scss">
@use "../style/partials/palette.scss" as *;
</style>
