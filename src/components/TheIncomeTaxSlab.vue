<script setup>
import { ref, computed } from 'vue'

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
const maxTaxFreeIncome = 450000
const taxFreeIncome = computed(() => Math.min(oneThirdOfTotalEarning.value, maxTaxFreeIncome))
const taxableIncome = computed(() => props.totalGrossPay - taxFreeIncome.value)

const taxSlabs = {
  male: [
    { limit: 350000, rate: 0 },
    { limit: 100000, rate: 0.05 },
    { limit: 300000, rate: 0.10 },
    { limit: 400000, rate: 0.15 },
    { limit: 500000, rate: 0.20 },
    { limit: Infinity, rate: 0.25 }
  ],
  female: [
    { limit: 400000, rate: 0 },
    { limit: 100000, rate: 0.05 },
    { limit: 300000, rate: 0.10 },
    { limit: 400000, rate: 0.15 },
    { limit: 500000, rate: 0.20 },
    { limit: Infinity, rate: 0.25 }
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

  return { totalTax, taxDetails }
})


const formatNumber = (num) => num.toLocaleString()
</script>

<template>
  <div class="card border-primary mb-3">
    <div class="card-header">Tax Slab</div>
    <div class="card-body">
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
        <td>{{ index + 1 }}{{ index === calculateTax.taxDetails.length - 1 ? 'th' : ['st', 'nd', 'rd'][index] || 'th' }}</td>
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