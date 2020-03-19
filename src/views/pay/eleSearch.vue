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
            <!-- <a-drawer
              title="用电查询"
              placement="right"
              :closable="false"
              @close="onClose"
              :visible="visible"
            >
              <p>Some contents...</p>
            </a-drawer> -->
          </div>
        </a-collapse-panel>
        <p v-if="hasRecord" style="margin:10px auto -10px">{{ title }}</p>
        <dormElect-analyse v-if="hasRecord" :itemsObj="getItems"></dormElect-analyse>
      </a-collapse>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import 'ant-design-vue/lib/collapse/style'
import dormElectAnalyse from './dormElectAnalyse'
export default {
  components: {
    dormElectAnalyse
  },
  data () {
    return {
      visible: false,
      Rvalue: '',
      hasAmmeter: true,
      ammeter: [],
      items: [],
      hasRecord: false,
      getItems: [],
      title: ''
    }
  },
  methods: {
    ...mapActions(['getAmmetersApi', 'eleSearchApi']),
    onChange (index) {
      const jsonData2 = { dormId: this.items[index].dormId, days: parseInt(this.Rvalue) }
      console.log(jsonData2)
      this.eleSearchApi(jsonData2).then(res => {
        const tmp = res.data.records
        tmp.forEach(ele => {
          ele.time = ele.time.slice(5, ele.time.length).replace(/-/, '/')
        })
        this.getItems = tmp
        this.title = this.ammeter[index] + '近' + this.Rvalue + '天的用电情况'
        this.hasRecord = true
        console.log('this.getItems', this.getItems)
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
