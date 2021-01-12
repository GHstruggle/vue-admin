<template>
  <div :class="[menusStatus ? 'close' : 'open']">
    <LeftNav />
    <Main />
    <Header />
  </div>
</template>
<script>
import LeftNav from './component/LeftNav.vue';
import Main from './component/Main.vue';
import Header from './component/Header.vue';
import { computed } from '@vue/composition-api';
export default {
  name: 'Layout',
  components: {
    LeftNav,
    Main,
    Header
  },
  setup(props, { root }) {
    /**
     * 菜单栏展开/收起
     */
    const menusStatus = computed(() => {
      return root.$store.state.meuns.isCollapse;
    });
    return {
      menusStatus
    };
  }
};
</script>
<style lang="scss" scoped></style>
