<template>
  <div>
    <div>
      <p v-if="hasAmmeter">请选择要充值的电表</p>
      <p v-else>没有绑定电表</p>
      <a-collapse v-if="hasAmmeter" accordion>
        <a-collapse-panel v-for="(value, index) in ammeter" :header="value" :key="index.toString()">
          <a-form>
            <a-form-item label="剩余金额" style="display:flex">
              <a-input-number disabled v-model="remain[index]" />
            </a-form-item>
            <a-form-item label="充值金额" style="display:flex">
              <a-input-number :min="10" :max="100" v-model="fee" />
              <a-button type="primary" @click="handlePay(index)" style="margin-left:30px">充值</a-button>
            </a-form-item>
          </a-form>
          <a-modal title="扫码充值" v-model="isShow" :footer="null">
            <div id="qrcode">
              <!-- <qriously :value="qrcode" :size="200" /> -->
              <VueQr :margin="20" :size="200" :text="config.text" ></VueQr>
            </div>
          </a-modal>
        </a-collapse-panel>
      </a-collapse>
    </div>
    <div id="components-button-demo-button-group">
      <a-button-group>
        <a-button type="primary" @click="handleDel"><a-icon type="close-square" />删除电表</a-button>
        <a-button type="primary" @click="handleAdd"><a-icon type="plus-square" />添加电表</a-button>
      </a-button-group>
      <a-modal title="删除电表" v-model="delVisible" @ok="handleDelOk">
        <a-checkbox :indeterminate="indeterminate" @change="onCheckAllChange" :checked="checkAll">
          全选
        </a-checkbox>
        <br/>
        <a-checkbox-group :options="ammeter" v-model="checkedList" @change="onChange" />
      </a-modal>
      <a-modal title="添加电表" v-model="addVisible" @ok="handleAddOk">
        <a-form>
          <a-row :gutter="24">
            <a-col :span="8">
              <a-form-item>
                <a-select v-model="dormInfo.area" placeholder="请选择校区">
                  <a-select-option key="华山区">华山区</a-select-option>
                  <a-select-option key="泰山区">泰山区</a-select-option>
                  <a-select-option key="启林区">启林区</a-select-option>
                </a-select>
              </a-form-item>
            </a-col>
            <a-col :span="8">
              <a-form-item>
                <a-select v-model="dormInfo.buildId" placeholder="请选择楼栋">
                  <a-select-option key="9">9</a-select-option>
                  <a-select-option key="14">14</a-select-option>
                  <a-select-option key="15">15</a-select-option>
                </a-select>
              </a-form-item>
            </a-col>
            <a-col :span="8">
              <a-form-item>
                <a-input v-model="dormInfo.roomId" placeholder="请填写宿舍号" />
              </a-form-item>
            </a-col>
          </a-row>
        </a-form>
      </a-modal>
    </div>
  </div>
</template>

<script>
// import store from '@/store'
import 'ant-design-vue/lib/collapse/style'
import { mapActions } from 'vuex'
import VueQr from 'vue-qr'
export default {
  components: {
    VueQr
  },
  data () {
    return {
      config: { text: '' },
      hasAmmeter: false,
      ammeter: [],
      items: [],
      remain: [],
      fee: 10,
      dormInfo: {},
      addVisible: false,
      delVisible: false,
      indeterminate: true,
      checkAll: false,
      checkedList: [],
      isShow: false,
      myInterval: ''
    }
  },
  methods: {
    ...mapActions(['getAmmetersApi', 'addAmmeterApi', 'delAmmeterApi', 'eleSearchApi',
      'getDormByOtherApi', 'ammeterPayApi', 'getPayResultApi', 'payApi']),
    handleSuccess (res) {
      this.items = res.data.dorms
      if (this.items.length === 0) {
        this.hasAmmeter = false
      } else {
        this.hasAmmeter = true
        this.items.forEach(element => {
          const jsonData2 = { dormId: element.dormId, days: 1 }
          this.eleSearchApi(jsonData2).then(res2 => {
            console.log(res2)
            const tmp = res2.data.records
            tmp.forEach(ele => {
              this.remain.push(ele.elect)
            })
            this.ammeter.push(element.area + element.buildId + '-' + element.roomId)
          })
        })
      }
    },
    handlePay (index) {
      const jsonData2 = { dormId: this.items[index].dormId, fee: this.fee }
      this.ammeterPayApi(jsonData2).then(res => {
        console.log('res', res)
        this.config.text = 'http://p7yncc.natappfree.cc/pay?orderId=' + res.data.orderId
        this.isShow = true
        console.log('text', this.config.text)
        this.myInterval = setInterval(() => {
          setTimeout(this.handleCheck(res.data.orderId), 0)
        }, 10000)
      })
        .catch(err => { console.log('err', err) })
    },
    handleCheck (orderId) {
      const jsonData3 = { orderId: orderId }
      this.getPayResultApi(jsonData3).then(res2 => {
        console.log(this.myInterval)
        console.log('res2', res2)
        if (res2.code === 1) {
          this.isShow = false
          clearInterval(this.myInterval)
          this.$notification.success({
            message: '支付成功',
            description: '充值成功',
            duration: 1
          })
        }
      })
        .catch(err => console.log('err', err))
    },
    handleAdd () {
      this.addVisible = true
    },
    handleDel () {
      this.delVisible = true
    },
    addAmmeter (dormId) {
      const jsonData = { dormId: dormId }
      this.addAmmeterApi(jsonData).then(res => {
        if (this.ammeter.length === 0) this.hasAmmeter = true
        this.ammeter.push(this.dormInfo.area + this.dormInfo.buildId + '-' + this.dormInfo.roomId)
        this.dormInfo.dormId = dormId
        this.items.push(this.dormInfo)
        this.$message.success('添加成功', 1)
      })
        .catch(err => { console.log('err', err) })
        .finally()
    },
    handleAddOk () {
      this.addVisible = false
      this.getDormByOtherApi(this.dormInfo).then(res => { this.addAmmeter(res.data.dormId) })
        .catch(err => { console.log('err', err) })
        .finally()
    },
    handleDelOk () {
      this.delVisible = false
      const dorms = []
      this.checkedList.forEach(element => {
        const index = this.ammeter.indexOf(element)
        console.log(index)
        dorms.push(this.items[index].dormId)
        this.ammeter = this.ammeter.filter(item => item !== element)
        this.items = this.items.filter(item => item.dormId !== this.items[index].dormId)
      })
      this.delAmmeterApi({ dorms: dorms }).then(res => {
        this.$message.success('删除成功', 1)
        console.log(res)
      })
        .catch(err => { console.log('err', err) })
        .finally()
    },
    onChange (checkedList) {
      this.indeterminate = !!this.checkedList.length && this.checkedList.length < this.ammeter.length
      this.checkAll = this.checkedList.length === this.ammeter.length
    },
    onCheckAllChange (e) {
      Object.assign(this, {
        checkedList: e.target.checked ? this.ammeter : [],
        indeterminate: false,
        checkAll: e.target.checked
      })
    }
  },
  mounted () {
    this.getAmmetersApi()
      .then(res => { this.handleSuccess(res) })
      .catch(err => { console.log('err', err) })
      .finally()
  },
  destroyed () {
    clearInterval(this.myInterval)
  }
}
</script>

<style lang="less" scoped>
  #components-button-demo-button-group .ant-btn-group {
    margin-top: 10px;
  }
  #qrcode {
    text-align: center;
  }
</style>
