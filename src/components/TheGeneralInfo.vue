<script setup>
import { ref, watch } from "vue";

const gender = ref('male')
const minimum_tax = ref(5000)

const emit = defineEmits(['update:gender', 'update:ageGroup'])

watch(gender, (newValue) => {
  emit('update:gender', newValue)
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
            <select id="gender" v-model="gender" class="form-control">
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="specially_abled">Specially-abled</option>
              <option value="freedom_fighter">Gazetted freedom fighter</option>
            </select>
          </div>
          <div class="col-md-4 mb-3">
            <label for="minimum_tax">Minimum tax in your area:</label>
            <input id="minimum_tax" v-model="minimum_tax" aria-label="Minimum tax in your area" class="form-control"
                   placeholder="Minimum tax in your area" type="number">
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>