// 请求工具类
const config = require('../config/config.js')

// 通用请求方法
function request(options) {
  const { url, method = 'GET', data = {}, header = {} } = options
  
  // 获取token
  const token = wx.getStorageSync('token')
  
  // 合并请求头
  const requestHeader = {
    'Content-Type': 'application/json',
    ...header
  }
  
  // 如果有token，自动添加到请求头
  if (token) {
    requestHeader['Authorization'] = `Bearer ${token}`
  }
  
  return new Promise((resolve, reject) => {
    wx.request({
      url: config.getFullUrl(url),
      method: method,
      data: data,
      header: requestHeader,
      success: (res) => {
        if (res.statusCode === 200) {
          resolve(res.data)
        } else {
          reject({
            statusCode: res.statusCode,
            data: res.data,
            message: '请求失败'
          })
        }
      },
      fail: (err) => {
        reject({
          message: '网络请求失败',
          error: err
        })
      }
    })
  })
}

// GET请求
function get(url, data = {}) {
  return request({
    url: url,
    method: 'GET',
    data: data
  })
}

// POST请求
function post(url, data = {}) {
  return request({
    url: url,
    method: 'POST',
    data: data
  })
}

// PUT请求
function put(url, data = {}) {
  return request({
    url: url,
    method: 'PUT',
    data: data
  })
}

// DELETE请求
function del(url, data = {}) {
  return request({
    url: url,
    method: 'DELETE',
    data: data
  })
}

module.exports = {
  request,
  get,
  post,
  put,
  delete: del
}