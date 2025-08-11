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
  age_group: {
    type: String,
    required: false
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
  const taxDetails = []

  for (const slab of slabs) {
    if (remainingIncome <= 0) break
    const taxableAmount = Math.min(remainingIncome, slab.limit)
    const taxForSlab = taxableAmount * slab.rate
    totalTax += taxForSlab
    remainingIncome -= taxableAmount

    taxDetails.push({
      amount: taxableAmount,
      rate: slab.rate * 100,
      tax: taxForSlab,
      rest: remainingIncome
    })
  }

  return {totalTax, taxDetails}
})

const formatNumber = (num) => num.toLocaleString()
</script>

<template>
  <div class="card border-primary mb-3">
    <div class="card-header">Tax Slab (2026-2027)</div>
    <div class="card-body">
      <!-- Taxable Income Calculation -->
      <div class="alert alert-light mb-3">
        <h6 class="mb-2"><strong>Taxable Income Calculation:</strong></h6>
        <div class="row text-sm">
          <div class="col-6">
            <small class="text-muted">Total Gross Income:</small><br>
            <strong>৳{{ formatNumber(totalGrossPay) }}</strong>
          </div>
          <div class="col-6">
            <small class="text-muted">Tax-Free Income (1/3rd):</small><br>
            <strong>৳{{ formatNumber(taxFreeIncome) }}</strong>
          </div>
        </div>
        <hr class="my-2">
        <div class="text-center">
          <small class="text-muted">Taxable Income</small><br>
          <h6 class="text-primary mb-0"><strong>৳{{ formatNumber(taxableIncome) }}</strong></h6>
        </div>
      </div>

      <div class="tax-calculation-summary table-responsive">
        <table class="table table-sm table-bordered">
          <thead>
          <tr>
            <th>Slab</th>
            <th>Amount</th>
            <th>Rate</th>
            <th>Amount</th>
            <th>Rest</th>
          </tr>
          </thead>
          <tbody>
          <tr v-for="(slab, index) in calculateTax.taxDetails" :key="index">
            <td>{{
                index + 1
              }}{{ index === calculateTax.taxDetails.length - 1 ? 'th' : ['st', 'nd', 'rd'][index] || 'th' }}
            </td>
            <td class="text-end">{{ formatNumber(slab.amount) }}</td>
            <td class="text-end">{{ slab.rate }}%</td>
            <td class="text-end">{{ formatNumber(slab.tax) }}</td>
            <td class="text-end">{{ formatNumber(slab.rest) }}</td>
          </tr>
          </tbody>
          <tfoot>
          <tr class="table-primary">
            <td colspan="3"><strong>Total Tax</strong></td>
            <td class="text-end"><strong>{{ formatNumber(calculateTax.totalTax) }}</strong></td>
            <td></td>
          </tr>
          </tfoot>
        </table>
      </div>
    </div>
  </div>
</template>

<style scoped>
.tax-calculation-summary {
  max-width: 600px;
  margin: 0 auto;
}

.table {
  margin-bottom: 0.5rem;
}

td {
  padding: 0.25rem 0.5rem;
}

.text-end {
  text-align: right;
}

.table-success {
  background-color: #28a745;
  color: white;
}

.text-muted {
  font-size: 0.8em;
}
</style>
