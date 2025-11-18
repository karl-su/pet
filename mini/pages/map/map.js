// pages/map/map.js
Page({
  data: {
    latitude: 39.908823,
    longitude: 116.397470,
    markers: [
      {
        id: 1,
        latitude: 39.908823,
        longitude: 116.397470,
        title: '宠物医院A',
        iconPath: '/images/marker.png',
        width: 30,
        height: 30
      },
      {
        id: 2,
        latitude: 39.910823,
        longitude: 116.399470,
        title: '宠物店B',
        iconPath: '/images/marker.png',
        width: 30,
        height: 30
      },
      {
        id: 3,
        latitude: 39.906823,
        longitude: 116.395470,
        title: '宠物美容院C',
        iconPath: '/images/marker.png',
        width: 30,
        height: 30
      }
    ],
    petStores: [
      {
        id: 1,
        name: '爱心宠物医院',
        address: '北京市朝阳区建国路88号',
        distance: '500m',
        phone: '010-12345678',
        services: ['宠物医疗', '疫苗接种', '健康检查'],
        rating: 4.8
      },
      {
        id: 2,
        name: '萌宠生活馆',
        address: '北京市朝阳区三里屯路12号',
        distance: '800m',
        phone: '010-87654321',
        services: ['宠物用品', '宠物食品', '宠物玩具'],
        rating: 4.6
      },
      {
        id: 3,
        name: '美丽宠物美容院',
        address: '北京市朝阳区工体北路66号',
        distance: '1.2km',
        phone: '010-11223344',
        services: ['宠物美容', '宠物洗澡', '宠物造型'],
        rating: 4.9
      }
    ]
  },

  onLoad() {
    this.getCurrentLocation()
  },

  getCurrentLocation() {
    wx.getLocation({
      type: 'gcj02',
      success: (res) => {
        this.setData({
          latitude: res.latitude,
          longitude: res.longitude
        })
      },
      fail: () => {
        wx.showToast({
          title: '获取位置失败',
          icon: 'none'
        })
      }
    })
  },

  onMarkerTap(e) {
    const markerId = e.detail.markerId
    const store = this.data.petStores.find(store => store.id === markerId)
    if (store) {
      wx.showModal({
        title: store.name,
        content: `地址：${store.address}\n电话：${store.phone}`,
        showCancel: false
      })
    }
  },

  callStore(e) {
    const phone = e.currentTarget.dataset.phone
    wx.makePhoneCall({
      phoneNumber: phone
    })
  },

  navigateToStore(e) {
    const store = e.currentTarget.dataset.store
    // 跳转到宠物站详情页
    wx.navigateTo({
      url: `/pages/store-detail/store-detail?id=${store.id}`
    })
  },

  // 真正的导航功能
  openLocation(e) {
    const store = e.currentTarget.dataset.store
    wx.openLocation({
      latitude: this.data.markers[store.id - 1].latitude,
      longitude: this.data.markers[store.id - 1].longitude,
      name: store.name,
      address: store.address
    })
  }
})
