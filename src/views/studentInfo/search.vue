<template>
    <div>
        <import-data @getResult="getResult"></import-data>
    </div>
</template>
<script>
import importData from '../management/importData'
export default {
  components: {
    importData
  },
  methods: {
    getResult (values) {
      console.log('getResult', values)
    }
  }
}
</script>
