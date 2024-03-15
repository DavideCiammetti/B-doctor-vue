<script>
import { store } from "../../store.js";
export default {
  name: "SearchNotFound",
  data() {
    return {
      store,
    };
  },
};
</script>

<template>
  <div class="not-found d-flex align-items-center justify-content-center gap-2">
    <div class="icon">
      <font-awesome-icon :icon="['fas', 'ban']" />
    </div>
    <h2 class="mb-0">Nessun Risultato Trovato</h2>
  </div>
</template>

<style scoped lang="scss">
@use "../../style/partials/palette.scss" as *;

.not-found {
  height: 600px;

  .icon {
    font-size: 40px;
    color: $green-500;
  }
}
</style>
