<template>
  <div>
    <div>
      <p v-if="hasOrder">请选择要查询的电表</p>
      <a-collapse v-if="hasOrder" accordion>
        <a-collapse-panel v-for="(value, index) in titles" :header="value" :key="index.toString()">
            <pay-order :order="orders[index]"></pay-order>
        </a-collapse-panel>
      </a-collapse>
    </div>
  </div>
</template>

<script>
// import store from '@/store'
import 'ant-design-vue/lib/collapse/style'
import payOrder from './payOrder'
export default {
  components: {
    payOrder
  },
  data () {
    return {
      // activeKey: ['1'],
      hasOrder: true,
      orders: [{ orderNum: '1234', payWhere: '华山9-121', createdTime: '2019/2/23', status: '充值成功', money: '50' },
        { orderNum: '1235', payWhere: '华山9-121', createdTime: '2019/2/24', status: '充值成功', money: '100' },
        { orderNum: '1236', payWhere: '华山9-121', createdTime: '2019/2/25', status: '充值失败', money: '200' }],
      titles: []
    }
  },
  methods: {},
  watch: {},
  created () {
    // if (store.getters.ammeter.length > 0) {
    //   this.hasAmmeter = true
    // } else {
    //   this.hasAmmeter = false
    // }
    // this.hasAmmeter = true
    var v
    for (v in this.orders) {
      this.titles.push(this.orders[v].createdTime + ' ' + this.orders[v].payWhere + ' ' + '¥' + this.orders[v].money + ' ' + this.orders[v].status)
    }
  }
}
</script>

<style lang="less" scoped>

</style>
