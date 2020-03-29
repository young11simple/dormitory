<template>
  <div id="components-security">
    <div id="password">
      <span> 原密码： </span>
      <span>
        <a-input-password v-model="password" />
      </span>
      <span>
        <a-button type="primary" style="margin:auto 5px" @click="handleModify">修改</a-button>
        <a-button type="primary" v-if="isModified" @click="handleSave">保存</a-button>
      </span>
    </div>
    <div v-if="isModified" style="margin: 20px 40px 20px auto">
      <span> 请输入新密码： </span>
      <span>
        <a-input-password v-model="newPassword" />
      </span>
      <span> 请确认新密码： </span>
      <span>
        <a-input-password v-model="newPasswordAgain" />
      </span>
      <a-alert
        style="marginTop:10px"
        message="前后密码不一致"
        type="error"
        showIcon
        v-if="isSame"
      />
    </div>
  </div>
</template>

<script>
import store from '@/store'
import { mapActions } from 'vuex'
import router from '../../../router'
export default {
  data () {
    return {
      password: '',
      isModified: false,
      newPassword: '',
      newPasswordAgain: '',
      isSame: false
    }
  },
  methods: {
    ...mapActions(['UpdatePW']),
    handleModify () {
      this.isModified = true
    },
    handleSave () {
      const { UpdatePW } = this
      if (this.newPassword === this.newPasswordAgain) {
        if (this.newPassword === this.password) {
          this.$notification['warn']({
            message: '警告',
            description: '不要跟原密码相同',
            duration: 2
          })
        } else {
          const data = { oldPw: this.password, newPw: this.newPassword }
          UpdatePW(data)
            .then(res => this.saveSuccessfully(res))
            .catch(err => this.saveFail(err))
            .finally()
        }
      } else {
        this.isSame = true
      }
    },
    saveSuccessfully (res) {
      this.$notification['success']({
        message: '成功',
        description: '密码修改成功,请重新登陆',
        duration: 2
      })
      setTimeout(() => {
        router.push({ path: '/user' })
      }, 2000)
    },
    saveFail (err) {
      console.log('save fail', err)
      this.$notification['error']({
        message: '错误',
        description: ((err.response || {}).data || {}).message || '密码保存失败，请稍后再试',
        duration: 3
      })
    }
  },
  created () {
    this.password = store.getters.password
  }
}
</script>

<style scoped>
#password {
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
}
#components-security {
  padding: 24px 160px;
  background: #fbfbfb;
  border: 1px solid #d9d9d9;
  border-radius: 6px;
}
</style>
