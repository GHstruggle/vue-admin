<template>
  <div>
    <LeftNav />
    <Main />
    <Header />
  </div>
</template>
<script>
import LeftNav from './component/LeftNav.vue';
import Main from './component/Main.vue';
import Header from './component/Header.vue';
export default {
  name: 'Layout',
  components: {
    LeftNav,
    Main,
    Header
  }
};
</script>
<style lang="scss" scoped></style>
