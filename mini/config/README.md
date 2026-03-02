# API配置管理说明

## 📁 目录结构

```
mini/
├── config/
│   └── config.js      # API配置文件
├── utils/
│   └── request.js     # 请求工具类
└── app.js             # 应用入口文件
```

## 🚀 快速开始

### 1. 环境切换

在 `config/config.js` 中修改 `ENV` 变量：

```javascript
// 开发环境
const ENV = 'development'

// 生产环境
const ENV = 'production'
```

### 2. 配置API地址

在 `config/config.js` 中配置不同环境的API基础URL：

```javascript
const API_CONFIG = {
  development: 'http://localhost:3000',
  production: 'https://your-production-domain.com'
}
```

### 3. 添加新的API路径

在 `config/config.js` 的 `apiPaths` 对象中添加新的API路径：

```javascript
apiPaths: {
  // 现有路径...
  yourNewApi: '/api/your-new-path'
}
```

## 📖 使用方法

### 在页面中引入配置和请求工具

```javascript
const config = require('../../config/config.js')
const request = require('../../utils/request.js')

Page({
  onLoad() {
    this.loadData()
  },
  
  loadData() {
    // 使用GET请求
    request.get(config.apiPaths.pets)
      .then(data => {
        this.setData({ pets: data })
      })
      .catch(err => {
        console.error('加载失败:', err)
      })
  }
})
```

### 常用请求方法

#### GET请求

```javascript
request.get(config.apiPaths.pets)
  .then(data => {
    console.log('获取数据成功:', data)
  })
  .catch(err => {
    console.error('请求失败:', err)
  })
```

#### POST请求

```javascript
request.post(config.apiPaths.addPet, {
  name: '小白',
  type: '金毛犬'
})
  .then(data => {
    console.log('添加成功:', data)
  })
  .catch(err => {
    console.error('添加失败:', err)
  })
```

#### PUT请求

```javascript
request.put(config.apiPaths.updatePet, {
  id: 1,
  name: '小白',
  type: '金毛犬'
})
  .then(data => {
    console.log('更新成功:', data)
  })
  .catch(err => {
    console.error('更新失败:', err)
  })
```

#### DELETE请求

```javascript
request.delete(config.apiPaths.deletePet, {
  id: 1
})
  .then(data => {
    console.log('删除成功:', data)
  })
  .catch(err => {
    console.error('删除失败:', err)
  })
```

### 带参数的URL

```javascript
// 使用getUrlWithParams方法处理带参数的URL
const url = config.getUrlWithParams(config.apiPaths.petDetail, { id: 1 })
// 结果: http://localhost:3000/api/pets/1

request.get(url)
  .then(data => {
    console.log('获取详情成功:', data)
  })
```

## ✨ 特性

1. **环境切换**：一键切换开发/生产环境
2. **自动Token**：request工具类自动从本地存储获取token并添加到请求头
3. **Promise支持**：使用Promise封装，支持async/await语法
4. **统一错误处理**：统一的错误处理机制
5. **路径集中管理**：所有API路径集中配置，避免硬编码
6. **类型安全**：支持URL参数替换

## 🔧 配置说明

### config/config.js

- `ENV`: 当前环境（development/production）
- `apiBaseUrl`: 当前环境的API基础URL
- `apiPaths`: 所有API路径的配置对象
- `getFullUrl(path)`: 获取完整的API URL
- `getUrlWithParams(path, params)`: 获取带参数的完整URL

### utils/request.js

- `request(options)`: 通用请求方法
- `get(url, data)`: GET请求
- `post(url, data)`: POST请求
- `put(url, data)`: PUT请求
- `delete(url, data)`: DELETE请求

## 📝 示例代码

### 完整的页面示例

```javascript
const config = require('../../config/config.js')
const request = require('../../config/request.js')

Page({
  data: {
    pets: []
  },

  onLoad() {
    this.loadPets()
  },

  // 加载宠物列表
  loadPets() {
    request.get(config.apiPaths.pets)
      .then(data => {
        this.setData({ pets: data })
      })
      .catch(err => {
        wx.showToast({
          title: '加载失败',
          icon: 'none'
        })
      })
  },

  // 添加宠物
  addPet(petData) {
    request.post(config.apiPaths.addPet, petData)
      .then(data => {
        wx.showToast({
          title: '添加成功',
          icon: 'success'
        })
        this.loadPets() // 重新加载数据
      })
      .catch(err => {
        wx.showToast({
          title: '添加失败',
          icon: 'none'
        })
      })
  },

  // 删除宠物
  deletePet(petId) {
    const url = config.getUrlWithParams(config.apiPaths.deletePet, { id: petId })
    request.delete(url)
      .then(() => {
        wx.showToast({
          title: '删除成功',
          icon: 'success'
        })
        this.loadPets() // 重新加载数据
      })
      .catch(err => {
        wx.showToast({
          title: '删除失败',
          icon: 'none'
        })
      })
  }
})
```

## ⚠️ 注意事项

1. 生产环境部署前，请确保修改 `ENV` 为 `production`
2. 生产环境的域名需要配置HTTPS
3. Token会自动从本地存储中获取并添加到请求头
4. 所有请求都返回Promise，推荐使用async/await语法
5. URL参数使用 `:paramName` 格式，通过 `getUrlWithParams` 方法替换

## 🎯 最佳实践

1. **统一引入**：在每个需要请求API的页面顶部统一引入config和request
2. **错误处理**：每个请求都应该有相应的错误处理
3. **加载状态**：在请求过程中显示加载状态
4. **数据验证**：在发送请求前验证必要参数
5. **环境隔离**：开发和生产环境使用不同的数据库和配置