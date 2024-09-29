<script setup>
import {ref} from 'vue'
import NavBar from "@/components/TheNavbar.vue";
import TheIncomeTable from "@/components/TheIncomeTable.vue";
import TheInvestmentTable from "@/components/TheInvestmentTable.vue";
import TheTaxCalculationSummary from "@/components/TheTaxCalculationSummary.vue";
import TheGeneralInfo from "@/components/TheGeneralInfo.vue";
import TheIncomeInvestmentSummary from "@/components/TheEarningSummary.vue";
import TheEarningSummary from "@/components/TheEarningSummary.vue";
import TheIncomeTaxSlab from "@/components/TheIncomeTaxSlab.vue";
import TheRebateCalculation from "@/components/TheRebateCalculation.vue";

const totalGrossPay = ref(0)
const totalInvestment = ref(0)
const gender = ref("male")
const advanceIncomeTax = ref(0)

const updateTotalGrossPay = (newValue) => {
  totalGrossPay.value = newValue
}
const updateGender = (newValue) => {
  gender.value = newValue
}

const updateTotalInvestment = (newValue) => {
  totalInvestment.value = newValue
}

const updateAdvanceIncomeTax = (newValue) => {
  advanceIncomeTax.value = newValue
}
</script>

<template>
  <div>
    <div class="container">
      <hr class="my-4">

      <div class="row mb-3">
        <div class="col-12">
          <the-general-info @update:gender="updateGender"/>
        </div>
      </div>

      <div class="row mb-3">
        <div class="col-lg-4 col-md-6 mb-3">
          <the-income-table
              @update:totalGrossPay="updateTotalGrossPay"
              @update:advanceIncomeTax="updateAdvanceIncomeTax"
          />
        </div>
        <div class="col-lg-4 col-md-6 mb-3">
          <the-investment-table
              @update:totalInvestment="updateTotalInvestment"
          />
          <the-earning-summary
              :totalGrossPay="totalGrossPay"
              :totalInvestment="totalInvestment"
          />
        </div>
        <div class="col-lg-4 col-md-12 mb-3">
          <the-income-tax-slab
              :gender="gender"
              :totalGrossPay="totalGrossPay"
              :totalInvestment="totalInvestment"
          />
          <the-rebate-calculation
              :gender="gender"
              :totalGrossPay="totalGrossPay"
              :totalInvestment="totalInvestment"
              :advanceIncomeTax="advanceIncomeTax"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>