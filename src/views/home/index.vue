<template>
  <div>
    <div class="app-container">
      <el-col :span="12">
        <img :src="src" alt="加油！！！" class="img-style" height="1227px"
    width="1608px">
      </el-col>
    </div>
  </div>
</template>

<script>
  import home_index from '@/assets/images/home_index.jpg';

  export default {
    name:home_index,
    data() {
      return {
        src: home_index
      }
    }
  }
</script>
