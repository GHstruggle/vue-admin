<template>
  <div id="header-wrap">
    <div class="header-list pull-left">
      <i @click="menuStatus">
        <svg-icon iconClass="list" iconName="list"></svg-icon>
      </i>
    </div>
    <div class="pull-right">
      <div class="user-info pull-left">
        <img class="face" src="@/assets/touxiang.png" />
        <span>{{ username }}</span>
      </div>
      <div class="exit-btn pull-left">
        <i title="退出" @click="exit">
          <svg-icon iconClass="exit" iconName="exit"></svg-icon>
        </i>
      </div>
    </div>
  </div>
</template>
<script>
import { computed, ref } from '@vue/composition-api';
export default {
  name: 'Header',
  setup(props, { root }) {
    const exit = () => {
      let r = ref(confirm('确认退出吗？'));
      if (r.value) {
        root.$store.dispatch('login/exit').then(() => {
          root.$router.push('login');
        });
      }
    };
    const menuStatus = () => root.$store.dispatch('meuns/menuStatus');
    const username = computed(() => root.$store.state.login.user_name);
    return {
      menuStatus,
      username,
      exit
    };
  }
};
</script>
<style lang="scss" scoped>
#header-wrap {
  position: fixed;
  left: $navMenu;
  top: 0;
  right: 0;
  height: 75px;
  line-height: 75px;
  box-shadow: 0 3px 16px 0 rgba(0, 0, 0, 0.1);
  background: #fff;
  z-index: 2;
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
.close {
  #header-wrap {
    left: $navMenuMin;
    @include webkit(transition, all 0.3s ease 0s);
  }
}
.open {
  #header-wrap {
    left: $navMenu;
    @include webkit(transition, all 0.3s ease 0s);
  }
}
</style>
