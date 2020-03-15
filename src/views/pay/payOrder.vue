<template>
  <div>
    <p><span :style="{marginRight:'40px'}">订单号码</span><span>{{ order.orderId }}</span></p>
    <p><span :style="{marginRight:'40px'}">充值电表</span><span>{{ payWhere }}</span></p>
    <p><span :style="{marginRight:'40px'}">支付时间</span><span>{{ time }}</span></p>
    <p><span :style="{marginRight:'40px'}">充值金额</span><span>{{ order.fee }}元</span></p>
  </div>
</template>

<script>
export default {
  props: {
    order: {
      type: Object,
      default: function () {
        return { message: 'NOTHING' }
      }
    }
  },
  data () {
    return {
      payWhere: this.order.area + this.order.buildId + '-' + this.order.roomId,
      time: this.order.time.replace(/T/, ' ').slice(0, this.order.time.indexOf('.'))
    }
  }
}
</script>
