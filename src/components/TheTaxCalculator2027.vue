<script setup>
import { ref } from 'vue'
import TheIncomeTable from "@/components/TheIncomeTable.vue";
import TheInvestmentTable from "@/components/TheInvestmentTable.vue";
import TheGeneralInfo from "@/components/TheGeneralInfo.vue";
import TheEarningSummary from "@/components/TheEarningSummary.vue";
import TheIncomeTaxSlab2027 from "@/components/TheIncomeTaxSlab2027.vue";
import TheRebateCalculation2027 from "@/components/TheRebateCalculation2027.vue";
import TheRebateInformation from "@/components/TheRebateInformation.vue";

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
        <the-income-tax-slab2027
          :gender="gender"
          :totalGrossPay="totalGrossPay"
          :totalInvestment="totalInvestment"
        />
        <the-rebate-calculation2027
          :advanceIncomeTax="advanceIncomeTax"
          :gender="gender"
          :totalGrossPay="totalGrossPay"
          :totalInvestment="totalInvestment"
        />
      </div>
    </div>
    <div class="row mb-3">
      <div class="col-12">
        <the-rebate-information
          :totalGrossPay="totalGrossPay"
          taxYear="2026-2027"
        />
      </div>
    </div>
  </div>
</template>

<style scoped>
/* Component-specific styles can be added here if needed */
</style>
