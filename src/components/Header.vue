<script>
import UpHeader from "./header/UpHeader.vue";
import DownHeader from "./header/DownHeader.vue";
import { store } from "../store";
export default {
  name: "Header",
  components: {
    UpHeader,
    DownHeader,
  },
  data() {
    return {
      store,
    };
  },
};
</script>

<template>
  <header :class="$route.name !== 'home' ? 'h-500' : ''" class="app-header">
    <UpHeader />
    <DownHeader />
  </header>
</template>

<style lang="scss">
@use "../style/partials/palette.scss" as *;

.app-header {
  height: auto;
  background: rgb(20, 184, 159);
  background: linear-gradient(
    140deg,
    rgba(20, 184, 159, 1) 15%,
    rgba(15, 118, 106, 1) 100%
  );
  border-bottom-left-radius: 1.875rem;
  border-bottom-right-radius: 1.875rem;
  color: white;
  box-shadow: 0px 10px 15px rgba(0, 0, 0, 0.4);
}

.h-500 {
  padding-bottom: 30px;

  @media (max-width: 768px) {
    margin-bottom: 0;
    padding-bottom: 0;
    height: 320px;
  }
}
</style>
