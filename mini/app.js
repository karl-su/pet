const config = require('./config/config.js')
const request = require('./utils/request.js')

App({
  onLaunch() {
    // 展示本地存储能力
    const logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)
    
    this.login()
  },

  login() {
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
        if (res.code) {
          request.post(config.apiPaths.login, {
            code: res.code
          }).then(response => {
            if (response.success) {
              // 保存token
              wx.setStorageSync('token', response.data.token);
              this.globalData.userInfo = response.data.user;
            }
          }).catch(err => {
            console.error('登录请求失败:', err);
          });
        }
      }
    })
  },
  
  // 获取用户信息
  getUserProfile() {
    return new Promise((resolve, reject) => {
      wx.getUserProfile({
        desc: '用于完善会员资料',
        success: (res) => {
          const userInfo = res.userInfo;
          
          // 更新用户信息到服务器
          if (this.globalData.userInfo) {
            request.post(config.apiPaths.updateUserInfo, {
              userId: this.globalData.userInfo.id,
              userInfo: userInfo
            }).then(() => {
              this.globalData.userInfo = { ...this.globalData.userInfo, ...userInfo };
              resolve(userInfo);
            }).catch(err => {
              console.error('更新用户信息失败:', err);
              resolve(userInfo); // 即使更新失败也返回用户信息
            });
          } else {
            resolve(userInfo);
          }
        },
        fail: (err) => {
          reject(err);
        }
      });
    });
  },
    
  globalData: {
    userInfo: null
  }
})
