<script setup>
import { computed } from 'vue'

const props = defineProps({
  totalGrossPay: {
    type: Number,
    required: true
  },
  taxYear: {
    type: String,
    required: true,
    default: '2025-2026'
  }
})

const maxRebatePercentage = computed(() => {
  // For both tax years, maximum rebate is 25% of total income
  return 0.25
})

const maxRebateAmount = computed(() => {
  // Maximum rebate ceiling for both tax years
  if (props.taxYear === '2026-2027') {
    return 1500000 // ৳15,00,000 for 2026-27
  }
  return 1500000 // ৳15,00,000 for 2025-26
})

const maxRebateFromIncome = computed(() => {
  return Math.floor(props.totalGrossPay * maxRebatePercentage.value)
})

const maxInvestmentForRebate = computed(() => {
  const incomeBasedLimit = props.totalGrossPay * maxRebatePercentage.value
  return Math.min(incomeBasedLimit, maxRebateAmount.value)
})

const maxRebateFromInvestment = computed(() => {
  const investment = props.totalInvestment || 0
  return investment * maxRebatePercentage.value
})

const actualMaxRebate = computed(() => {
  return Math.min(maxRebateFromInvestment.value, maxRebateAmount.value)
})

const investmentOptions = [
  {
    category: "Life Insurance Premium",
    description: "Premium paid for life insurance policies",
    note: "Subject to conditions and limits"
  },
  {
    category: "Deposit Pension Scheme (DPS)",
    description: "Deposit in approved DPS with banks/financial institutions",
    note: "Minimum 5 years tenure required"
  },
  {
    category: "Contributory Provident Fund",
    description: "Employee's contribution to recognized provident fund",
    note: "Both employer and employee contributions"
  },
  {
    category: "Approved Pension Scheme",
    description: "Contribution to government approved pension schemes",
    note: "Subject to NBR approved schemes"
  },
  {
    category: "Investment in Securities",
    description: "Investment in listed securities, mutual funds, bonds",
    note: "Must be held for minimum period"
  },
  {
    category: "Zakat Fund",
    description: "Donation to Zakat Fund established by government",
    note: "100% allowable as rebate"
  },
  {
    category: "Wage Earner Development Bond",
    description: "Investment in government bonds for wage earners",
    note: "Subject to availability and terms"
  }
]

const formatNumber = (num) => {
  const value = num || 0
  return value.toLocaleString()
}
</script>

<template>
  <div class="card border-info mb-3">
    <div class="card-header bg-info text-white">
      <i class="fas fa-info-circle"></i> Tax Rebate Information ({{ taxYear }})
    </div>
    <div class="card-body">
      <!-- Rebate Limits -->
      <div class="alert alert-primary">
        <h6 class="mb-2"><strong>Your Maximum Rebate Limits:</strong></h6>
        <div class="row">
          <div class="col-md-6">
            <small class="text-muted">25% of Your Investment</small><br>
            <strong>৳{{ formatNumber(maxRebateFromInvestment) }}</strong>
          </div>
          <div class="col-md-6">
            <small class="text-muted">Government Ceiling Limit</small><br>
            <strong>৳{{ formatNumber(maxRebateAmount) }}</strong>
          </div>
        </div>
        <hr class="my-2">
        <div class="text-center">
          <small class="text-muted">Your Maximum Rebate from Current Investment</small><br>
          <h5 class="text-primary mb-0"><strong>৳{{ formatNumber(actualMaxRebate) }}</strong></h5>
          <small class="text-muted">{{ actualMaxRebate >= maxRebateAmount ? 'Limited by government ceiling' : 'Based on 25% of investment' }}</small>
        </div>
      </div>

      <!-- Investment Options -->
      <h6 class="mb-3"><strong>Approved Investment Options for Tax Rebate:</strong></h6>
      <div class="row">
        <div class="col-12">
          <div class="table-responsive">
            <table class="table table-sm table-hover">
              <thead class="table-light">
                <tr>
                  <th>Investment Category</th>
                  <th>Description</th>
                  <th>Notes</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="option in investmentOptions" :key="option.category">
                  <td class="fw-bold">{{ option.category }}</td>
                  <td>{{ option.description }}</td>
                  <td><small class="text-muted">{{ option.note }}</small></td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <!-- Year-specific Information -->
      <div class="alert alert-info mt-3" v-if="taxYear === '2026-2027'">
        <h6 class="mb-2"><strong>{{ taxYear }} Specific Changes:</strong></h6>
        <ul class="mb-0 small">
          <li>Tax-free income threshold increased to <strong>৳3,75,000</strong></li>
          <li>Minimum tax of <strong>৳5,000</strong> applies for income above tax-free limit</li>
          <li>New progressive tax rates apply for this assessment year</li>
        </ul>
      </div>

      <div class="alert alert-info mt-3" v-if="taxYear === '2025-2026'">
        <h6 class="mb-2"><strong>{{ taxYear }} Information:</strong></h6>
        <ul class="mb-0 small">
          <li>Tax-free income threshold: <strong>৳3,50,000</strong></li>
          <li>Traditional tax rate structure applies</li>
          <li>Standard minimum tax provisions apply</li>
        </ul>
      </div>

      <!-- Important Notes -->
      <div class="alert alert-warning mt-3">
        <h6 class="mb-2"><strong>Important Notes:</strong></h6>
        <ul class="mb-0 small">
          <li>Maximum rebate is <strong>25% of total income</strong> or <strong>৳{{ formatNumber(maxRebateAmount) }}</strong>, whichever is lower</li>
          <li>Rebate amount cannot exceed your actual tax liability</li>
          <li>Investment must be made during the income year (July-June) for rebate eligibility</li>
          <li>Proper documentation and receipts are required for claiming rebate</li>
          <li>Some investments may have minimum tenure requirements (e.g., DPS: 5 years)</li>
          <li>Life insurance premium rebate subject to specific conditions and limits</li>
          <li>Consult a qualified tax advisor for investment strategy and compliance</li>
        </ul>
      </div>
    </div>
  </div>
</template>

<style scoped>
.table th {
  background-color: #f8f9fa;
  font-weight: 600;
  font-size: 0.9rem;
}

.table td {
  font-size: 0.85rem;
  vertical-align: middle;
}

.alert-primary {
  border-left: 4px solid #0d6efd;
}

.alert-warning {
  border-left: 4px solid #ffc107;
}

.card-header {
  font-weight: 600;
}
</style>
