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
const maxTaxFreeIncome = 500000 // Updated for 2026-2027
const taxFreeIncome = computed(() => Math.min(oneThirdOfTotalEarning.value, maxTaxFreeIncome))
const taxableIncome = computed(() => props.totalGrossPay - taxFreeIncome.value)

// Updated tax slabs for 2026-2027
const taxSlabs = {
  male: [
    {limit: 400000, rate: 0},
    {limit: 150000, rate: 0.05},
    {limit: 500000, rate: 0.10},
    {limit: 600000, rate: 0.15},
    {limit: 600000, rate: 0.20},
    {limit: Infinity, rate: 0.25}
  ],
  female: [
    {limit: 450000, rate: 0},
    {limit: 150000, rate: 0.05},
    {limit: 500000, rate: 0.10},
    {limit: 600000, rate: 0.15},
    {limit: 600000, rate: 0.20},
    {limit: Infinity, rate: 0.25}
  ],
  specially_abled: [
    {limit: 525000, rate: 0},
    {limit: 150000, rate: 0.05},
    {limit: 500000, rate: 0.10},
    {limit: 600000, rate: 0.15},
    {limit: 600000, rate: 0.20},
    {limit: Infinity, rate: 0.25}
  ],
  freedom_fighter: [
    {limit: 550000, rate: 0},
    {limit: 150000, rate: 0.05},
    {limit: 500000, rate: 0.10},
    {limit: 600000, rate: 0.15},
    {limit: 600000, rate: 0.20},
    {limit: Infinity, rate: 0.25}
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
  // Maximum rebate is 25% of total investment or 15 lakh, whichever is lower (updated for 2026-2027)
  return Math.min(props.totalInvestment * 0.25, 1500000)
})

const rebateAmount = computed(() => {
  // Rebate cannot exceed the calculated tax amount
  return Math.min(maxRebate.value, calculateTax.value)
})

const netTaxLiability = computed(() => {
  return Math.max(0, calculateTax.value - rebateAmount.value)
})

const finalTaxLiability = computed(() => {
  return Math.max(0, netTaxLiability.value - props.advanceIncomeTax)
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
