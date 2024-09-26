<script setup>
import {ref, computed, watch} from 'vue'

const convertToNumber = (value) => {
  if (value === '' || value === null || value === undefined) {
    return 0;
  }
  return Number(value);
};

const emit = defineEmits(['update:totalInvestment'])

const shanchayPatra = ref(0)
const dps = ref(0)
const mutualFund = ref(0)

const totalInvestment = computed(() => {
  return convertToNumber(shanchayPatra.value) +
      convertToNumber(dps.value) +
      convertToNumber(mutualFund.value);
})

watch(totalInvestment, (newValue) => {
  emit('update:totalInvestment', newValue)
})

</script>

<template>
  <div class="card border-primary mb-3">
    <div class="card-header">Investments</div>
    <div class="card-body">
      <div class="table-responsive">
      <table class="table table-sm table-bordered">
        <thead class="table-primary">
        <tr>
          <th scope="col">Investments</th>
          <th scope="col">Amount</th>
        </tr>
        </thead>
        <tbody>
        <tr>
          <td>Shanchay Patra</td>
          <td>
            <input v-model.number="shanchayPatra" class="form-control form-control-sm" placeholder="0" type="number">
          </td>
        </tr>
        <tr>
          <td>DPS</td>
          <td>
            <input v-model.number="dps" class="form-control form-control-sm" placeholder="0" type="number">
          </td>
        </tr>
        <tr>
          <td>Mutual Fund</td>
          <td>
            <input v-model.number="mutualFund" class="form-control form-control-sm" placeholder="0" type="number">
          </td>
        </tr>
        <tr class="table-info">
          <td><strong>Total Investment</strong></td>
          <td>
            <input :value="totalInvestment" class="form-control form-control-sm" readonly type="number">
          </td>
        </tr>
        </tbody>
      </table>
      </div>
    </div>
  </div>
</template>

<style scoped>
.investment-tracker {
  margin-top: 20px;
}

.table {
  width: 100%;
  max-width: 400px;
}

.form-control-sm {
  width: 100%;
}
</style>