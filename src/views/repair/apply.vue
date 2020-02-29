<template>
    <div id="components-form-demo-apply">
      <a-form class="ant-advanced-apply-form">
        <a-row :gutter="21">
          <a-col :span="7">
            <a-form-item class="ant-form-item" label="学号" >
             <a-input :value="info.username" />
            </a-form-item>
          </a-col>
          <a-col :span="7">
            <a-form-item class="ant-form-item" label="姓名">
             <a-input :value="info.name" />
            </a-form-item>
          </a-col>
          <a-col :span="7">
            <a-form-item class="ant-form-item" label="联系电话">
             <a-input />
            </a-form-item>
          </a-col>
        </a-row>
        <a-row :gutter="21">
          <a-col :span="7">
            <a-form-item class="ant-form-item" label="报修类别">
             <a-select :defaultValue="repairClass[0]">
               <a-select-option v-for="repairCla in repairClass" :key="repairCla">{{repairCla}} </a-select-option>
             </a-select>
             <a-select :defaultValue="repairClassConcrete[repairClass[0]][0]">
               <a-select-option v-for="repairC in repairClassConcrete[0]" :key="repairC">{{repairC}}</a-select-option>
             </a-select>
            </a-form-item>
          </a-col>
          <a-col :span="7">
            <a-form-item class="ant-form-item" label="所在校区">
             <a-select :defaultValue="area[0]">
               <a-select-option v-for="areaSCAU in area" :key="areaSCAU">{{areaSCAU}}</a-select-option>
             </a-select>
            </a-form-item>
          </a-col>
          <a-col :span="7">
            <a-form-item class="ant-form-item" label="申请时间">
              <a-input :value="time" />
            </a-form-item>
          </a-col>
        </a-row>

        <a-row :gutter="21">
          <a-col :span="7">
            <a-form-item class="ant-form-item" label="楼栋号">
             <a-input placeholder="请输入楼栋号" />
            </a-form-item>
          </a-col>
          <a-col :span="7">
            <a-form-item class="ant-form-item" label="宿舍号">
             <a-input placeholder="请输入宿舍号" />
            </a-form-item>
          </a-col>
          <a-col :span="7">
            <a-form-item class="ant-form-item" label="报修内容">
             <a-input placeholder="请描述具体损坏情况"/>
            </a-form-item>
          </a-col>
        </a-row>
        <a-row :gutter="21">
          <a-col :span="7"></a-col>
          <a-col :span="7"></a-col>
          <a-col :span="7">
            <a-button type="primary">提交</a-button>
          </a-col>
        </a-row>
      </a-form>
    </div>
</template>

<script>
import store from '@/store'
export default {
  data () {
    return {
      info: {},
      repairClass: ['厕所', '大厅', '浴室', '阳台'],
      repairClassConcrete: { 厕所: ['爆水管', '水管漏水', '门'], 大厅: ['天花灯', '插座', '空调'], 浴室: ['水龙头', '花洒', '天花灯'], 阳台: ['水龙头', '门', '天花灯', '洗手台漏水', '晾衣架'] },
      area: ['华山区', '泰山区', '燕山区'],
      time: '',
      visible: false
    }
  },
  methods: {
    // showDrawer () {
    //   this.visible = !this.visible
    // }
  },
  created () {
    this.info.username = store.getters.userInfo.username
    this.info.name = store.getters.userInfo.name
    this.time = (new Date()).toLocaleDateString()
  }
}
</script>

<style scoped>
#components-form-demo-apply {
  padding: 24px;
  background: #fbfbfb;
  border: 1px solid #d9d9d9;
  border-radius: 6px;
}
</style>
