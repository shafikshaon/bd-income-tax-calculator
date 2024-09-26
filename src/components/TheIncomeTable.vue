<script setup>
import { ref, computed, watch } from 'vue'

const convertToNumber = (value) => {
  if (value === '' || value === null || value === undefined) {
    return 0;
  }
  return Number(value);
};

const emit = defineEmits(['update:totalGrossPay','update:advanceIncomeTax','update:minimumTax'])

const manuallyEdited = ref({
  houseRent: false,
  conveyance: false,
  medicalAllowance: false
})

const incomeFields = {
  basic: ref(0),
  houseRent: ref(0),
  conveyance: ref(0),
  medicalAllowance: ref(0),
  leaveEncashment: ref(0),
  performanceBonus: ref(0),
  yearlyBonus: ref(0),
  festivalBonus: ref(0),
  overtimeAllowance: ref(0),
  transportation: ref(0)
}

watch(() => incomeFields.basic.value, (newBasic) => {
  newBasic = convertToNumber(newBasic);
  if (!manuallyEdited.value.houseRent) {
    incomeFields.houseRent.value = newBasic * 0.5
  }
  if (!manuallyEdited.value.conveyance) {
    incomeFields.conveyance.value = newBasic * 0.25
  }
  if (!manuallyEdited.value.medicalAllowance) {
    incomeFields.medicalAllowance.value = newBasic * 0.25
  }
})

const totalGrossPay = computed(() =>
    Object.values(incomeFields).reduce((sum, field) => sum + convertToNumber(field.value), 0)
)

const ait = ref(0)
const netPay = computed(() => convertToNumber(totalGrossPay.value) - convertToNumber(ait.value))

watch(totalGrossPay, (newValue) => {
  emit('update:totalGrossPay', newValue)
})
watch(ait, (newValue) => {
  emit('update:advanceIncomeTax', newValue)
})

const formatNumber = (num) => convertToNumber(num).toLocaleString()

const handleManualEdit = (field) => {
  if (['houseRent', 'conveyance', 'medicalAllowance'].includes(field)) {
    manuallyEdited.value[field] = true
  }
}
</script>

<template>
  <div class="card border-primary mb-3">
    <div class="card-header">Income Details</div>
    <div class="card-body">
      <div class="table-responsive">
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
                @input="handleManualEdit(key)"
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
          <td colspan="2">
            <small class="text-muted">
              Advance Income Tax [Deducted by Company]
            </small>
          </td>
        </tr>
        <tr>
          <td>AIT</td>
          <td colspan="2">
            <input v-model.number="ait" class="form-control form-control-sm" type="number">
          </td>
        </tr>
        <tr class="table-success">
          <td><strong>Net Pay</strong></td>
          <td colspan="2" class="">{{ formatNumber(netPay) }}</td>
        </tr>
        </tbody>
      </table>
       </div>
       </div>
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