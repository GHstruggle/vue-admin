<template>
  <div id="home-wrap"><Layout /></div>
</template>
<script>
import Layout from '@/views/Layout/index.vue';
export default {
  name: 'Home',
  components: { Layout }
};
</script>
<style lang="scss" scoped>
#home-wrap {
  width: 100%;
  height: 100%;
  background-color: #f7f7f7;
}
</style>
