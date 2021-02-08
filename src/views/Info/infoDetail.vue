<template>
  <div>
    <el-form ref="form" :model="form" label-width="80px">
      <el-form-item label="信息分类">
        <el-select v-model="form.categoryId" placeholder="请选择">
          <el-option v-for="item in form.category_items" :key="item.id" :label="item.category_name" :value="item.id"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="新闻标题">
        <el-col :span="10">
          <el-input v-model="form.title"></el-input>
        </el-col>
      </el-form-item>
      <el-form-item label="缩略图">
        <el-upload
          class="avatar-uploader"
          action="http://up-z2.qiniup.com"
          :data="form.updata"
          :show-file-list="false"
          :on-success="handleAvatarSuccess"
          :before-upload="beforeAvatarUpload"
        >
          <img v-if="form.imageUrl" :src="form.imageUrl" class="avatar" />
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
      </el-form-item>
      <el-form-item label="活动时间">
        <el-col :span="11">
          <el-date-picker
            type="date"
            placeholder="选择日期"
            disabled
            v-model="form.createDate"
            style="width: 100%;"
          ></el-date-picker>
        </el-col>
      </el-form-item>
      <el-form-item label="详细内容">
        <quillEditor v-model="form.content" ref="myTextEditor" />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSava">保存</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
import { reactive, onMounted, watch } from '@vue/composition-api';
import { quillEditor } from 'vue-quill-editor';
import 'quill/dist/quill.core.css';
import 'quill/dist/quill.snow.css';
import 'quill/dist/quill.bubble.css';
import { getList } from '@/api/news.js';
import { EditInfo } from '@/api/news.js';
import { formatDate } from '@/utils/transformDate';
import { common, getQiniuToken } from '@/utils/common.js';
export default {
  components: {
    quillEditor
  },
  setup(props, { root }) {
    const { getInfoCatigory, categoryItems } = common();
    /**
     *  数据
     */
    const data = reactive({
      // 表单
      form: {
        // 分类
        category_items: [],
        categoryId: '',
        title: '',
        createDate: '',
        content: '',
        imageUrl: '',
        updata: {
          token: '',
          key: ''
        }
      }
    });
    /**
     *  方法
     */
    const methods = reactive({
      onSava() {
        console.log(1);
        let requestData = {
          id: root.$route.query.id,
          categoryId: data.form.categoryId,
          title: data.form.title,
          content: data.form.content,
          imgUrl: data.form.imageUrl
        };
        if (!data.form.categoryId || !data.form.title || !data.form.content) {
          root.$message({
            message: '不能留空',
            type: 'error'
          });
          return false;
        }
        EditInfo(requestData).then(response => {
          console.log(response);
          root.$message({
            message: response.message,
            type: 'success'
          });
        });
      },
      // 获取当前id信息
      getinfo() {
        let requestData = {
          id: root.$route.query.id,
          pageNumber: 1,
          pageSize: 1
        };
        getList(requestData).then(response => {
          let responseData = response.data.data[0];
          console.log(responseData);
          data.form.categoryId = responseData.categoryId;
          data.form.title = responseData.title;
          data.form.content = responseData.content;
          data.form.createDate = formatDate(parseInt(responseData.createDate));
          data.form.imageUrl = responseData.imgUrl;
        });
      },
      // 上传
      handleAvatarSuccess(res) {
        // this.imageUrl = URL.createObjectURL(file.raw);
        console.log(res);
        data.form.imageUrl = `http://www-web-jshtml-cn-idva7mx.web-jshtml.cn/${res.key}`;
        console.log(data.form.imageUrl);
      },
      beforeAvatarUpload(file) {
        const isJPG = file.type === 'image/jpeg';
        const isLt2M = file.size / 1024 / 1024 < 2;

        if (!isJPG) {
          this.$message.error('上传头像图片只能是 JPG 格式!');
        }
        if (!isLt2M) {
          this.$message.error('上传头像图片大小不能超过 2MB!');
        }
        // 文件名转码
        console.log('文件转码', file.name);
        let suffix = file.name;
        let key = encodeURI(`${suffix}`);
        console.log('文件转码', key);
        data.form.updata.key = key;
        return isJPG && isLt2M;
      },
      // 获取七牛云token
      getQiniu() {
        let responseData = {
          ak: 'Avh-EZZAa4TxqPQZsEW42fXBUbTMFi-RKSZTRKJj',
          sk: 'l9AXtnhCVkZexXNRcmHXzmecXiCUiLynwGboMeUw',
          buckety: 'webjshtml'
        };
        getQiniuToken(responseData).then(response => {
          console.log(response);
          data.form.updata.token = response.data.token;
        });
      }
    });
    /**
     *  监听
     */
    watch(
      () => categoryItems.items,
      newValue => {
        data.form.category_items = newValue;
      }
    );
    onMounted(() => {
      // 分类
      getInfoCatigory();
      // 数据
      methods.getinfo();
      // 七牛云
      methods.getQiniu();
      // data.form.category_title = root.$route.query.id;
    });
    return {
      ...data,
      ...methods
    };
  }
};
</script>
<style lang="scss">
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9 !important;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>
