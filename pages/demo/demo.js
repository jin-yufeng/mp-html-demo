const content = require('./content')
Page({
  data: {
    index: 0,
    // 预设的标签样式
    tagStyle: {
      table: 'box-sizing:border-box;border-top:1px solid #dfe2e5;border-left:1px solid #dfe2e5',
      th: 'border-right:1px solid #dfe2e5;border-bottom:1px solid #dfe2e5',
      td: 'border-right:1px solid #dfe2e5;border-bottom:1px solid #dfe2e5',
      li: 'margin:5px 0'
    },
    rows: 1,
    cols: 1,
    // 用于插入的 emoji 表情
    emojis: [
      ['😄', '😷', '😂', '😝', '😳', '😱', '😔', '😒', '😉'],
      ['😎', '😭', '😍', '😘', '🤔', '😕', '🙃', '🤑', '😲'],
      ['🙄', '😤', '😴', '🤓', '😡', '😑', '😮', '🤒', '🤮']
    ],
    // 用于插入的 html 模板
    templates: ['<section style="text-align: center; margin: 0px auto;"><section style="border-radius: 4px; border: 1px solid #757576; display: inline-block; padding: 5px 20px;"><span style="font-size: 18px; color: #595959;">标题</span></section></section>',
      '<div style="width: 100%; box-sizing: border-box; border-radius: 5px; background-color: #f6f6f6; padding: 10px; margin: 10px 0"><div>卡片</div><div style="font-size: 12px; color: gray">正文</div></div>',
      '<div style="border: 1px solid gray; box-shadow: 3px 3px 0px #cfcfce; padding: 10px; margin: 10px 0">段落</div>'
    ]
  },
  onLoad(e) {
    const data = {
      index: e.index
    }
    // 获取组件实例
    this.ctx = this.selectComponent('#article')
    if (e.index === '1') {
      wx.showActionSheet({
        itemList: ['简易模式', '正常模式'],
        success: e => {
          if (e.tapIndex === 0) {
            this._editmode = 'simple'
            this.setData({
              editable: 'simple'
            })
          } else {
            this._editmode = true
          }
        }
      })
      // 开启编辑
      data.editable = true
      // 设置离开页面提示
      wx.enableAlertBeforeUnload && wx.enableAlertBeforeUnload({
        message: '离开页面将不会保留未保存的内容，确定离开吗？'
      })
      const saved = wx.getStorageSync('edit')
      if (saved) {
        data.content = saved
      }
    } else {
      // 设置渲染内容
      data.content = content
    }
    this.setData(data)
    if (e.id) {
      this.ctx.navigateTo(e.id)
    }
    // 设置编辑状态下获取链接方法
    this.ctx.getSrc = (type, value) => {
      return new Promise((resolve, reject) => {
        if (type === 'img' || type === 'video') {
          wx.showActionSheet({
            itemList: ['本地选取', '远程链接'],
            success: res => {
              if (res.tapIndex === 0) {
                // 本地选取
                if (type === 'img') {
                  wx.chooseImage({
                    count: value === undefined ? 9 : 1,
                    success: res => {
                      if (res.tempFilePaths.length === 1 && wx.editImage) {
                        // 单张图片可以编辑
                        wx.editImage({
                          src: res.tempFilePaths[0],
                          success: res => resolve(res.tempFilePath),
                          fail: () => resolve(res.tempFilePaths)
                        })
                      } else {
                        resolve(res.tempFilePaths)
                      }
                    },
                    fail: reject
                  })
                } else {
                  wx.chooseVideo({
                    success: res => {
                      resolve(res.tempFilePath)
                    },
                    fail: reject
                  })
                }
              } else {
                // 远程链接
                this.callback = {
                  resolve,
                  reject
                }
                this.setData({
                  modal: {
                    title: (type === 'img' ? '图片' : '视频') + '链接',
                    value
                  }
                })
              }
            }
          })
        } else {
          this.callback = {
            resolve,
            reject
          }
          let title
          if (type === 'audio') {
            title = '音频链接'
          } else if (type === 'link') {
            title = '链接地址'
          }
          this.setData({
            modal: {
              title,
              value
            }
          })
        }
      })
    }
  },
  // 开始搜索
  showInput() {
    this.setData({
      searchIndex: 0, // 当前高亮的搜索结果
      searchTotal: 0, // 搜索结果总数
      inputShowed: true
    })
  },
  // 结束搜索
  hideInput() {
    if (this.data.searchTotal) {
      this.ctx.search() // 清除搜索结果
    }
    this.setData({
      inputVal: '',
      inputShowed: false
    })
  },
  // 搜索输入
  inputTyping(e) {
    // 执行搜索
    this.ctx.search(e.detail.value, true).then(res => {
      if (res.num) {
        res.highlight(1)
        res.jump(1, -100)
      }
      this.res = res
      this.setData({
        searchIndex: res.num ? 1 : 0,
        searchTotal: res.num
      })
    })
  },
  // 搜索 上一个 /下一个
  searchMove(e) {
    // 越界检查
    if (e.currentTarget.dataset.type === 'next') {
      if (this.data.searchIndex < this.data.searchTotal) {
        this.data.searchIndex++
      } else return
    } else {
      if (this.data.searchIndex > 1) {
        this.data.searchIndex--
      } else return
    }
    this.res.highlight(this.data.searchIndex)
    this.res.jump(this.data.searchIndex, -100)
    this.setData({
      searchIndex: this.data.searchIndex
    })
  },
  // 检查是否可编辑
  checkEditable() {
    return new Promise((resolve, reject) => {
      if (this.data.editable) {
        resolve()
      } else {
        wx.showModal({
          content: '需要继续编辑吗？',
          success: res => {
            if (res.confirm) {
              // 切换编辑状态
              this.save()
              resolve()
            } else {
              reject()
            }
          }
        })
      }
    })
  },
  // 调用编辑器接口
  edit(e) {
    this.checkEditable().then(() => {
      this.ctx[e.currentTarget.dataset.method](e.currentTarget.dataset.param)
    }).catch(() => {})
  },
  // 插入 head 系列标签
  insertHead() {
    this.checkEditable().then(() => {
      wx.showActionSheet({
        itemList: ['大标题', '中标题', '小标题'],
        success: res => {
          let tagName = ['h1', 'h3', 'h5'][res.tapIndex]
          this.ctx.insertHtml(`<${tagName}>标题</${tagName}>`)
        }
      })
    }).catch(() => {})
  },
  // 插入表格
  insertTable() {
    this.checkEditable().then(() => {
      this.setData({
        modal: {
          title: '插入表格'
        }
      })
      this.callback = {
        resolve: () => {
          this.ctx.insertTable(this.data.rows, this.data.cols)
        },
        reject: () => {}
      }
    }).catch(() => {})
  },
  // 插入代码
  insertCode() {
    this.checkEditable().then(() => {
      wx.showActionSheet({
        itemList: ['css', 'javascript', 'json'],
        success: res => {
          const lan = ['css', 'javascript', 'json'][res.tapIndex]
          this.ctx.insertHtml(`<pre><code class="language-${lan}">${lan} code</code></pre>`)
        }
      })
    }).catch(() => {})
  },
  // 插入 emoji
  insertEmoji(e) {
    this.ctx.insertHtml(e.currentTarget.dataset.emoji)
    this.closeDialog()
  },
  // 清空编辑器内容
  clear() {
    this.checkEditable().then(() => {
      wx.showModal({
        title: '确认',
        content: '确定清空内容吗？',
        success: res => {
          if (res.confirm) {
            this.ctx.clear()
          }
        }
      })
    }).catch(() => {})
  },
  // 加载内容
  load() {
    this.checkEditable().then(() => {
      wx.showActionSheet({
        itemList: ['载入示例内容', '载入自定义文件'],
        success: res => {
          const tapIndex = res.tapIndex
          wx.showModal({
            title: '提示',
            content: '导入内容将覆盖现有内容，是否继续？',
            success: res => {
              if (res.confirm) {
                if (tapIndex == 0) {
                  this.ctx.setContent(content)
                } else {
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
                    extension: ['txt', 'html'],
                    success: res => {
                      const content = wx.getFileSystemManager().readFileSync(res.tempFiles[0].path, 'utf8')
                      this.ctx.setContent(content)
                    }
                  })
                }
              }
            }
          })
        }
      })
    }).catch(() => {})
  },
  // 保存 / 编辑
  save() {
    // 延时避免当前编辑内容没有保存
    setTimeout(() => {
      const data = {}
      if (this.data.editable) {
        // 保存编辑好的内容
        data.content = this.ctx.getContent()
        if (data.content === '<p></p>') {
          data.content = ''
        }
        wx.setStorageSync('edit', data.content)
        wx.showToast({
          title: '保存成功',
        })
        // 取消离开页面提示
        wx.disableAlertBeforeUnload && wx.disableAlertBeforeUnload()
        data.editable = false
      } else {
        // 添加离开页面提示
        wx.enableAlertBeforeUnload && wx.enableAlertBeforeUnload({
          message: '离开页面将不会保留未保存的内容，确定离开吗？'
        })
        data.editable = this._editmode
      }
      this.setData(data)
    }, 50)
  },
  // 处理模态框
  modalInput(e) {
    this.value = e.detail.value
  },
  pickerChange(e) {
    this.setData({
      [e.currentTarget.dataset.type]: parseInt(e.detail.value) + 1
    })
  },
  modalConfirm() {
    this.callback.resolve(this.value || this.data.modal.value || '')
    this.setData({
      modal: false
    })
  },
  modalCancel() {
    this.callback.reject()
    this.setData({
      modal: false
    })
  },
  // 处理底部弹窗
  openDialog(e) {
    this.checkEditable().then(() => {
      this.setData({
        dialog: e.currentTarget.dataset.type
      })
    }).catch(() => {})
  },
  closeDialog() {
    this.setData({
      dialog: false
    })
  },
  // 页面分享
  onShareAppMessage() {
    return {
      title: '示例体验'
    }
  }
})
