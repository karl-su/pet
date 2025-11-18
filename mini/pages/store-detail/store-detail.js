// pages/store-detail/store-detail.js
Page({
  data: {
    storeInfo: {
      id: 1,
      name: '爱心宠物医院',
      address: '北京市朝阳区建国路88号',
      phone: '010-12345678',
      rating: 4.8,
      services: ['宠物医疗', '疫苗接种', '健康检查', '手术', '住院'],
      businessHours: '09:00-21:00',
      description: '专业的宠物医疗服务，拥有经验丰富的兽医团队，为您的爱宠提供全方位的健康保障。',
      images: [
        '/images/store1.jpg',
        '/images/store2.jpg',
        '/images/store3.jpg'
      ]
    },
    currentTab: 0,
    tabs: ['详情', '服务', '评价']
  },

  onLoad(options) {
    // 从页面参数获取宠物站ID
    const storeId = options.id
    if (storeId) {
      this.loadStoreInfo(storeId)
    }
  },

  loadStoreInfo(storeId) {
    // 这里可以根据storeId从服务器获取具体的宠物站信息
    // 目前使用模拟数据
    const stores = [
      {
        id: 1,
        name: '爱心宠物医院',
        address: '北京市朝阳区建国路88号',
        phone: '010-12345678',
        rating: 4.8,
        services: ['宠物医疗', '疫苗接种', '健康检查', '手术', '住院'],
        businessHours: '09:00-21:00',
        description: '专业的宠物医疗服务，拥有经验丰富的兽医团队，为您的爱宠提供全方位的健康保障。',
        images: ['/images/store1.jpg', '/images/store2.jpg', '/images/store3.jpg']
      },
      {
        id: 2,
        name: '萌宠生活馆',
        address: '北京市朝阳区三里屯路12号',
        phone: '010-87654321',
        rating: 4.6,
        services: ['宠物用品', '宠物食品', '宠物玩具', '宠物寄养'],
        businessHours: '10:00-22:00',
        description: '一站式宠物生活服务，提供优质宠物用品和寄养服务。',
        images: ['/images/store1.jpg', '/images/store2.jpg', '/images/store3.jpg']
      },
      {
        id: 3,
        name: '美丽宠物美容院',
        address: '北京市朝阳区工体北路66号',
        phone: '010-11223344',
        rating: 4.9,
        services: ['宠物美容', '宠物洗澡', '宠物造型', '宠物SPA'],
        businessHours: '09:30-20:30',
        description: '专业宠物美容服务，让您的爱宠更加美丽动人。',
        images: ['/images/store1.jpg', '/images/store2.jpg', '/images/store3.jpg']
      }
    ]
    
    const store = stores.find(s => s.id == storeId)
    if (store) {
      this.setData({
        storeInfo: store
      })
    }
  },

  onTabChange(e) {
    const tabIndex = e.currentTarget.dataset.index
    this.setData({
      currentTab: tabIndex
    })
  },

  // 预约功能
  makeAppointment() {
    wx.showModal({
      title: '预约服务',
      content: '是否要预约该宠物站的服务？',
      success: (res) => {
        if (res.confirm) {
          wx.showToast({
            title: '预约功能开发中',
            icon: 'none'
          })
        }
      }
    })
  },

  // 查看就诊记录
  viewMedicalRecords() {
    wx.showToast({
      title: '就诊记录功能开发中',
      icon: 'none'
    })
  },

  // 拨打电话
  callStore() {
    wx.makePhoneCall({
      phoneNumber: this.data.storeInfo.phone
    })
  },

  // 导航到宠物站
  navigateToStore() {
    wx.openLocation({
      latitude: 39.908823,
      longitude: 116.397470,
      name: this.data.storeInfo.name,
      address: this.data.storeInfo.address
    })
  },

  // 收藏宠物站
  toggleFavorite() {
    wx.showToast({
      title: '收藏功能开发中',
      icon: 'none'
    })
  }
})
