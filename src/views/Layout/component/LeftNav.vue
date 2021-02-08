<template>
  <div id="nav-wrap">
    <h1 class="logo"><img src="../../../assets/logo.png" /></h1>
    <el-menu
      :default-active="$route.path"
      class="el-menu-vertical-demo"
      background-color="transparent"
      text-color="#fff"
      active-text-color="#fff"
      :collapse="isCollapse"
      router
    >
      <template v-for="(routeItemi, index) in routers">
        <el-submenu :index="index + ''" v-if="!routeItemi.hide" :key="routeItemi.id">
          <template slot="title">
            <svg-icon :iconClass="routeItemi.mate.icon" :className="routeItemi.mate.icon" />
            <span>{{ routeItemi.mate.name }}</span>
          </template>
          <template v-for="subItem in routeItemi.children">
            <el-menu-item v-if="!subItem.mate.hide" :index="subItem.path" :key="subItem.id">
              {{ subItem.mate.name }}
            </el-menu-item>
          </template>
        </el-submenu>
      </template>
    </el-menu>
  </div>
</template>
<script>
import { reactive, computed } from '@vue/composition-api';
export default {
  setup(props, { root }) {
    /**
     * data数据
     */
    // 所有路由数组
    const routers = reactive(root.$router.options.routes);
    // console.log(routers);
    /**
     * 导航菜单是否收起
     */
    const isCollapse = computed(() => root.$store.state.meuns.isCollapse);
    return {
      routers,
      isCollapse
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
.close {
  #nav-wrap {
    width: $navMenuMin;
    @include webkit(transition, all 0.3s ease 0s);
  }
  .logo > img {
    width: $navMenuMin;
    @include webkit(transition, all 0.3s ease 0s);
  }
}
.open {
  #nav-wrap {
    width: $navMenu;
    @include webkit(transition, all 0.3s ease 0s);
  }
  .logo > img {
    @include webkit(transition, all 0.3s ease 0s);
  }
}
</style>
