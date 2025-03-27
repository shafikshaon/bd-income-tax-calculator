<template>
  <nav class="navbar navbar-expand-lg navbar-light bg-light">
    <div class="container-fluid">
      <a class="navbar-brand" href="/bd-income-tax-calculator">Income Tax Calculator (Bangladesh) / Individual</a>
      <button aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation" class="navbar-toggler"
              data-target="#navbarSupportedContent" data-toggle="collapse" type="button">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div id="navbarSupportedContent" class="collapse navbar-collapse">
        <ul class="navbar-nav ml-auto">
          <li class="nav-item">
            <router-link :to="{ name: 'About' }" active-class="active" class="nav-link">About</router-link>
          </li>
          <li class="nav-item">
            <router-link :to="{ name: 'Data Policy' }" class="nav-link">Data Policy</router-link>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<script>
export default {
  name: 'NavBar',
}
</script>