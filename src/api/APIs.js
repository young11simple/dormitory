import { repairApply, getAmmeters, getRepairList } from '@/api/getInfo'
/**
 * 申请报修接口
 * @param {*} params
 */
export function repairApplyApi (params) {
  return new Promise((resolve, reject) => {
    repairApply(params).then(response => {
      const result = response
      console.log('repairApplyApi result:', result)
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
export function getRepairListApi (params) {
  return new Promise((resolve, reject) => {
    getRepairList(params).then(response => {
      const result = response
      console.log('repairApplyApi result:', result)
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

export default function getAmmetersApi () {
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
}
