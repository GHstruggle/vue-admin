import { getStorageSess } from '../../../utils/storage';
export default {
  isCollapse: getStorageSess('isCollapse') || false,
  abc: '123'
};
