<template> 
  <budget-detail :is-edit='true'></budget-detail>
</template>
<script>
  import BudgetDetail from './components/BudgetDetail'
  export default {
    name: 'updateBudget',
    components: { BudgetDetail }
  }
</script>
<style>
</style>


