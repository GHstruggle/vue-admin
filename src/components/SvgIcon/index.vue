<template>
  <svg :class="svgClass" aria-hidden="true">
    <use :xlink:href="iconName"></use>
  </svg>
</template>
<script>
import { computed } from '@vue/composition-api';
export default {
  props: {
    iconClass: {
      type: String,
      default: ''
    },
    className: {
      type: String,
      default: ''
    }
  },
  setup(props) {
    const iconName = computed(() => {
      return `#icon-${props.iconClass}`;
    });
    const svgClass = computed(() => {
      return props.className ? `svg-icon ${props.className}` : 'svg-icon';
    });
    return {
      iconName,
      svgClass
    };
  }
};
</script>
<style>
.svg-icon {
  width: 1em;
  height: 1em;
  vertical-align: -0.15em;
  fill: currentColor;
  overflow: hidden;
}
</style>
