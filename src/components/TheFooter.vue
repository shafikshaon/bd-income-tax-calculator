<template>
  <footer class="footer mt-auto py-3 bg-light">
    <div class="container text-center">
      <span class="text-muted">
        &copy; {{ currentYear }} BD Income Tax Calculator. All rights reserved.
      </span>
    </div>
  </footer>
</template>

<script>
export default {
  name: 'Footer',
  computed: {
    currentYear() {
      return new Date().getFullYear();
    }
  }
}
</script>

<style scoped>
.footer {
  bottom: 0;
  width: 100%;
}
</style>