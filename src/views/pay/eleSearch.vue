<template>
  <div>
    <div>
      <p v-if="hasAmmeter">请选择要查询的电表</p>
      <p v-else>无绑定电表</p>
      <a-collapse v-if="hasAmmeter" accordion>
        <a-collapse-panel v-for="(value, index) in ammeter" :header="value" :key="index.toString()">
          <div>
            <span :style="{marginRight:'10px'}">请选择查询时间</span>
            <a-radio-group @change="onChange(index)" v-model="Rvalue">
              <a-radio-button value="3">三天内</a-radio-button>
              <a-radio-button value="7">一周内</a-radio-button>
              <a-radio-button value="15">半个月内</a-radio-button>
              <a-radio-button value="30">一个月内</a-radio-button>
              <a-radio-button value="90">三个月内</a-radio-button>
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
import { mapActions } from 'vuex'
import 'ant-design-vue/lib/collapse/style'
export default {
  data () {
    return {
      // activeKey: ['1'],
      visible: false,
      Rvalue: '3',
      hasAmmeter: true,
      ammeter: [],
      items: []
    }
  },
  methods: {
    ...mapActions(['getAmmetersApi', 'eleSearchApi']),
    onChange (index) {
      this.visible = true
      // console.log(`checked = ${e.target.value}`)
      const jsonData2 = { dormId: this.items[index].dormId, days: this.Rvalue }
      console.log(jsonData2)
      this.eleSearchApi(jsonData2).then(res => {
        console.log(res)
      })
        .catch(err => { console.log('err', err) })
        .finally()
    },
    onClose () {
      this.visible = false
    },
    handleSuccess (res) {
      this.items = res.data.dorms
      if (this.items.length === 0) {
        this.hasAmmeter = false
      } else {
        this.hasAmmeter = true
        this.items.forEach(element => {
          this.ammeter.push(element.area + element.buildId + '-' + element.roomId)
        })
      }
    }
  },
  watch: {},
  mounted () {
    this.getAmmetersApi()
      .then(res => { this.handleSuccess(res) })
      .catch(err => { console.log('err', err) })
      .finally()
  }
}
</script>

<style lang="less" scoped>
  #components-button-demo-button-group .ant-btn-group {
    margin-top: 10px;
  }
</style>
