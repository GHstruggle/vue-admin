import { reactive } from '@vue/composition-api';
import { getCityPicker } from '@/api/user';
export function cityPicker() {
  const data = reactive({
    provinceData: [],
    cityData: [],
    areaData: [],
    streetData: [],
    provinceValue: '',
    cityValue: '',
    areaValue: '',
    streetValue: ''
  });
  const resultData = reactive({
    provinceValue: '',
    cityValue: '',
    areaValue: '',
    streetValue: ''
  });
  // 获取省份
  const getProvince = () => {
    getPosition({ type: 'province' });
  };
  // 获取城市
  const handleProvince = val => {
    resetValue({ type: 'city' });
    getPosition({ type: 'city', province_code: val });
  };
  // 区县
  const handleCity = val => {
    resetValue({ type: 'area' });
    getPosition({ type: 'area', city_code: val });
  };
  // 街道
  const handleArea = val => {
    resetValue({ type: 'street' });
    getPosition({ type: 'street', area_code: val });
  };
  // 选择街道触发该方法
  const handlestreet = () => {
    resetValue({ type: '' });
  };
  // 接口请求
  const getPosition = params => {
    getCityPicker(params)
      .then(response => {
        data[`${params.type}Data`] = response.data.data;
        // console.log(response);
      })
      .catch(error => error);
  };
  // 重置选项
  const resetValue = params => {
    const valueJSON = {
      // city: ['cityValue', 'areaValue', 'streetValue'],
      // area: ['areaValue', 'streetValue'],
      // street: ['streetValue']
      city: [
        ['cityValue', 'cityData'],
        ['areaValue', 'areaData'],
        ['streetValue', 'streetData']
      ],
      area: [
        ['areaValue', 'areaData'],
        ['streetValue', 'streetData']
      ],
      street: [['streetValue', 'streetData']]
    };
    if (params.type) {
      const arr = valueJSON[params.type];
      arr.forEach(item => {
        data[item[0]] = '';
        data[item[1]] = [];
      });
    }
    result();
  };
  // 返回数据集合
  const result = () => {
    for (const key in resultData) {
      resultData[key] = data[key];
    }
  };
  return {
    data,
    resultData,
    getProvince,
    handleProvince,
    handleCity,
    handleArea,
    handlestreet
  };
}
