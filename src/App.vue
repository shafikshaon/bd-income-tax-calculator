<script setup>
import NavBar from "@/components/TheNavbar.vue";
import Footer from "@/components/TheFooter.vue";

</script>
<template>
  <div>
    <div class="container">
      <NavBar/>
      <router-view></router-view>
      <Footer/>
    </div>
  </div>
</template>

<style scoped>

</style>