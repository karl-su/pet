// API配置文件

// 环境配置
const ENV = 'development' // development | production

// API基础URL配置
const API_CONFIG = {
  development: 'http://localhost:3000',
  production: 'https://your-production-domain.com' // 生产环境域名
}

// 获取当前环境的API基础URL
const getApiBaseUrl = () => {
  return API_CONFIG[ENV] || API_CONFIG.development
}

// 导出配置
module.exports = {
  // 当前环境
  ENV,
  
  // API基础URL
  apiBaseUrl: getApiBaseUrl(),
  
  // API路径配置
  apiPaths: {
    // 认证相关
    login: '/api/auth/login',
    updateUserInfo: '/api/auth/updateUserInfo',
    
    // 宠物相关
    pets: '/api/pets',
    petDetail: '/api/pets/:id',
    addPet: '/api/pets',
    updatePet: '/api/pets/:id',
    deletePet: '/api/pets/:id',
    
    // 地图和店铺相关
    stores: '/api/stores',
    storeDetail: '/api/stores/:id'
  },
  
  // 获取完整的API URL
  getFullUrl: function(path) {
    return this.apiBaseUrl + path
  },
  
  // 获取带参数的完整URL
  getUrlWithParams: function(path, params = {}) {
    let url = this.apiBaseUrl + path
    Object.keys(params).forEach(key => {
      url = url.replace(`:${key}`, params[key])
    })
    return url
  }
}