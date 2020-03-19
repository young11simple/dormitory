<template>
  <div class="account-settings-info-view">
    <a-form id="formSet">
      <a-row :gutter="24">
        <a-col :span="8">
          <a-form-item label="账号">
            <a-input v-model="userInfo.userId" />
          </a-form-item>
        </a-col>
        <a-col :span="8">
          <a-form-item label="姓名">
            <a-input v-model="userInfo.name" />
          </a-form-item>
        </a-col>
        <a-col :span="8">
          <a-form-item label="性别">
            <a-input v-model="userInfo.gender"/>
          </a-form-item>
        </a-col>
      </a-row>
      <a-row :gutter="24">
        <a-col :span="8">
          <a-form-item label="学院">
            <a-input v-model="userInfo.college"/>
          </a-form-item>
        </a-col>
        <a-col :span="8">
          <a-form-item label="专业班级">
            <a-input v-model="userInfo.major"/>
          </a-form-item>
        </a-col>
        <a-col :span="8">
          <a-form-item label="级别">
            <a-input v-model="level" />
          </a-form-item>
        </a-col>
      </a-row>
      <a-row :gutter="24">
        <a-col :span="8">
          <a-form-item label="住址">
            <a-input v-model="livePlace"/>
          </a-form-item>
        </a-col>
        <a-col :span="8">
          <a-form-item label="权限">
            <a-input v-model="auth"/>
          </a-form-item>
        </a-col>
        <a-col :span="8">
          <a-form-item label="联系方式">
            <a-input v-model="userInfo.telephone" />
          </a-form-item>
        </a-col>
      </a-row>
    </a-form>
  </div>
</template>

<script>
import store from '@/store'
export default {
  data () {
    return {
      userInfo: {},
      auth: '',
      livePlace: '',
      gender: ['女', '男'],
      area: ['泰山区', '华山区', '启林北'],
      level: ''
    }
  },
  created () {
    this.userInfo = store.getters.userInfo
    this.auth = '学生'
    this.livePlace = this.userInfo.area + this.userInfo.buildId + '栋' + this.userInfo.roomId
    this.level = this.userInfo.level + '级'
  }
}
</script>

<style lang="less" scoped>
// #formSet {
//   display: flex;
// }
.account-settings-info-view {
  padding: 24px;
  background: #fbfbfb;
  border: 1px solid #d9d9d9;
  border-radius: 6px;
}
</style>
