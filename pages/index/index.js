Page({
  data: {
    // 栏目列表
    list: [{
      id: 'docs',
      name: '说明文档',
      pages: ['功能介绍', '使用方法', '更新日志', '关于我们']
    }, {
      id: 'demo',
      name: '示例体验',
      pages: ['渲染示例', '编辑示例']
    }, {
      id: 'test',
      name: '自定义测试',
      pages: ['html 渲染', 'markdown 渲染']
    }]
  },
  // 栏目切换
  kindToggle: function (e) {
    const id = e.currentTarget.id,
      list = this.data.list
    for (let i = 0, len = list.length; i < len; i++) {
      if (list[i].id === id) {
        list[i].open = !list[i].open
      } else {
        list[i].open = false
      }
    }
    this.setData({
      list: list
    })
  },
  // 页面分享
  onShareAppMessage() {
    return {
      title: 'mp-html 富文本组件'
    }
  }
})
