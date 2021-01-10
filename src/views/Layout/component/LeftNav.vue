<template>
  <div id="nav-wrap">
    <h1 class="logo"><img src="../../../assets/logo.png" /></h1>
    <el-menu
      :default-active="$route.path"
      class="el-menu-vertical-demo"
      @open="handleOpen"
      @close="handleClose"
      background-color="transparent"
      text-color="#fff"
      active-text-color="#fff"
      router
    >
      <template v-for="(routeItemi, index) in routers">
        <el-submenu :index="index + ''" v-if="!routeItemi.hide" :key="routeItemi.id">
          <template slot="title">
            <svg-icon :iconClass="routeItemi.mate.icon" :className="routeItemi.mate.icon" />
            <span>{{ routeItemi.mate.name }}</span>
          </template>
          <el-menu-item :index="subItem.path" v-for="subItem in routeItemi.children" :key="subItem.id">
            {{ subItem.mate.name }}
          </el-menu-item>
        </el-submenu>
      </template>
    </el-menu>
  </div>
</template>
<script>
import { reactive } from '@vue/composition-api';
export default {
  setup(props, { root }) {
    /**
     * data数据
     */
    // 所有路由数组
    const routers = reactive(root.$router.options.routes);
    // console.log(routers);
    const handleOpen = (key, keyPath) => {
      console.log(key, keyPath);
    };
    const handleClose = (key, keyPath) => {
      console.log(key, keyPath);
    };
    return {
      handleOpen,
      handleClose,
      routers
    };
  }
};
</script>
<style lang="scss" scoped>
#nav-wrap {
  position: fixed;
  left: 0;
  top: 0;
  width: $navMenu;
  height: 100vh;
  background-color: #344a5f;
  .svg-icon {
    font-size: 16px;
    margin: 0 10px;
  }
  .logo {
    padding: 24px 0;
    text-align: center;
  }
}
</style>
