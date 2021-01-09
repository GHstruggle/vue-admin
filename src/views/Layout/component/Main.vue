<template>
  <div id="main-wrap">
    <div class="main-cotent">
      <router-view />
    </div>
  </div>
</template>
<script>
export default {
  name: 'Main'
};
</script>
<style lang="scss" scoped>
#main-wrap {
  // position: fixed;
  // left: 280px;
  // top: 105px;
  width: 100%;
  height: 100vh;
  padding: 105px 30px 0 ($navMenu + 30);
  box-sizing: border-box;
}
.main-cotent {
  width: 100%;
  height: 100%;
  background-color: #ffff;
}
</style>
