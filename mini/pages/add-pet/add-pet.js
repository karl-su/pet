// pages/add-pet/add-pet.js
Page({
  data: {
    formData: {
      name: '',
      type: '',
      description: '',
      age: '',
      gender: '公',
      weight: '',
      birthday: '',
      healthStatus: '健康'
    },
    genderOptions: ['公', '母'],
    healthOptions: ['健康', '生病', '康复中']
  },

  onLoad() {
    // 设置默认生日为今天
    const today = new Date()
    const birthday = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`
    this.setData({
      'formData.birthday': birthday
    })
  },

  onInputChange(e) {
    const field = e.currentTarget.dataset.field
    const value = e.detail.value
    this.setData({
      [`formData.${field}`]: value
    })
  },

  onGenderChange(e) {
    this.setData({
      'formData.gender': this.data.genderOptions[e.detail.value]
    })
  },

  onHealthChange(e) {
    this.setData({
      'formData.healthStatus': this.data.healthOptions[e.detail.value]
    })
  },

  onBirthdayChange(e) {
    this.setData({
      'formData.birthday': e.detail.value
    })
  },

  chooseAvatar() {
    wx.chooseImage({
      count: 1,
      sizeType: ['compressed'],
      sourceType: ['album', 'camera'],
      success: (res) => {
        this.setData({
          'formData.avatar': res.tempFilePaths[0]
        })
      }
    })
  },

  savePet() {
    const { formData } = this.data
    
    // 验证必填字段
    if (!formData.name.trim()) {
      wx.showToast({
        title: '请输入宠物姓名',
        icon: 'none'
      })
      return
    }
    
    if (!formData.type.trim()) {
      wx.showToast({
        title: '请输入宠物类型',
        icon: 'none'
      })
      return
    }

    // 获取现有宠物列表
    let pets = wx.getStorageSync('pets') || []
    
    // 创建新宠物对象
    const newPet = {
      id: Date.now(), // 简单的ID生成
      name: formData.name,
      type: formData.type,
      avatar: formData.avatar || '/images/default-pet.png',
      description: formData.description,
      age: formData.age,
      gender: formData.gender,
      weight: formData.weight,
      birthday: formData.birthday,
      healthStatus: formData.healthStatus
    }
    
    // 添加到列表
    pets.push(newPet)
    
    // 保存到本地存储
    wx.setStorageSync('pets', pets)
    
    wx.showToast({
      title: '添加成功',
      icon: 'success'
    })
    
    // 返回上一页
    setTimeout(() => {
      wx.navigateBack()
    }, 1500)
  }
})
