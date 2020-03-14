import { getAmmeters, getRepairList, getDormById, addDisobey, getDisobeyList } from '@/api/getInfo'
const APIs = {
  state: {
    ammeter: []
  },
  mutations: {
    SET_AMMETER: (state, ammeter) => {
      state.ammeter = ammeter
    }
  },
  actions: {
    // 获取电表
    getAmmetersApi ({ commit }) {
      return new Promise((resolve, reject) => {
        getAmmeters().then(response => {
          const result = response
          console.log('getAmmetersApi result:', result)
          if (result.code === 200) {
            resolve(result)
          } else {
            reject(result)
          }
        }).catch(error => {
          reject(error)
        })
      })
    },
    // 获取维修列表
    getRepairListApi ({ commit }, params) {
      return new Promise((resolve, reject) => {
        getRepairList(params).then(response => {
          const result = response
          console.log('getRepairListApi result:', result)
          if (result.code === 200) {
            resolve(result)
          } else {
            reject(result)
          }
        }).catch(error => {
          reject(error)
        })
      })
    },
    getDormByIdApi ({ commit }, params) {
      return new Promise((resolve, reject) => {
        getDormById(params).then(response => {
          const result = response
          console.log('getDormByIdApi result:', result)
          if (result.code === 200) {
            resolve(result)
          } else {
            reject(result)
          }
        }).catch(error => {
          reject(error)
        })
      })
    },
    addDisobeyApi ({ commit }, params) {
      return new Promise((resolve, reject) => {
        addDisobey(params).then(response => {
          const result = response
          console.log('addDisobeyApi result:', result)
          if (result.code === 200) {
            resolve(result)
          } else {
            reject(result)
          }
        }).catch(error => {
          reject(error)
        })
      })
    },
    getDisobeyListApi ({ commit }, params) {
      return new Promise((resolve, reject) => {
        getDisobeyList(params).then(response => {
          const result = response
          console.log('getDisobeyListApi result:', result)
          if (result.code === 200) {
            resolve(result)
          } else {
            reject(result)
          }
        }).catch(error => {
          reject(error)
        })
      })
    }
  }
}
export default APIs
