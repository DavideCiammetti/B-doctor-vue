<script>
import MenuHeader from "./MenuHeader.vue";
import { store } from "../../store.js";
export default {
  name: "UpHeader",
  components: {
    MenuHeader,
  },
  data() {
    return {
      store,
    };
  },
  methods: {
    // mostra searchbar
    showSearchbar() {
      this.store.changedSearchbar = false;
    },
  },
};
</script>

<template>
  <div
    class="up-header d-flex justify-content-between align-items-center px-4 py-3"
  >
    <div class="logo-img d-flex align-items-center gap-3">
        <div class="logo">
            <router-link
                class="text-white text-decoration-none"
                :to="{ name: 'home' }"
                
                ><img @click="showSearchbar" src="../../../public/img/logo-verde.png" alt="logo-bdoctors"></img></router-link
            >
        </div>
        <h1 class="d-none d-md-block">BDoctors</h1>
    </div>
    <MenuHeader />
  </div>
</template>

<style scoped lang="scss">
@use "../../style/partials/palette.scss" as *;

.up-header {
    h1{
        font-family: "Madimi One";
        font-size: 42px;
        color: $green-900;
        font-weight: bold;
    }

  .logo {
    height: 80px;
    width: 80px;
    img {
      height: 100%;
      width: 100%;
      object-fit: contain;
    }
  }
}
</style>
