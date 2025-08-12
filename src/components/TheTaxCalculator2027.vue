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

const formatNumber = (num) => num.toLocaleString()
</script>

<template>
  <div>
    <div class="row mb-3">
      <div class="col-12">
        <the-general-info @update:gender="updateGender"/>
      </div>
    </div>

    <!-- TDS/Taxable Income Summary -->
    <div class="row mb-3" v-if="totalGrossPay > 0">
      <div class="col-12">
        <div class="card border-warning">
          <div class="card-header bg-warning text-dark">
            <strong><i class="fas fa-calculator"></i> Taxable Income Calculation (2026-2027)</strong>
          </div>
          <div class="card-body">
            <div class="row text-center">
              <div class="col-md-3">
                <h6 class="text-muted mb-1">Total Gross Income</h6>
                <h5 class="text-dark mb-0">৳{{ formatNumber(totalGrossPay) }}</h5>
              </div>
              <div class="col-md-1 d-flex align-items-center justify-content-center">
                <span class="text-muted">−</span>
              </div>
              <div class="col-md-3">
                <h6 class="text-muted mb-1">Tax-Free Income</h6>
                <small class="text-muted">(1/3rd or max ৳5,00,000)</small>
                <h5 class="text-success mb-0">৳{{ formatNumber(Math.min(Math.floor(totalGrossPay / 3), 500000)) }}</h5>
              </div>
              <div class="col-md-1 d-flex align-items-center justify-content-center">
                <span class="text-muted">=</span>
              </div>
              <div class="col-md-4">
                <h6 class="text-muted mb-1">Taxable Income</h6>
                <small class="text-muted">(Subject to tax calculation)</small>
                <h4 class="text-primary mb-0">৳{{ formatNumber(totalGrossPay - Math.min(Math.floor(totalGrossPay / 3), 500000)) }}</h4>
              </div>
            </div>
          </div>
        </div>
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
          :totalInvestment="totalInvestment"
          taxYear="2026-2027"
        />
      </div>
    </div>
  </div>
</template>

<style scoped>
/* Component-specific styles can be added here if needed */
</style>
