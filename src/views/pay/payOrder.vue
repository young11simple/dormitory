<template>
  <div>
    <p><span :style="{marginRight:'40px'}">订单号码</span><span>{{ order.orderNum }}</span></p>
    <p><span :style="{marginRight:'40px'}">充值电表</span><span>{{ order.payWhere }}</span></p>
    <p><span :style="{marginRight:'40px'}">创建时间</span><span>{{ order.createdTime }}</span></p>
    <p><span :style="{marginRight:'40px'}">充值金额</span><span>{{ order.money }}</span></p>
    <p><span :style="{marginRight:'40px'}">订单状态</span><span>{{ order.status }}</span></p>
    <p><span :style="{marginRight:'40px'}">支付时间</span><span>{{ order.createdTime }}</span></p>
    <p><span :style="{marginRight:'40px'}">支付方式</span><span>{{ order.orderNum }}</span></p>
    <p><span :style="{marginRight:'40px'}">交易号码</span><span>{{ order.orderNum }}</span></p>
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
  }
}
</script>
