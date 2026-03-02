// pages/ai-consultation/ai-consultation.js
Page({
  data: {
    petId: '',
    petName: '',
    messages: [],
    inputValue: '',
    scrollToBottom: false
  },

  onLoad(options) {
    const { petId, petName } = options
    this.setData({
      petId: petId,
      petName: petName
    })
    
    // 添加欢迎消息
    this.addMessage('ai', `你好！我是AI宠物医生，很高兴为${petName}提供问诊服务。请描述${petName}的症状，或者上传${petName}的照片，我会尽力为您提供专业的医疗建议。`)
  },

  onReady() {
    this.scrollToBottom()
  },

  // 添加消息到对话列表
  addMessage(type, content, image = '') {
    const messages = this.data.messages
    messages.push({
      id: Date.now(),
      type: type,
      content: content,
      image: image,
      time: this.formatTime(new Date())
    })
    this.setData({
      messages: messages,
      scrollToBottom: true
    })
    this.scrollToBottom()
  },

  // 格式化时间
  formatTime(date) {
    const hour = date.getHours().toString().padStart(2, '0')
    const minute = date.getMinutes().toString().padStart(2, '0')
    return `${hour}:${minute}`
  },

  // 输入框内容变化
  onInputChange(e) {
    this.setData({
      inputValue: e.detail.value
    })
  },

  // 发送消息
  sendMessage() {
    const content = this.data.inputValue.trim()
    if (!content) {
      wx.showToast({
        title: '请输入内容',
        icon: 'none'
      })
      return
    }

    // 添加用户消息
    this.addMessage('user', content)
    this.setData({
      inputValue: ''
    })

    // 模拟AI回复
    this.simulateAiResponse(content)
  },

  // 模拟AI回复
  simulateAiResponse(userMessage) {
    wx.showLoading({
      title: 'AI思考中...',
      mask: true
    })

    // 模拟网络请求延迟
    setTimeout(() => {
      wx.hideLoading()
      
      const responses = [
        `根据您的描述，${this.data.petName}可能出现了这种情况。建议您观察一下${this.data.petName}的食欲和精神状态，如果持续不改善，建议及时就医。`,
        `感谢您的描述。这种情况在宠物中比较常见，通常可以通过调整饮食和生活习惯来改善。您可以尝试给${this.data.petName}提供更舒适的环境。`,
        `我理解您的担心。根据症状分析，建议您注意以下几点：1. 保持环境清洁 2. 定期观察${this.data.petName}的状态 3. 如症状加重请及时就医。`,
        `这个问题需要更多细节才能准确判断。您能提供更多关于${this.data.petName}的症状信息吗？比如症状持续的时间、是否有其他异常表现等。`,
        `根据您的描述，这可能是轻微的健康问题。建议您先观察24-48小时，如果症状没有改善或加重，请尽快联系兽医进行专业检查。`
      ]
      
      const randomResponse = responses[Math.floor(Math.random() * responses.length)]
      this.addMessage('ai', randomResponse)
    }, 1500)
  },

  // 选择图片
  chooseImage() {
    wx.chooseImage({
      count: 1,
      sizeType: ['compressed'],
      sourceType: ['album', 'camera'],
      success: (res) => {
        const tempFilePath = res.tempFilePaths[0]
        
        // 添加用户图片消息
        this.addMessage('user', '上传了图片', tempFilePath)
        
        // 模拟AI分析图片
        this.simulateAiImageAnalysis(tempFilePath)
      },
      fail: (err) => {
        console.error('选择图片失败:', err)
        wx.showToast({
          title: '选择图片失败',
          icon: 'none'
        })
      }
    })
  },

  // 模拟AI图片分析
  simulateAiImageAnalysis(imagePath) {
    wx.showLoading({
      title: 'AI分析中...',
      mask: true
    })

    // 模拟网络请求延迟
    setTimeout(() => {
      wx.hideLoading()
      
      const analysisResponses = [
        `我已经仔细查看了${this.data.petName}的照片。从图片来看，${this.data.petName}的状态看起来还不错。不过建议您继续观察，如果发现任何异常变化，请及时告诉我。`,
        `根据照片分析，${this.data.petName}的整体状态良好。不过为了确保健康，建议您定期带${this.data.petName}进行体检，预防胜于治疗。`,
        `从照片中我注意到一些细节，建议您关注${this.data.petName}的日常饮食和运动情况。保持健康的生活方式对宠物的长期健康非常重要。`,
        `照片显示${this.data.petName}的状况需要进一步关注。建议您密切观察接下来的几天，如果出现任何异常症状，请及时联系兽医。`
      ]
      
      const randomResponse = analysisResponses[Math.floor(Math.random() * analysisResponses.length)]
      this.addMessage('ai', randomResponse)
    }, 2000)
  },

  // 滚动到底部
  scrollToBottom() {
    if (this.data.scrollToBottom) {
      wx.createSelectorQuery()
        .select('#chat-container')
        .boundingClientRect((rect) => {
          if (rect) {
            wx.pageScrollTo({
              scrollTop: rect.bottom,
              duration: 300
            })
          }
        })
        .exec()
    }
  },

  // 清空对话
  clearChat() {
    wx.showModal({
      title: '确认清空',
      content: '确定要清空所有对话记录吗？',
      success: (res) => {
        if (res.confirm) {
          this.setData({
            messages: []
          })
          // 重新添加欢迎消息
          this.addMessage('ai', `你好！我是AI宠物医生，很高兴为${this.data.petName}提供问诊服务。请描述${this.data.petName}的症状，或者上传${this.data.petName}的照片，我会尽力为您提供专业的医疗建议。`)
        }
      }
    })
  },

  // 返回上一页
  goBack() {
    wx.navigateBack()
  }
})