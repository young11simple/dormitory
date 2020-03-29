import { getAmmeters, getRepairList, getDormById, addDisobey, getDisobeyList,
  ammeterPay, delAmmeter, addAmmeter, getDormByOther, getPayRecord, eleSearch,
  repairing, getVisitRecords, addVisit, getUserInfo, getDorms, getHygienes,
  addHygiene, getUsersByDorm, repairDone, addStudent, logoffStudent, addNight,
  getNights, delNight, pay, getPayResult, resetPw } from '@/api/getInfo'
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
    getPayResultApi ({ commit }, params) {
      return new Promise((resolve, reject) => {
        getPayResult(params).then(response => {
          const result = response
          resolve(result)
        }).catch(error => {
          reject(error)
        })
      })
    },
    payApi ({ commit }, params) {
      return new Promise((resolve, reject) => {
        pay(params).then(response => {
          const result = response
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
    resetPwApi ({ commit }, params) {
      return new Promise((resolve, reject) => {
        resetPw(params).then(response => {
          const result = response
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
    // 获取电表
    getAmmetersApi ({ commit }) {
      return new Promise((resolve, reject) => {
        getAmmeters().then(response => {
          const result = response
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
    getUserInfoApi ({ commit }, params) {
      return new Promise((resolve, reject) => {
        getUserInfo(params).then(response => {
          const result = response
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
    eleSearchApi ({ commit }, params) {
      return new Promise((resolve, reject) => {
        eleSearch(params).then(response => {
          const result = response
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
    repairingApi ({ commit }, params) {
      return new Promise((resolve, reject) => {
        repairing(params).then(response => {
          const result = response
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
    getVisitRecordsApi ({ commit }, params) {
      return new Promise((resolve, reject) => {
        getVisitRecords(params).then(response => {
          const result = response
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
    addVisitApi ({ commit }, params) {
      return new Promise((resolve, reject) => {
        addVisit(params).then(response => {
          const result = response
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
    getDormsApi ({ commit }, params) {
      return new Promise((resolve, reject) => {
        getDorms(params).then(response => {
          const result = response
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
    getHygienesApi ({ commit }, params) {
      return new Promise((resolve, reject) => {
        getHygienes(params).then(response => {
          const result = response
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
    addHygieneApi ({ commit }, params) {
      return new Promise((resolve, reject) => {
        addHygiene(params).then(response => {
          const result = response
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
    getUsersByDormApi ({ commit }, params) {
      return new Promise((resolve, reject) => {
        getUsersByDorm(params).then(response => {
          const result = response
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
    repairDoneApi ({ commit }, params) {
      return new Promise((resolve, reject) => {
        repairDone(params).then(response => {
          const result = response
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
    addStudentApi ({ commit }, params) {
      return new Promise((resolve, reject) => {
        addStudent(params).then(response => {
          const result = response
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
    logoffStudentApi ({ commit }, params) {
      return new Promise((resolve, reject) => {
        logoffStudent(params).then(response => {
          const result = response
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
    getNightsApi ({ commit }, params) {
      return new Promise((resolve, reject) => {
        getNights(params).then(response => {
          const result = response
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
    addNightApi ({ commit }, params) {
      return new Promise((resolve, reject) => {
        addNight(params).then(response => {
          const result = response
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
    delNightApi ({ commit }, params) {
      return new Promise((resolve, reject) => {
        delNight(params).then(response => {
          const result = response
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
