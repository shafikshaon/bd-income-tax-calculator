<script setup>
import {ref, watch} from "vue";

const gender = ref('male')
const age_group = ref('below')
const minimum_tax = ref(5000)

const emit = defineEmits(['update:gender', 'update:ageGroup'])

watch(gender, (newValue) => {
  emit('update:gender', newValue)
})
watch(age_group, (newValue) => {
  emit('update:ageGroup', newValue)
})


</script>

<template>
  <div>
    <div class="card border-primary mb-3">
      <div class="card-header">General Information</div>
      <div class="card-body">
        <div class="row">
          <div class="col-md-4 mb-3">
            <label for="gender">Select Gender/Privilege:</label>
            <select v-model="gender" id="gender" class="form-control">
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="specially-abled">Specially-abled</option>
              <option value="freedom-fighter">Gazetted freedom fighter</option>
            </select>
          </div>
          <div class="col-md-4 mb-3">
            <label for="age_group">Age Group:</label>
            <select v-model="age_group" id="age_group" class="form-control">
              <option value="below">Below or 65</option>
              <option value="above">Above 65</option>
            </select>
          </div>
          <div class="col-md-4 mb-3">
            <label for="minimum_tax">Minimum tax in your area:</label>
            <input type="number" class="form-control" id="minimum_tax" placeholder="Minimum tax in your area" aria-label="Minimum tax in your area" v-model="minimum_tax">
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>