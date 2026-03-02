// pages/pets/pets.js
Page({
  data: {
    pets: [
      {
        id: 1,
        name: '小白',
        type: '金毛犬',
        avatar: '/images/dog-avatar.png',
        description: '活泼可爱的金毛，喜欢玩球和游泳',
        age: '2岁',
        gender: '公',
        weight: '25kg',
        birthday: '2022-03-15',
        healthStatus: '健康'
      },
      {
        id: 2,
        name: '咪咪',
        type: '英短猫',
        avatar: '/images/cat-avatar.png',
        description: '温顺的英短猫，喜欢晒太阳和睡觉',
        age: '1岁',
        gender: '母',
        weight: '4kg',
        birthday: '2023-05-20',
        healthStatus: '健康'
      }
    ]
  },

  onLoad() {
    this.loadPets()
  },

  onShow() {
    this.loadPets()
  },

  loadPets() {
    const pets = wx.getStorageSync('pets') || this.data.pets
    this.setData({
      pets: pets
    })
  },

  addPet() {
    wx.navigateTo({
      url: '/pages/add-pet/add-pet'
    })
  },

  startAiConsultation(e) {
    const petId = e.currentTarget.dataset.id
    const petName = e.currentTarget.dataset.name
    wx.navigateTo({
      url: `/pages/ai-consultation/ai-consultation?petId=${petId}&petName=${petName}`
    })
  },

  editPet(e) {
    const petId = e.currentTarget.dataset.id
    wx.navigateTo({
      url: `/pages/edit-pet/edit-pet?id=${petId}`
    })
  },

  deletePet(e) {
    const petId = e.currentTarget.dataset.id
    const petName = e.currentTarget.dataset.name
    
    wx.showModal({
      title: '确认删除',
      content: `确定要删除宠物"${petName}"吗？`,
      success: (res) => {
        if (res.confirm) {
          this.removePet(petId)
        }
      }
    })
  },

  removePet(petId) {
    let pets = this.data.pets.filter(pet => pet.id !== petId)
    this.setData({
      pets: pets
    })
    wx.setStorageSync('pets', pets)
    wx.showToast({
      title: '删除成功',
      icon: 'success'
    })
  },

  viewPetDetail(e) {
    const petId = e.currentTarget.dataset.id
    wx.navigateTo({
      url: `/pages/pet-detail/pet-detail?id=${petId}`
    })
  }
})
