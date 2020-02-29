<template>
  <div>
    <div>
      <p v-if="hasAmmeter">请选择要充值的电表</p>
      <a-collapse v-if="hasAmmeter" accordion>
        <a-collapse-panel v-for="(value, index) in ammeter" :header="value" :key="index.toString()"></a-collapse-panel>
      </a-collapse>
    </div>
    <div id="components-button-demo-button-group">
      <a-button-group>
        <a-button type="primary"><a-icon type="close-square" />删除电表</a-button>
        <a-button type="primary"><a-icon type="plus-square" />添加电表</a-button>
      </a-button-group>
    </div>
  </div>
</template>

<script>
// import store from '@/store'
import 'ant-design-vue/lib/collapse/style'
export default {
  data () {
    return {
      // activeKey: ['1'],
      hasAmmeter: true,
      ammeter: ['华山9-121', '泰山23-206', '泰山23-207']
    }
  },
  methods: {},
  watch: {}
  //   created () {
  //     if (store.getters.ammter.length > 0) {
  //       this.hasAmmeter = true
  //     } else {
  //       this.hasAmmeter = false
  //     }
  //     this.hasAmmeter = true
  //   }
}
</script>

<style lang="less" scoped>
  #components-button-demo-button-group .ant-btn-group {
    margin-top: 10px;
  }
</style>
