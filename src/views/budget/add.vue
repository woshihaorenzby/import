<template> 
  <budget-detail :is-edit='false'></budget-detail>
</template>
<script>
  import BudgetDetail from './components/BudgetDetail'
  export default {
    name: 'createBudgetData',
    components: { BudgetDetail }
  }
</script>
<style>
</style>


