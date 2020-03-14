import api from './index'
import { axios } from '@/utils/request'

/**
 * 报修申请接口
 * parameter： {
 * userId,
 * name,
 * address,
 * telephone,
 * type,
 * detail,
 * time
 * }
 * @param {*} parameter
 */
export function repairApply (parameter) {
  return axios({
    url: api.repairApply,
    method: 'post',
    data: parameter
  })
}
/**
 *获取维修列表
 * @param {*} parameter
 */
export function getRepairList (parameter) {
  return axios({
    url: '/getRepairList',
    method: 'post',
    data: parameter
  })
}

/**
 * 获取该用户关联的电表
 */
export function getAmmeters () {
  return axios({
    url: '/getAmmeters',
    method: 'post'
  })
}

export function getDormById (params) {
  return axios({
    url: '/getDormById',
    method: 'post',
    data: params
  })
}

export function addDisobey (params) {
  return axios({
    url: '/addDisobey',
    method: 'post',
    data: params
  })
}

export function getDisobeyList (params) {
  return axios({
    url: '/getDisobeyList',
    method: 'post',
    data: params
  })
}
