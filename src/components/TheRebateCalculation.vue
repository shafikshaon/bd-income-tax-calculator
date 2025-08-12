<script setup>
import { computed } from 'vue'
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
    required: true
  }
})

const oneThirdOfTotalEarning = computed(() => Math.floor(props.totalGrossPay / 3))
const maxTaxFreeIncome = 450000
const taxFreeIncome = computed(() => Math.min(oneThirdOfTotalEarning.value, maxTaxFreeIncome))
const taxableIncome = computed(() => Math.max(0, props.totalGrossPay - taxFreeIncome.value))

// Official tax slabs for 2025-2026 assessment year (matching TheIncomeTaxSlab.vue)
const taxSlabs = {
  male: [
    {limit: 350000, rate: 0},      // First 350,000: 0%
    {limit: 100000, rate: 0.05},   // Next 100,000: 5%
    {limit: 400000, rate: 0.10},   // Next 400,000: 10%
    {limit: 500000, rate: 0.15},   // Next 500,000: 15%
    {limit: 500000, rate: 0.20},   // Next 500,000: 20%
    {limit: Infinity, rate: 0.25}  // Remaining: 25%
  ],
  female: [
    {limit: 400000, rate: 0},      // First 400,000: 0%
    {limit: 100000, rate: 0.05},   // Next 100,000: 5%
    {limit: 400000, rate: 0.10},   // Next 400,000: 10%
    {limit: 500000, rate: 0.15},   // Next 500,000: 15%
    {limit: 500000, rate: 0.20},   // Next 500,000: 20%
    {limit: Infinity, rate: 0.25}  // Remaining: 25%
  ],
  specially_abled: [
    {limit: 475000, rate: 0},      // First 475,000: 0%
    {limit: 100000, rate: 0.05},   // Next 100,000: 5%
    {limit: 400000, rate: 0.10},   // Next 400,000: 10%
    {limit: 500000, rate: 0.15},   // Next 500,000: 15%
    {limit: 500000, rate: 0.20},   // Next 500,000: 20%
    {limit: Infinity, rate: 0.25}  // Remaining: 25%
  ],
  freedom_fighter: [
    {limit: 500000, rate: 0},      // First 500,000: 0%
    {limit: 100000, rate: 0.05},   // Next 100,000: 5%
    {limit: 400000, rate: 0.10},   // Next 400,000: 10%
    {limit: 500000, rate: 0.15},   // Next 500,000: 15%
    {limit: 500000, rate: 0.20},   // Next 500,000: 20%
    {limit: Infinity, rate: 0.25}  // Remaining: 25%
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

const rebateAmount = computed(() => {
  // Bangladesh tax law: Rebate is the lowest of:
  // 1. 3% of taxable income
  // 2. 15% of actual investment 
  // 3. ৳10,00,000 BDT
  const threePercentOfTaxable = Math.round(taxableIncome.value * 0.03)
  const fifteenPercentOfInvestment = Math.round(props.totalInvestment * 0.15)
  const maxLimit = 1000000

  const calculatedRebate = Math.min(threePercentOfTaxable, fifteenPercentOfInvestment, maxLimit)

  // Rebate cannot exceed actual tax liability
  return Math.min(calculatedRebate, calculateTax.value.totalTax)
})

// Remove maxRebate computed property as it's no longer needed

const netTaxLiability = computed(() => {
  return Math.max(0, calculateTax.value.totalTax - rebateAmount.value)
})

const finalTaxLiability = computed(() => {
  return Math.max(0, netTaxLiability.value - props.advanceIncomeTax)
})

// Remove old TDS calculation - now handled in final tax liability

// Format number with parentheses for negative values
const formatNumber = (num) => {
  if (num < 0) {
    return `(${Math.abs(num).toLocaleString()})`
  }
  return num.toLocaleString()
}
</script>

<template>
  <div class="card border-primary mb-3">
    <div class="card-header">Rebate Calculation (2025-2026)</div>
    <div class="card-body">
      <div class="tax-calculation-summary table-responsive">
        <table class="table table-sm table-bordered">
          <tbody>
          <tr>
            <td><strong>Gross Tax Liability</strong></td>
            <td class="text-end"><strong>{{ formatNumber(calculateTax.totalTax) }}</strong></td>
          </tr>
          <tr>
            <td>3% of Taxable Income</td>
            <td class="text-end">{{ formatNumber(Math.round(taxableIncome * 0.03)) }}</td>
          </tr>
          <tr>
            <td>Investment's 15%</td>
            <td class="text-end">{{ formatNumber(Math.round(props.totalInvestment * 0.15)) }}</td>
          </tr>
          <tr>
            <td>10,00,000 BDT</td>
            <td class="text-end">{{ formatNumber(1000000) }}</td>
          </tr>
          <tr>
            <td><strong>Lowest</strong></td>
            <td class="text-end"><strong>{{ formatNumber(Math.min(Math.round(taxableIncome * 0.03), Math.round(props.totalInvestment * 0.15), 1000000)) }}</strong></td>
          </tr>
          <tr>
            <td colspan="2">
              <small class="text-muted">Lowest of the above three will be considered rebate, if you must invest</small>
            </td>
          </tr>
          <tr>
            <td>Advance Income Tax</td>
            <td class="text-end">{{ formatNumber(1) }}</td>
          </tr>
          <tr class="table-success">
            <td><strong>Total Rebate</strong></td>
            <td class="text-end"><strong>{{ formatNumber(Math.min(Math.round(taxableIncome * 0.03), Math.round(props.totalInvestment * 0.15), 1000000)) }}</strong></td>
          </tr>
          <tr class="table-warning">
            <td><strong>Net Tax Liability</strong></td>
            <td class="text-end"><strong>{{ formatNumber(netTaxLiability) }}</strong></td>
          </tr>
          <tr>
            <td>Advance Income Tax (AIT)</td>
            <td class="text-end">{{ formatNumber(props.advanceIncomeTax) }}</td>
          </tr>
          <tr class="table-success">
            <td><strong>Final Tax Liability</strong></td>
            <td class="text-end"><strong>{{ formatNumber(finalTaxLiability) }}</strong></td>
          </tr>
          </tbody>
        </table>

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

        <!-- TDS Calculation -->
        <h6 class="mt-4 mb-3"><strong>TDS (Tax Deducted at Source) Calculation:</strong></h6>
        <div class="table-responsive">
          <table class="table table-sm table-bordered">
            <tbody>
            <tr>
              <td>Annual Tax Liability</td>
              <td class="text-end">{{ formatNumber(finalTaxLiability) }}</td>
            </tr>
            <tr>
              <td>Monthly TDS (Annual ÷ 12)</td>
              <td class="text-end">{{ formatNumber(Math.round(finalTaxLiability / 12)) }}</td>
            </tr>
            <tr class="table-info">
              <td><strong>Employer Should Deduct Monthly</strong></td>
              <td class="text-end"><strong>৳{{ formatNumber(Math.round(finalTaxLiability / 12)) }}</strong></td>
            </tr>
            </tbody>
          </table>
        </div>

        <div class="text-center mt-4">
          <PdfDownloadButton/>
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

.text-danger {
  color: #dc3545 !important;
}

.table-success {
  background-color: #28a745;
  color: white;
}

.table-info {
  background-color: #17a2b8;
  color: white;
}

.table-warning {
  background-color: #ffc107;
  color: black;
}

.text-muted {
  font-size: 0.8em;
}
</style>