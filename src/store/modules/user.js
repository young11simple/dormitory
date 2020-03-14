import Vue from 'vue'
import { login, logout, updatePW } from '@/api/login'
import { ACCESS_TOKEN } from '../mutation-types'

const user = {
  state: {
    token: '',
    name: '',
    welcome: '',
    avatar: '',
    roles: [],
    info: {},
    password: ''
  },

  mutations: {
    SET_TOKEN: (state, token) => {
      state.token = token
    },
    SET_NAME: (state, { name, welcome }) => {
      state.name = name
      state.welcome = welcome
    },
    SET_AVATAR: (state, avatar) => {
      state.avatar = avatar
    },
    SET_PASSWORD: (state, password) => {
      state.password = password
    },
    SET_ROLES: (state, roles) => {
      state.roles = roles
    },
    SET_INFO: (state, info) => {
      state.info = info
    }
  },

  actions: {
    // 登录
    Login ({ commit }, userInfo) {
      return new Promise((resolve, reject) => {
        login(userInfo).then(response => {
          const result = response
          console.log('result:', result)
          if (result.code === 201) {
            reject(result)
          } else {
            commit('SET_INFO', result)
            commit('SET_TOKEN', result.token)
            Vue.ls.set(ACCESS_TOKEN, result.token)
            resolve()
          }
        }).catch(error => {
          reject(error)
        })
      })
    },

    // 修改密码
    UpdatePW ({ commit }, pwInfo) {
      return new Promise((resolve, reject) => {
        updatePW(pwInfo).then(response => {
          const result = response
          console.log('result:', result)
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

    // 登出
    Logout ({ commit, state }) {
      return new Promise((resolve) => {
        logout().then(() => {
          console.log('退出登录成功')
          resolve()
        }).catch(() => {
          resolve()
        }).finally(() => {
          commit('SET_TOKEN', '')
          commit('SET_ROLES', [])
          Vue.ls.remove(ACCESS_TOKEN)
        })
      })
    }
  }
}

export default user
