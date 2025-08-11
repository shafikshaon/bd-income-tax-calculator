<script setup>
import { ref } from 'vue'
import TheIncomeTable from "@/components/TheIncomeTable.vue";
import TheInvestmentTable from "@/components/TheInvestmentTable.vue";
import TheGeneralInfo from "@/components/TheGeneralInfo.vue";
import TheEarningSummary from "@/components/TheEarningSummary.vue";
import TheIncomeTaxSlab from "@/components/TheIncomeTaxSlab.vue";
import TheRebateCalculation from "@/components/TheRebateCalculation.vue";
import TheTaxCalculator2027 from "@/components/TheTaxCalculator2027.vue";

const activeTab = ref('2025-2026')
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

const setActiveTab = (tab) => {
  activeTab.value = tab
}
</script>

<template>
  <div>
    <div class="container">
      <hr class="my-4">

      <!-- Tax Year Tabs -->
      <div class="row mb-4">
        <div class="col-12">
          <ul class="nav nav-tabs nav-justified" id="taxYearTabs" role="tablist">
            <li class="nav-item" role="presentation">
              <button 
                :class="['nav-link', { active: activeTab === '2025-2026' }]" 
                @click="setActiveTab('2025-2026')"
                type="button"
              >
                Tax Year 2025-2026
              </button>
            </li>
            <li class="nav-item" role="presentation">
              <button 
                :class="['nav-link', { active: activeTab === '2026-2027' }]" 
                @click="setActiveTab('2026-2027')"
                type="button"
              >
                Tax Year 2026-2027
              </button>
            </li>
          </ul>
        </div>
      </div>

      <!-- Tab Content -->
      <div class="tab-content" id="taxYearTabContent">
        <!-- 2025-2026 Tab -->
        <div v-show="activeTab === '2025-2026'" class="tab-pane fade show active">
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
                :advanceIncomeTax="advanceIncomeTax"
                :gender="gender"
                :totalGrossPay="totalGrossPay"
                :totalInvestment="totalInvestment"
              />
            </div>
          </div>
        </div>

        <!-- 2026-2027 Tab -->
        <div v-show="activeTab === '2026-2027'" class="tab-pane fade show active">
          <the-tax-calculator2027 />
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.nav-tabs {
  border-bottom: 2px solid #dee2e6;
}

.nav-tabs .nav-link {
  border: 1px solid transparent;
  border-radius: 0.25rem 0.25rem 0 0;
  color: #495057;
  font-weight: 500;
}

.nav-tabs .nav-link:hover {
  border-color: #e9ecef #e9ecef #dee2e6;
  color: #0056b3;
}

.nav-tabs .nav-link.active {
  color: #495057;
  background-color: #fff;
  border-color: #dee2e6 #dee2e6 #fff;
  font-weight: 600;
}

.tab-content {
  padding-top: 1rem;
}
</style>