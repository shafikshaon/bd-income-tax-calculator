<script setup>
import { ref, computed, watch } from 'vue'

const emit = defineEmits(['update:totalGrossPay'])

const incomeFields = {
  basic: ref(807000),
  houseRent: ref(403500),
  conveyance: ref(201750),
  medicalAllowance: ref(201750),
  leaveEncashment: ref(0),
  performanceBonus: ref(0),
  yearlyBonus: ref(0),
  festivalBonus: ref(147000),
  overtimeAllowance: ref(5694),
  transportation: ref(0)
}

const totalGrossPay = computed(() =>
    Object.values(incomeFields).reduce((sum, field) => sum + field.value, 0)
)

const ait = ref(46000)
const netPay = computed(() => totalGrossPay.value - ait.value)

watch(totalGrossPay, (newValue) => {
  emit('update:totalGrossPay', newValue)
})

const formatNumber = (num) => num.toLocaleString()
</script>

<template>
  <div class="income-component">
    <h2>Income Details</h2>
    <table class="table table-sm">
      <thead>
      <tr>
        <th>Particulars</th>
        <th>Payment</th>
        <th>Total</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="(value, key) in incomeFields" :key="key">
        <td>{{ key.charAt(0).toUpperCase() + key.slice(1).replace(/([A-Z])/g, ' $1') }}</td>
        <td>
          <input
              v-model.number="incomeFields[key].value"
              class="form-control form-control-sm"
              type="number"
          >
        </td>
        <td>{{ formatNumber(incomeFields[key].value) }}</td>
      </tr>
      <tr class="table-primary">
        <td><strong>Total Gross Pay</strong></td>
        <td colspan="2">{{ formatNumber(totalGrossPay) }}</td>
      </tr>
      <tr>
        <td>AIT</td>
        <td colspan="2">
          <input v-model.number="ait" class="form-control form-control-sm" type="number">
        </td>
      </tr>
      <tr class="table-success">
        <td><strong>Net Pay</strong></td>
        <td colspan="2">{{ formatNumber(netPay) }}</td>
      </tr>
      </tbody>
    </table>
  </div>
</template>

<style scoped>
.income-component {
  max-width: 600px;
  margin: 0 auto;
}
.table {
  margin-top: 1rem;
}
th, td {
  padding: 0.5rem;
}
input[type="number"] {
  width: 100%;
}
</style>