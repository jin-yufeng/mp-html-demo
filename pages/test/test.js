Page({
  data: {
    canIUse: wx.canIUse('editor')
  },
  onLoad(e) {
    if (e.index === '1') {
      this.setData({
        markdown: true
      })
    }
    if (this.data.canIUse) {
      wx.createSelectorQuery().select('#editor').context((res) => {
        this.editor = res.context
      }).exec()
    }
  },
  // 从文件中读取内容
  loadFile() {
    if (!wx.chooseMessageFile) {
      return wx.showModal({
        title: '失败',
        content: '您的微信版本太低，无法使用此功能',
        showCancel: false
      })
    }
    wx.chooseMessageFile({
      count: 1,
      type: 'file',
      extension: ['txt', this.data.markdown ? 'md' : 'html'],
      success: res => {
        var content = wx.getFileSystemManager().readFileSync(res.tempFiles[0].path, 'utf8')
        if (this.data.canIUse) {
          this.editor.insertText({
            text: content
          })
        } else {
          this.setData({
            value: content
          })
        }
      }
    })
  },
  /* 反馈
  feedback() {
    wx.showModal({
      title: '确认',
      content: '如果渲染结果与浏览器的渲染效果不符，可以上传当前内容供开发者检查',
      confirmText: '上传',
      success: res => {
        if (res.confirm) {
          if (!wx.cloud) {
            return wx.showModal({
              title: '失败',
              content: '您的微信版本太低，无法使用此功能',
              showCancel: false
            })
          }
          const upload = text => {
            if (!text || text.length < 5)
              return wx.showToast({
                icon: 'none',
                title: '内容过少',
              })
            wx.showLoading({
              title: '上传中'
            })
            wx.cloud.database().collection('feedback').add({
              data: {
                text,
                system: wx.getSystemInfoSync()
              }
            }).then(() => {
              wx.hideLoading()
              wx.showToast({
                title: '上传成功'
              })
            })
          }
          if (this.data.canIUse) {
            this.editor.getContents({
              success: res => upload(res.text)
            })
          } else {
            upload(this.data.value)
          }
        }
      }
    })
  },*/
  // 输入
  input(e) {
    this.data.value = e.detail.value
  },
  // 渲染
  render() {
    if (this.data.canIUse) {
      this.editor.getContents({
        success: res => {
          this.setData({
            content: res.text
          })
        }
      })
    } else {
      this.setData({
        content: this.data.value
      })
    }
  },
  // 清空
  clear() {
    const data = {
      content: ''
    }
    if (this.data.canIUse) {
      this.editor.clear()
    } else {
      data.value = ''
    }
    this.setData(data)
  },
  onShareAppMessage() {
    return {
      title: '自定义测试'
    }
  }
})