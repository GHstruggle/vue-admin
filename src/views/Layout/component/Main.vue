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
  // position: fixed123;
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
  padding: 30px;
  overflow: auto;
  background-color: #ffff;
  @include webkit(box-sizing, border-box);
}
.close {
  #main-wrap {
    padding-left: $navMenuMin + 30;
    @include webkit(transition, all 0.3s ease 0s);
  }
}
.open {
  #header-wrap {
    padding-left: ($navMenu + 30);
    @include webkit(transition, all 0.3s ease 0s);
  }
}
</style>
