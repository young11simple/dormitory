<template>
  <div class="account-settings-info-view">
    <a-form id="formSet">
      <a-row :gutter="24">
        <a-col :span="8">
          <a-form-item label="姓名">
            <a-input v-model="userInfo.name" />
          </a-form-item>
        </a-col>
        <a-col :span="8">
          <a-form-item label="性别">
            <a-input v-model="gender[userInfo.gender]"/>
          </a-form-item>
        </a-col>
        <a-col :span="8">
          <a-form-item label="权限">
            <a-input v-model="auth"/>
          </a-form-item>
        </a-col>
      </a-row>
      <a-row :gutter="24">
        <a-col :span="8">
          <a-form-item label="负责区域">
            <a-input v-model="workPlace"/>
          </a-form-item>
        </a-col>
        <a-col :span="8">
          <a-form-item label="账号">
            <a-input v-model="userInfo.userId" />
          </a-form-item>
        </a-col>
        <a-col :span="8">
          <a-form-item label="入职时间">
            <a-input v-model="userInfo.createTime" />
          </a-form-item>
        </a-col>
      </a-row>
      <a-row :gutter="24">
        <a-col :span="8">
          <a-form-item label="住址">
            <a-input v-model="userInfo.address" />
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
      workPlace: '',
      gender: ['女', '男']
    }
  },
  created () {
    this.userInfo = store.getters.userInfo
    this.auth = '维修人员'
    this.workPlace = this.userInfo.workArea + this.userInfo.buildingID + '栋'
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
