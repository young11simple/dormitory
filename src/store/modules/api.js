import { getAmmeters, getRepairList, getDormById, addDisobey, getDisobeyList,
  ammeterPay, delAmmeter, addAmmeter, getDormByOther, getPayRecord, eleSearch } from '@/api/getInfo'
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
    addAmmeterApi ({ commit }, params) {
      return new Promise((resolve, reject) => {
        addAmmeter(params).then(response => {
          const result = response
          console.log('addAmmeterApi result:', result)
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
    delAmmeterApi ({ commit }, params) {
      return new Promise((resolve, reject) => {
        delAmmeter(params).then(response => {
          const result = response
          console.log('delAmmeterApi result:', result)
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
    },
    getDormByOtherApi ({ commit }, params) {
      return new Promise((resolve, reject) => {
        getDormByOther(params).then(response => {
          const result = response
          console.log('getDormByOtherApi result:', result)
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
    ammeterPayApi ({ commit }, params) {
      return new Promise((resolve, reject) => {
        ammeterPay(params).then(response => {
          const result = response
          console.log('ammeterPayApi result:', result)
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
    getPayRecordApi () {
      return new Promise((resolve, reject) => {
        getPayRecord().then(response => {
          const result = response
          console.log('getPayRecordApi result:', result)
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
    eleSearchApi (params) {
      return new Promise((resolve, reject) => {
        eleSearch(params).then(response => {
          const result = response
          console.log('eleSearchApi result:', result)
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
