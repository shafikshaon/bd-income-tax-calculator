<script setup>
import { computed } from 'vue'

const props = defineProps({
  totalGrossPay: {
    type: Number,
    required: true
  },
  totalInvestment: {
    type: Number,
    required: true
  },
  gender: {
    type: String,
    required: true
  },
  advanceIncomeTax: {
    type: Number,
    required: true
  }
})

const oneThirdOfTotalEarning = computed(() => Math.floor(props.totalGrossPay / 3))
const maxTaxFreeIncome = 500000
const taxFreeIncome = computed(() => Math.min(oneThirdOfTotalEarning.value, maxTaxFreeIncome))
const taxableIncome = computed(() => props.totalGrossPay - taxFreeIncome.value)

// Official tax slabs for 2026-2027 assessment year from The Daily Ittefaq
// Tax rate: 0% up to Tk 375,000, 10% for next Tk 300,000, 15% for next Tk 400,000, 
// 20% for next Tk 500,000, 25% for next Tk 2,000,000, 30% on balance
const taxSlabs = {
  male: [
    {limit: 375000, rate: 0},      // 0% up to Tk 375,000
    {limit: 300000, rate: 0.10},   // 10% for next Tk 300,000
    {limit: 400000, rate: 0.15},   // 15% for next Tk 400,000
    {limit: 500000, rate: 0.20},   // 20% for next Tk 500,000
    {limit: 2000000, rate: 0.25},  // 25% for next Tk 2,000,000
    {limit: Infinity, rate: 0.30}  // 30% on balance
  ],
  female: [
    {limit: 375000, rate: 0},      // 0% up to Tk 375,000
    {limit: 300000, rate: 0.10},   // 10% for next Tk 300,000
    {limit: 400000, rate: 0.15},   // 15% for next Tk 400,000
    {limit: 500000, rate: 0.20},   // 20% for next Tk 500,000
    {limit: 2000000, rate: 0.25},  // 25% for next Tk 2,000,000
    {limit: Infinity, rate: 0.30}  // 30% on balance
  ],
  specially_abled: [
    {limit: 375000, rate: 0},      // 0% up to Tk 375,000
    {limit: 300000, rate: 0.10},   // 10% for next Tk 300,000
    {limit: 400000, rate: 0.15},   // 15% for next Tk 400,000
    {limit: 500000, rate: 0.20},   // 20% for next Tk 500,000
    {limit: 2000000, rate: 0.25},  // 25% for next Tk 2,000,000
    {limit: Infinity, rate: 0.30}  // 30% on balance
  ],
  freedom_fighter: [
    {limit: 375000, rate: 0},      // 0% up to Tk 375,000
    {limit: 300000, rate: 0.10},   // 10% for next Tk 300,000
    {limit: 400000, rate: 0.15},   // 15% for next Tk 400,000
    {limit: 500000, rate: 0.20},   // 20% for next Tk 500,000
    {limit: 2000000, rate: 0.25},  // 25% for next Tk 2,000,000
    {limit: Infinity, rate: 0.30}  // 30% on balance
  ]
}

const calculateTax = computed(() => {
  let remainingIncome = taxableIncome.value
  let totalTax = 0
  const slabs = taxSlabs[props.gender]

  for (const slab of slabs) {
    if (remainingIncome <= 0) break
    const taxableAmount = Math.min(remainingIncome, slab.limit)
    const taxForSlab = taxableAmount * slab.rate
    totalTax += taxForSlab
    remainingIncome -= taxableAmount
  }

  return totalTax
})

const maxRebate = computed(() => {
  // Maximum rebate is 25% of total investment or 15 lakh, whichever is lower
  return Math.min(props.totalInvestment * 0.25, 1500000)
})

const rebateAmount = computed(() => {
  // Rebate cannot exceed the calculated tax amount
  return Math.min(maxRebate.value, calculateTax.value)
})

const netTaxLiability = computed(() => {
  return Math.max(0, calculateTax.value - rebateAmount.value)
})

const minimumTax = computed(() => {
  // Minimum tax is BDT 5,000 for all taxpayers from 2026-27 assessment year
  if (props.totalGrossPay > 375000) {
    return 5000
  }
  return 0
})

const finalTaxLiability = computed(() => {
  const taxAfterAIT = Math.max(0, netTaxLiability.value - props.advanceIncomeTax)
  // Apply minimum tax if applicable
  return Math.max(taxAfterAIT, minimumTax.value)
})

const formatNumber = (num) => num.toLocaleString()
</script>

<template>
  <div class="card border-success mb-3">
    <div class="card-header bg-success text-white">Tax Calculation Summary (2026-2027)</div>
    <div class="card-body">
      <div class="table-responsive">
        <table class="table table-sm table-bordered">
          <tbody>
          <tr>
            <td><strong>Gross Tax Liability</strong></td>
            <td class="text-end"><strong>{{ formatNumber(calculateTax) }}</strong></td>
          </tr>
          <tr>
            <td>Maximum Rebate (25% of investment or ৳15,00,000)</td>
            <td class="text-end">{{ formatNumber(maxRebate) }}</td>
          </tr>
          <tr>
            <td>Actual Rebate</td>
            <td class="text-end">{{ formatNumber(rebateAmount) }}</td>
          </tr>
          <tr class="table-warning">
            <td><strong>Net Tax Liability</strong></td>
            <td class="text-end"><strong>{{ formatNumber(netTaxLiability) }}</strong></td>
          </tr>
          <tr>
            <td>Advance Income Tax (AIT)</td>
            <td class="text-end">{{ formatNumber(advanceIncomeTax) }}</td>
          </tr>
          <tr v-if="minimumTax > 0">
            <td>Minimum Tax</td>
            <td class="text-end">{{ formatNumber(minimumTax) }}</td>
          </tr>
          <tr class="table-success">
            <td><strong>Final Tax Liability</strong></td>
            <td class="text-end"><strong>{{ formatNumber(finalTaxLiability) }}</strong></td>
          </tr>
          </tbody>
        </table>
      </div>

      <div class="mt-3">
        <div v-if="finalTaxLiability > 0" class="alert alert-warning">
          <strong>Amount to Pay:</strong> ৳{{ formatNumber(finalTaxLiability) }}
        </div>
        <div v-else-if="finalTaxLiability < 0" class="alert alert-info">
          <strong>Refund Expected:</strong> ৳{{ formatNumber(Math.abs(finalTaxLiability)) }}
        </div>
        <div v-else class="alert alert-success">
          <strong>No Tax Liability!</strong> Your advance tax covers your full liability.
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.table {
  margin-bottom: 0.5rem;
}

.text-end {
  text-align: right;
}

.table-success {
  background-color: #d4edda;
}

.table-warning {
  background-color: #fff3cd;
}
</style>
