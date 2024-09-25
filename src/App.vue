

<script setup>
import { ref } from 'vue'
import NavBar from "@/components/TheNavbar.vue";
import TheIncomeTable from "@/components/TheIncomeTable.vue";
import TheInvestmentTable from "@/components/TheInvestmentTable.vue";
import TheTaxCalculationSummary from "@/components/TheTaxCalculationSummary.vue";
import TheGeneralInfo from "@/components/TheGeneralInfo.vue";

const totalGrossPay = ref(0)
const totalInvestment = ref(0)
const gender = ref("male")

const updateTotalGrossPay = (newValue) => {
  totalGrossPay.value = newValue
}
const updateGender = (newValue) => {
  gender.value = newValue
}

const updateTotalInvestment = (newValue) => {
  totalInvestment.value = newValue
}
</script>

<template>
  <div>

    <div class="container">

      <NavBar />

      <hr class="my-4">

      <div class="row mb-3 text-center">
        <the-general-info @update:gender="updateGender"/>
      </div>

      <div class="row mb-3">
        <div class="col-4">
          <the-income-table @update:totalGrossPay="updateTotalGrossPay"/>
        </div>
        <div class="col-4">
          <the-investment-table @update:totalInvestment="updateTotalInvestment"/>
        </div>
        <div class="col-4">
          <the-tax-calculation-summary
              :gender="gender"
              :totalGrossPay="totalGrossPay"
              :totalInvestment="totalInvestment"
          />
        </div>
      </div>
</div>
  </div>
  <main>
    This is header
  </main>
</template>

<style scoped>

</style>
