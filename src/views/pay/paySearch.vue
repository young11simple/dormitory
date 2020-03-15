<template>
  <div>
    <div>
      <p v-if="hasOrder">充值记录如下</p>
      <p v-else>无充值记录</p>
      <a-collapse v-if="hasOrder" accordion>
        <a-collapse-panel v-for="(value, index) in orders" :header="value" :key="index.toString()">
          <pay-order :order="items[index]"></pay-order>
        </a-collapse-panel>
      </a-collapse>
    </div>
  </div>
</template>

<script>
import 'ant-design-vue/lib/collapse/style'
import payOrder from './payOrder'
import { mapActions } from 'vuex'
export default {
  components: {
    payOrder
  },
  data () {
    return {
      hasOrder: true,
      orders: [],
      items: []
    }
  },
  methods: {
    ...mapActions(['getPayRecordApi'])
  },
  watch: {},
  mounted () {
    this.getPayRecordApi().then(res => {
      console.log(res.data)
      this.items = res.data.payRecord
      if (this.items.length === 0) {
        this.hasOrder = false
      } else {
        this.hasOrder = true
        this.items.forEach(element => {
          const time = element.time.replace(/T/, ' ').slice(0, element.time.indexOf('.'))
          this.orders.push(time + ' ' + element.area + element.buildId + '-' + element.roomId + ' ¥' + element.fee)
        })
      }
    })
      .catch(err => { console.log('err', err) })
      .finally()
  }
}
</script>

<style lang="less" scoped>

</style>
