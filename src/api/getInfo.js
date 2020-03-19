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

export function getUserInfo (parameter) {
  return axios({
    url: '/getUserInfo',
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

export function addAmmeter (params) {
  return axios({
    url: '/addAmmeter',
    method: 'post',
    data: params
  })
}

export function delAmmeter (params) {
  return axios({
    url: '/delAmmeter',
    method: 'post',
    data: params
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

export function getDormByOther (params) {
  return axios({
    url: '/getDormByOther',
    method: 'post',
    data: params
  })
}

export function getDorms (params) {
  return axios({
    url: '/getDorms',
    method: 'post',
    data: params
  })
}
export function getHygienes (params) {
  return axios({
    url: '/getHygienes',
    method: 'post',
    data: params
  })
}
export function addHygiene (params) {
  return axios({
    url: '/addHygiene',
    method: 'post',
    data: params
  })
}
export function getUsersByDorm (params) {
  return axios({
    url: '/getUsersByDorm',
    method: 'post',
    data: params
  })
}

export function ammeterPay (params) {
  return axios({
    url: '/ammeterPay',
    method: 'post',
    data: params
  })
}
export function getPayRecord () {
  return axios({
    url: '/getPayRecord',
    method: 'post'
  })
}
export function eleSearch (params) {
  return axios({
    url: '/eleSearch',
    method: 'post',
    data: params
  })
}
export function repairing (params) {
  return axios({
    url: '/repairing',
    method: 'post',
    data: params
  })
}
export function getVisitRecords (params) {
  return axios({
    url: '/getVisitRecords',
    method: 'post',
    data: params
  })
}
export function addVisit (params) {
  return axios({
    url: '/addVisit',
    method: 'post',
    data: params
  })
}
export function repairDone (params) {
  return axios({
    url: '/repairDone',
    method: 'post',
    data: params
  })
}
export function addStudent (params) {
  return axios({
    url: '/addStudent',
    method: 'post',
    data: params
  })
}
export function logoffStudent (params) {
  return axios({
    url: '/logoffStudent',
    method: 'post',
    data: params
  })
}
