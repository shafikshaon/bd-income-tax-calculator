<script setup>
import { ref, computed } from 'vue'
import PdfDownloadButton from "@/components/ThePdfDownloadButton.vue";

const convertToNumber = (value) => {
  if (value === '' || value === null || value === undefined) {
    return 0;
  }
  return Number(value);
};

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

const rebateCalculation = computed(() => {
  const threePercentOfTaxableIncome = taxableIncome.value * 0.03
  const fifteenPercentOfInvestment = props.totalInvestment * 0.15
  const tenLakhBDT = 1000000

  return Math.min(threePercentOfTaxableIncome, fifteenPercentOfInvestment, tenLakhBDT)
})

const totalRebate = computed(() => {
  return convertToNumber(rebateCalculation.value) + convertToNumber(props.advanceIncomeTax)
})

const netTax = computed(() => {
  return Math.max(calculateTax.value.totalTax - totalRebate.value, 0)
})

const formatNumber = (num) => num.toLocaleString()
</script>

<template>
  <div class="card border-primary mb-3">
    <div class="card-header">Rebate Calculation</div>
    <div class="card-body">
  <div class="tax-calculation-summary table-responsive">
    <table class="table table-sm table-bordered">
      <tbody>
      <tr>
        <td>3% of Taxable Income</td>
        <td class="text-end">{{ formatNumber(taxableIncome * 0.03) }}</td>
      </tr>
      <tr>
        <td>Investments's 15%</td>
        <td class="text-end">{{ formatNumber(props.totalInvestment * 0.15) }}</td>
      </tr>
      <tr>
        <td>10,00,000 BDT</td>
        <td class="text-end">1,000,000</td>
      </tr>
      <tr class="table-info">
        <td><strong>Lowest</strong></td>
        <td class="text-end"><strong>{{ formatNumber(rebateCalculation) }}</strong></td>
      </tr>
      <tr>
        <td colspan="2">
          <small class="text-muted">Lowest of the above three will be considered rebate. If you must invest.</small>
        </td>
      </tr>
      <tr>
        <td>Advance Income Tax</td>
        <td class="text-end">{{ formatNumber(advanceIncomeTax) }}</td>
      </tr>
      <tr class="table-success">
        <td><strong>Total Rebate</strong></td>
        <td class="text-end"><strong>{{ formatNumber(totalRebate) }}</strong></td>
      </tr>
      </tbody>
    </table>

    <h3 class="mt-4">Net Tax</h3>
    <div class="alert alert-primary">
      <strong>Net Tax: {{ formatNumber(netTax) }}</strong>
    </div>

    <div class="text-center mt-4">
      <PdfDownloadButton />
    </div>
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