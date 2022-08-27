const content = require('./content')
Page({
  data: {
    // 预设的标签样式
    tagStyle: {
      h2: 'margin:20px 0;font-size:20px',
      li: 'margin:5px 0 5px -15px'
    }
  },
  onLoad(e) {
    let title
    if (e.index === '0') {
      title = '功能介绍'
    } else if (e.index === '1') {
      title = '使用方法'
    } else if (e.index === '2') {
      title = '更新日志'
    } else {
      title = '关于我们'
    }
    this.setData({
      title,
      content: content[e.index]
    })
  },
  // 自定义处理链接点击
  linktap(e) {
    const i = e.detail.href
    let title
    if (i.length === 1) {
      // 翻页
      if (i === '0') {
        title = '功能介绍'
      } else if (i === '1') {
        title = '使用方法'
      } else {
        title = '更新日志'
      }
      this.setData({
        title,
        content: content[i]
      })
      wx.pageScrollTo({
        scrollTop: 0
      })
    } else if (i.includes('copy:')) {
      // 复制内容
      wx.setClipboardData({
        data: i.split('copy:')[1]
      })
    }
  },
  // 页面分享
  onShareTimeline() {
    return {
      title: this.data.title
    }
  },
  onShareAppMessage() {
    return {
      title: this.data.title
    }
  }
})