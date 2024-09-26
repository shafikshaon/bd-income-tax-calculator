<script setup>
import {ref, computed} from 'vue'

const props = defineProps({
  totalGrossPay: {
    type: Number,
    required: true
  },
  totalInvestment: {
    type: Number,
    required: true
  },
})

const oneThirdOfTotalEarning = computed(() => Math.floor(props.totalGrossPay / 3))
const maxTaxFreeIncome = 450000
const taxFreeIncome = computed(() => Math.min(oneThirdOfTotalEarning.value, maxTaxFreeIncome))
const taxableIncome = computed(() => props.totalGrossPay - taxFreeIncome.value)

const formatNumber = (num) => num.toLocaleString()
</script>

<template>
  <div class="card border-primary mb-3">
    <div class="card-header">Earning Summary</div>
    <div class="card-body">
      <div class="row">
        <div class="tax-calculation-summary">
          <table class="table table-sm table-bordered">
            <tbody>
            <tr class="table-success">
              <td><strong>Total Earning</strong></td>
              <td class="text-end"><strong>{{ formatNumber(props.totalGrossPay) }}</strong></td>
            </tr>
            <tr>
              <td>1/3 of Total Earning</td>
              <td class="text-end">{{ formatNumber(oneThirdOfTotalEarning) }}</td>
            </tr>
            <tr>
              <td>Maximum Tax free Income</td>
              <td class="text-end">{{ formatNumber(maxTaxFreeIncome) }}</td>
            </tr>
            <tr>
              <td>Tax Free Income</td>
              <td class="text-end">{{ formatNumber(taxFreeIncome) }}</td>
            </tr>
            <tr>
              <td colspan="2">
                <small class="text-muted">It should be the lowest of 1/3 of the total earning or 4,50,000</small>
              </td>
            </tr>
            <tr>
              <td>Taxable Income</td>
              <td class="text-end">{{ formatNumber(taxableIncome) }}</td>
            </tr>
            <tr>
              <td colspan="2">
                <small class="text-muted">Total Income - Tax Free Income</small>
              </td>
            </tr>
            <tr>
              <td>Total Investment</td>
              <td class="text-end">{{ formatNumber(props.totalInvestment) }}</td>
            </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.tax-calculation-summary {
  /* Remove max-width */
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