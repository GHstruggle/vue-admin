<template>
  <div id="header-wrap">
    <div class="header-list pull-left">
      <svg-icon iconClass="list" iconName="list"></svg-icon>
    </div>
    <div class="pull-right">
      <div class="user-info pull-left">
        <img class="face" src="@/assets/touxiang.png" />
        <span>管理员</span>
      </div>
      <div class="exit-btn pull-left">
        <i title="退出"><svg-icon iconClass="exit" iconName="exit"></svg-icon></i>
      </div>
    </div>
  </div>
</template>
<script>
export default {};
</script>
<style lang="scss" scoped>
#header-wrap {
  position: fixed;
  left: 250px;
  top: 0;
  right: 0;
  height: 75px;
  line-height: 75px;
  box-shadow: 0 3px 16px 0 rgba(0, 0, 0, 0.1);
  background: #fff;
  svg {
    font-size: 20px;
  }
}
.header-list {
  padding-left: 32px;
  cursor: pointer;
}
.exit-btn {
  padding: 0 28px;
  cursor: pointer;
}
.user-info {
  height: 100%;
  padding-right: 23px;
  border-right: 1px solid #ededed;
  cursor: pointer;
  .face {
    padding-right: 23px;
    vertical-align: middle;
  }
}
</style>
