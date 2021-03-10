<template>
  <div class="overflow-hidden">
    <el-row :gutter="5">
      <el-col :span="6">
        <el-select v-model="provinceValue" @change="handleProvince">
          <el-option
            v-for="item in provinceData"
            :key="item.PROVINCE_CODE"
            :value="item.PROVINCE_CODE"
            :label="item.PROVINCE_NAME"
          ></el-option>
        </el-select>
      </el-col>
      <el-col :span="6">
        <el-select v-model="cityValue" @change="handleCity">
          <el-option v-for="item in cityData" :key="item.CITY_CODE" :value="item.CITY_CODE" :label="item.CITY_NAME"></el-option>
        </el-select>
      </el-col>
      <el-col :span="6">
        <el-select v-model="areaValue" @change="handleArea">
          <el-option v-for="item in areaData" :key="item.AREA_CODE" :value="item.AREA_CODE" :label="item.AREA_NAME"></el-option>
        </el-select>
      </el-col>
      <el-col :span="6">
        <el-select v-model="streetValue" @change="handlestreet">
          <el-option
            v-for="item in streetData"
            :key="item.STREET_CODE"
            :value="item.STREET_CODE"
            :label="item.STREET_NAME"
          ></el-option>
        </el-select>
      </el-col>
    </el-row>
  </div>
</template>
<script>
import { cityPicker } from '@/mixins/cityPicker';
import { toRefs, watch } from '@vue/composition-api';
export default {
  props: {
    cityPickerData: {
      type: Object,
      default: () => {}
    }
  },
  setup(props, { emit }) {
    const {
      // 获取省份
      getProvince,
      resultData,
      // 事件
      handleProvince,
      handleCity,
      handleArea,
      handlestreet,
      data
    } = cityPicker();
    getProvince();
    // 监听
    watch(
      () => resultData,
      newValue => {
        emit('update:cityPickerData', newValue);
      },
      {
        deep: true
      }
    );
    return {
      handleProvince,
      handleCity,
      handleArea,
      handlestreet,
      ...toRefs(data)
    };
  }
};
</script>
<style lang="sass" scoped></style>
