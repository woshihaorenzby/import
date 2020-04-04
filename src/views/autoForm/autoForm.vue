<template>
  <el-form :model="dynamicValidateForm" label-width="120px" ref="dynamicValidateForm">
    <el-form-item :key="domain.prop"
                  :label="domain.label"
                  :prop="domain.prop"
                  :rules="rules"
                  v-for="domain in dynamicValidateForm.domains">
      <el-input   type="money"
                  :disabled="domain.editable"
                  autocomplete="off"
                  v-model.number="domain.value">
      </el-input>
    </el-form-item>
  </el-form>
</template>

<script>

    export default {

        name: "autoForm"
    }
</script>

<style scoped>

</style>
