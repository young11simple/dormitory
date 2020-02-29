<template>
  <div>
    <div>
      <p v-if="hasAmmeter">请选择要查询的电表</p>
      <a-collapse v-if="hasAmmeter" accordion>
        <a-collapse-panel v-for="(value, index) in ammter" :header="value" :key="index.toString()">
            <div>
                <span :style="{marginRight:'10px'}">请选择查询时间</span>
                <a-radio-group @change="onChange" v-model="Rvalue">
                    <a-radio-button value="a">一周内</a-radio-button>
                    <a-radio-button value="b">一个月内</a-radio-button>
                    <a-radio-button value="c">三个月内</a-radio-button>
                    <a-radio-button value="d">六个月内</a-radio-button>
                    <a-radio-button value="e">一年内</a-radio-button>
                </a-radio-group>
                <a-drawer
                    title="用电查询"
                    placement="right"
                    :closable="false"
                    @close="onClose"
                    :visible="visible"
                >
                    <p>Some contents...</p>
                </a-drawer>
            </div>
        </a-collapse-panel>
      </a-collapse>
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
      visible: false,
      Rvalue: 'a',
      hasAmmeter: true,
      ammter: ['华山9-121', '泰山23-206']
    }
  },
  methods: {
    onChange (e) {
      this.visible = true
      console.log(`checked = ${e.target.value}`)
    },
    onClose () {
      this.visible = false
    }
  },
  watch: {}
  //   created () {
  //     if (store.getters.ammeter.length > 0) {
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
