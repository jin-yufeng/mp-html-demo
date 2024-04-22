// 文档内容
module.exports = [
`## 渲染效果
1. 加载提示  
   支持在标签内部放上加载提示，内容未加载完成时将显示，加载完成后自动隐藏  
   \`\`\`html
   <mp-html>加载中...</mp-html>
   \`\`\`
2. 自动设置标题  
   支持自动把 \`title\` 标签的内容设置到页面标题上，如不需要，可通过 \`set-title\` 属性关闭  
3. 长按复制  
   支持长按复制文本内容，可通过 \`selectable\` 属性开启  
4. 支持 \`rpx\`  
   支持 \`rpx\` 作为单位，自动根据屏幕宽度调整  
5. 支持 \`html\` 实体  
   支持所有形如 \`&#123;\` 的 \`html\` 实体和大部分常用的形如 \`&nbsp;\` 的实体  

## 图片效果
1. 占位图  
   支持设置图片未加载完成时的占位图 \`loading-img\` 和加载出错时的占位图 \`error-img\`  
2. 懒加载  
   内容较长、图片较多时，开启懒加载有助于改善性能，需要时可通过 \`lazy-load\` 属性开启  
3. 自动预览  
   图片被点击时，将自动放大预览，如不需要，可通过 \`preview-img\` 属性关闭。还可以在 \`imgtap\` 事件中进行自定义处理  
4. 预览高清图  
   同一张图片，可以给显示时和预览时设置不同的链接地址以达到最佳效果  
   方式 1：给 \`img\` 标签增加一个 \`original-src\` 即可  
   \`\`\`html
   <!-- 显示时使用 xxx，预览时使用 yyy -->
   <img src="xxx" original-src="yyy" />
   \`\`\`
   方式 2：通过 \`imgList\` 的 \`api\` 进行设置  
5. 长按弹出菜单  
   支持图片长按时弹出菜单，可以进行保存、分享等操作，如不需要，可通过 \`show-img-menu\` 属性关闭  
6. 装饰图片处理  
   对于一些小的装饰性图片，可能不希望产生上述效果，可以给 \`img\` 标签设置 \`ignore\` 属性，将屏蔽预览、弹出菜单等操作，提升体验  
   \`\`\`html
   <!-- 设置 ignore 属性后这张图片不可预览、不会弹出菜单 -->
   <img src="xxx" ignore />
   \`\`\`
7. 支持原大小显示  
   本组件通过合理转换，基本实现了和 \`html\` 中 \`img\` 的相同效果，不必去考虑小程序中的 \`mode\` 等问题  
8. 支持 \`svg\`  
   虽然小程序中不支持 \`svg\` 系列标签，本组件通过适当的转换实现了 \`svg\` 的显示  

## 链接效果
1. 支持设置多种状态下的样式  
   包括默认状态、点击态的样式，可以在 \`src/node/node.wxss\` 中进行修改  
2. 锚点跳转  
   支持跳转内部锚点，使用锚点需要开启 \`use-anchor\` 属性  
   方式 1：给 \`a\` 标签的 \`href\` 属性设置为 \`#id\`，点击时即可跳转到对应 \`id\` 的位置（设置为 \`#\` 则跳转到开头）  
   方式 2：通过 \`navigateTo\` 的 \`api\` 进行跳转  
3. 跳转内部路径  
   如果需要点击 \`a\` 标签跳转到小程序内的一个页面，直接将其 \`href\` 属性设置为页面路径即可（包括 \`tab\` 页面，需要使用绝对路径）  
   \`\`\`html
   <!-- 该链接被点击后将跳转到 pages/test/test 页面 -->
   <a href="/pages/test/test">链接</a>
   \`\`\`
4. 复制外部链接  
   对于外部链接，由于无法直接打开，将自动复制到剪贴板，如不需要，可通过 \`copy-link\` 属性关闭  

> 除这些默认的处理外，还可以在 \`linktap\` 事件中进行自定义处理  

## 表格效果
1. 支持独立横向滚动  
   表格宽度通常较大，容易导致整体内容一起滚动，影响体验，可以通过设置 \`scroll-table\` 属性给所有表格添加一个滚动层使其能单独横向滚动  
2. 支持常用表格属性  
   支持 \`border\`, \`cellspacing\`, \`cellpadding\`, \`align\` 等常用表格属性  
3. 支持含有合并单元格的表格  

## 列表效果
1. 支持多层嵌套  
   支持嵌套多层列表，对于无序列表，不同的层级会显示不同的黑点格式  
2. 支持多种有序列表格式  
   通过设置 \`ol\` 标签的 \`type\` 属性，可以显示数字、字母、罗马数字等多种形式的标号  
3. 支持不显示标号  
   支持通过设置 \`list-style:none\` 的方式不显示 \`li\` 标签开头的标号  

## 音视频效果
1. 自动暂停  
   存在多个视频时，同时播放可能会影响体验，本组件支持在播放一个视频的时候自动暂停其他视频，如不需要，可通过 \`pause-video\` 属性关闭  
2. 多源加载  
   不同平台支持播放的格式不同，只设置一个 \`src\` 可能会出现兼容性问题导致无法播放，因此本组件支持设置多个 \`source\`，将按照顺序进行加载，最大程度上避免无法播放  
   \`\`\`html
   <!-- 组件将依次加载 xxx 和 yyy -->
   <video controls>
     <source src="xxx">
     <source src="yyy">
   </video>
   \`\`\`
3. 自动添加控件  
   对于既没有设置 \`controls\` 也没有设置 \`autoplay\` 的标签将自动把 \`controls\` 属性设置为 \`true\`，避免无法播放，影响体验  

## 全面的标签支持

本组件除支持所有 \`rich-text\` 组件支持的标签外，还增加支持以下标签或属性  

| 标签 | 属性 |
|:---:|:---:|
| a | href |
| audio | author, autoplay, controls, loop, name, poster, src |
| base | href |
| embed | autostart, loop, src, type |
| font | color, face, size |
| img | ignore, original-src, src |
| source | src |
| strike |  |
| svg | svg 系列所有标签 |
| table | border, cellpadding, cellspacing |
| title |  |
| video | autoplay, controls, loop, muted, object-fit, poster, src |

说明：  
- 全局支持 \`width\`, \`height\`, \`align\`, \`dir\` 等属性  
- 对于 \`rich-text\` 中高基础库才支持的标签（\`ruby\` 等）也可以直接支持  
- 对于不支持的标签，除个别（如 \`script\`）会被直接移除外，都会被转为行内标签，因此可以使用更多语义化标签  

## 稳定性
本组件的解析脚本能够支持多种 \`html\` 格式，并自动处理一些错误情况，具有强大的稳定性，以下情况均能正确解析  

\`\`\`html
<!-- 不同的属性格式 -->
<font face="宋体" color='green' size=7>Hello</font>
<!-- 标签首尾不匹配或未闭合 -->
<div> World</section>
<!-- 大小写搭配 -->
<dIv StYle="color:green">!</DIv>
\`\`\`

查看 [功能介绍](https://jin-yufeng.gitee.io/mp-html/#/overview/feature) 了解更多

<div style="text-align:center;margin-top:20px">
   <a href="1">下一章：使用方法</a>
</div>`, 
`## 使用方法
\`npm\` 方式
1. 在项目目录下安装组件包
   \`\`\`bash
   npm install mp-html
   \`\`\`
2. 开发者工具中勾选 \`使用 npm 模块\`（若没有此选项则不需要）并点击 \`工具 - 构建 npm\`
3. 在需要使用页面的 \`json\` 文件中添加
   \`\`\`json
   {
     "usingComponents": {
       "mp-html": "mp-html"
     }
   }
   \`\`\`
4. 在需要使用页面的 \`wxml\` 文件中添加
   \`\`\`html
   <mp-html content="{{html}}" />
   \`\`\`
5. 在需要使用页面的 \`js\` 文件中添加
   \`\`\`javascript
   Page({
     onLoad() {
       this.setData({
         html: '<div>Hello World!</div>'
       })
     }
   })
   \`\`\`

源码方式  
1. 从 [获取组件包](/pages/pack/pack) 页面、[github](https://github.com/jin-yufeng/mp-html) 或 [gitee](https://gitee.com/jin-yufeng/mp-html) 获取源码包
2. 将源码中的代码包（\`dist/weixin\`）拷贝到 \`components\` 目录下，更名为 \`mp-html\`
3. 在需要使用页面的 \`json\` 文件中添加
   \`\`\`json
   {
     "usingComponents": {
       "mp-html": "/components/mp-html/index"
     }
   }
   \`\`\`

后续步骤同上

查看 [快速开始](https://jin-yufeng.gitee.io/mp-html/#/overview/quickstart) 了解更多

## 组件属性

| 属性名 | 说明 |
|:---:|---|
| container-style | 容器的样式 |
| content | 要渲染的 html 字符串 |
| copy-link | 是否允许链接被点击时自动复制 |
| domain | 主域名 |
| error-img | 出错时的占位图链接 |
| lazy-load | 是否开启图片懒加载 |
| loading-img | 图片加载中的占位图链接 |
| pause-video | 是否在播放视频时暂停其他视频 |
| preview-img | 是否允许图片被点击时自动预览 |
| scroll-table | 是否给表格添加一个滚动层 |
| selectable | 是否开启长按复制文本 |
| set-title | 是否将 title 标签设置到标题 |
| show-img-menu | 是否在图片长按时弹出菜单 |
| tag-style | 标签的默认样式 |
| use-anchor | 是否使用锚点 |

查看 [属性](https://jin-yufeng.gitee.io/mp-html/#/basic/prop) 了解更多

## 事件

| 事件名 | 触发时机 |
|:---:|---|
| load | dom 树加载完毕时 |
| ready | 图片加载完毕时 |
| error | 发生渲染错误时 |
| imgtap | 图片被点击时 |
| linktap | 链接被点击时 |
| play | 音视频播放时 |

查看 [事件](https://jin-yufeng.gitee.io/mp-html/#/basic/event) 了解更多

## api
组件实例上提供了一些 \`api\` 方法可供调用

| 名称 | 作用 |
|:---:|---|
| in | 将锚点跳转的范围限定在一个 scroll-view 内 |
| navigateTo | 锚点跳转 |
| getText | 获取文本内容 |
| getRect | 获取富文本内容的位置和大小 |
| setContent | 设置富文本内容 |
| imgList | 获取所有图片的数组 |
| pauseMedia | 暂停播放音视频 |
| setPlaybackRate | 设置音视频播放速率 |

查看 [api](https://jin-yufeng.gitee.io/mp-html/#/advanced/api) 了解更多

## 插件扩展  
除基本功能外，本组件还提供了丰富的扩展，可按照需要选用

| 名称 | 作用 |
|:---:|---|
| audio | 音乐播放器 |
| editable | 富文本编辑 [体验](/pages/demo/demo?index=1) |
| emoji | 解析 emoji |
| highlight | 代码块高亮显示 [体验](/pages/demo/demo?index=0&id=code) |
| markdown | 渲染 markdown [体验](/pages/test/test?index=1) |
| search | 关键词搜索 [体验](/pages/demo/demo?index=0) |
| style | 匹配 style 标签中的样式 |
| txv-video | 使用腾讯视频 |
| latex | 渲染 latex 公式 [体验](/pages/demo/demo?index=0&id=latex) |
| card | 卡片展示 |

查看 [插件](https://jin-yufeng.gitee.io/mp-html/#/advanced/plugin) 了解更多

<div style="display:flex;justify-content:center;margin-top:20px">
  <a href="0">上一章：功能介绍</a>
  <div style="flex:1"></div>
  <a href="2">下一章：更新日志</a>
</div>`, 
`## 更新日志
- \`v2.5.0\`
  1. \`U\` \`play\` 事件增加返回 \`src\` 等信息
  2. \`U\` \`preview-img\` 属性支持设置为 \`all\` 开启 \`base64\` 图片预览
  3. \`U\` \`editable\` 插件增加简易模式（点击文字直接编辑）
  4. \`U\` \`latex\` 插件支持块级公式
  5. \`F\` 修复了表格部分情况下背景丢失的问题
  6. \`F\` 修复了部分 \`svg\` 无法显示的问题
  7. \`F\` 修复了 \`latex\` 插件部分情况下显示不正确的问题
  8. \`F\` 修复了 \`editable\` 插件表格无法删除的问题

- \`v2.4.3\`
  1. \`A\` 增加 \`card\` 插件
  2. \`F\` 修复了 \`svg\` 中包含 \`foreignobject\` 可能不显示的问题
  3. \`F\` 修复了合并单元格的表格部分情况下显示不正确的问题
  4. \`F\` 修复了 \`img\` 标签设置 \`object-fit\` 无效的问题
  5. \`F\` 修复了 \`latex\` 插件公式会换行的问题

- \`v2.4.2\`
  1. \`A\` \`editable\` 插件支持修改文字颜色
  2. \`F\` 修复了 \`svg\` 中有 \`style\` 不生效的问题
  3. \`F\` 修复了 \`editable\` 插件在点击换图时未拼接 \`domain\` 的问题
  4. \`F\` 修复了 \`latex\` 插件部分情况下不显示的问题
  5. \`F\` 修复了 \`editable\` 插件点击音视频时其他标签框不消失的问题

- \`v2.4.1\`
  1. \`F\` 修复了没有图片时 \`ready\` 事件可能不触发的问题
  2. \`F\` 修复了加载过程中可能出现 \`Root label not found\` 错误的问题
  3. \`F\` 修复了 \`audio\` 插件退出页面可能会报错的问题
  4. \`F\` 修复了链接内有图片时可能错误换行的问题

- \`v2.4.0\`
  1. \`A\` 增加了 \`setPlaybackRate\` 的 \`api\`，可以设置音视频的播放速率
  2. \`A\` 示例小程序代码开源 [详细](https://github.com/jin-yufeng/mp-html-demo)
  3. \`U\` 优化 \`ready\` 事件触发时机，未设置懒加载的情况下基本可以准确触发
  4. \`U\` \`highlight\` 插件在编辑状态下不进行高亮处理，便于编辑
  5. \`F\` 修复了 \`flex\` 布局下图片大小可能不正确的问题
  6. \`F\` 修复了 \`selectable\` 属性没有设置 \`force\` 也可能出现渲染异常的问题
  7. \`F\` 修复了表格中的图片大小可能不正确的问题
  8. \`F\` 修复了含有合并单元格的表格可能无法设置竖直对齐的问题
  9. \`F\` 修复了 \`editable\` 插件在 \`scroll-view\` 中使用时工具条位置可能不正确的问题

- \`v2.3.2\`
  1. \`A\` 增加 \`latex\` 插件，可以渲染数学公式 [体验](/pages/demo/demo?index=0&id=latex)
  2. \`U\` 优化根节点下有很多标签的长内容渲染速度
  3. \`U\` \`highlight\` 插件适配 \`lang-xxx\` 格式
  4. \`F\` 修复了 \`table\` 标签设置 \`border\` 属性后可能无法修改边框样式的问题
  5. \`F\` 修复了 \`editable\` 插件输入连续空格无效的问题

- \`v2.3.1\`
  1. \`U\` 优化了 \`selectable\` 属性在 \`ios\` 端的处理
  2. \`U\` 取消样式隔离，可以直接引入页面样式
  3. \`F\` 修复了 \`editable\` 插件不在顶部时 \`tooltip\` 位置可能错误的问题
  4. \`F\` 修复了个别情况下可能报错的问题

- \`v2.3.0\`
  1. \`A\` 增加了 \`play\` 事件，音视频播放时触发，可用于与页面其他音视频进行互斥播放
  2. \`U\` \`show-img-menu\` 属性支持控制预览时是否长按弹出菜单
  3. \`U\` 优化 \`wxs\` 处理，提高渲染性能
  4. \`U\` \`video\` 标签支持 \`object-fit\` 属性
  5. \`U\` 增加支持一些常用实体编码
  6. \`F\` 修复了图片仅设置高度可能不显示的问题
  7. \`F\` 修复了 \`video\` 标签高度设置为 \`auto\` 不显示的问题
  8. \`F\` 修复了使用 \`grid\` 布局时可能样式错误的问题
  9. \`F\` 修复了含有合并单元格的表格部分情况下显示异常的问题
  10. \`F\` 修复了 \`editable\` 插件连续插入内容时顺序不正确的问题

- \`v2.2.2\`
  1. \`A\` 增加了 \`pauseMedia\` 的 \`api\`，可用于暂停播放音视频
  2. \`U\` 优化了长内容的加载速度  
  3. \`F\` 修复了图片高度设置为百分比时可能不显示的问题
  4. \`F\` 修复了 \`highlight\` 插件部分情况下可能显示不完整的问题

- \`v2.2.1\`
  1. \`A\` \`editable\` 插件增加上下移动标签功能
  2. \`U\` \`editable\` 插件支持在文本中间光标处插入内容
  3. \`F\` 修复了 \`highlight\` 插件使用压缩版的 \`prism.css\` 可能导致背景失效的问题
  4. \`F\` 修复了 \`uni-app\` 包编辑状态下使用 \`emoji\` 插件内容为空时可能报错的问题
  5. \`F\` 修复了使用 \`editable\` 插件后将 \`selectable\` 属性设置为 \`force\` 不生效的问题

- \`v2.2.0\`
  1. \`A\` 增加 \`customElements\` 配置项，便于添加自定义功能性标签
  2. \`A\` \`editable\` 插件增加切换音视频自动播放状态的功能
  3. \`A\` \`editable\` 插件删除媒体标签时触发 \`remove\` 事件，便于删除已上传的文件
  4. \`U\` \`editable\` 插件 \`insertImg\` 方法支持同时插入多张图片
  5. \`U\` \`editable\` 插入图片和音视频时支持拼接 \`domian\` 主域名
  6. \`F\` 修复了内部链接参数中包含 \`://\` 时被认为是外部链接的问题
  7. \`F\` 修复了部分 \`svg\` 标签名或属性名大小写不正确时不生效的问题
  8. \`D\` 移除了 \`ad\` 配置项（由 \`customElements\` 代替）

- \`v2.1.5\`
  1. \`A\` 增加支持标签的 \`dir\` 属性
  2. \`F\` 修复了 \`ruby\` 标签文字与拼音没有居中对齐的问题
  3. \`F\` 修复了音视频标签内有 \`a\` 标签时可能无法播放的问题
  4. \`F\` 修复了 \`externStyle\` 中的 \`class\` 名包含下划线或数字时可能失效的问题
  5. \`F\` 修复了 \`a\` 标签的 \`style\` 中包含 \`inline\` 时不响应事件的问题

- \`v2.1.4\`
  1. \`F\` 修复了 \`rt\` 标签无法设置样式的问题
  2. \`F\` 修复了表格中有单元格同时合并行和列时可能显示不正确的问题
  3. \`F\` 修复了 \`editable\` 插件只能添加图片链接不能修改的问题

- \`v2.1.3\`
  1. \`A\` \`editable\` 插件增加 \`insertTable\` 方法
  2. \`U\` \`editable\` 插件支持编辑表格中的空白单元格
  3. \`F\` 修复了 \`externStyle\` 中使用伪类可能失效的问题
  4. \`F\` 修复了多个组件同时使用时 \`tag-style\` 属性时可能互相影响的问题
  5. \`F\` 修复了包含 \`linearGradient\` 的 \`svg\` 可能无法显示的问题
  6. \`F\` 修复了 \`editable\` 插件尾部插入时无法撤销的问题
  7. \`F\` 修复了 \`editable\` 插件的 \`insertHtml\` 方法只能在末尾插入的问题
  8. \`F\` 修复了 \`editable\` 插件插入音频不显示的问题

- \`v2.1.2\`
  1. \`U\` 支持通过 \`container-style\` 属性设置 \`white-space\` 来保留连续空格和换行符
  2. \`U\` 代码风格符合 \`standard\` 标准
  3. \`F\` 修复了 \`svg\` 标签内嵌 \`svg\` 时无法显示的问题
  4. \`F\` 修复了 \`img\` 标签的 \`style\` 中包含 \`inline\` 时不显示的问题

- \`v2.1.1\`
  1. \`F\` 修复了对 \`p\` 标签设置 \`tag-style\` 可能不生效的问题
  2. \`F\` 修复了 \`svg\` 标签中的文本无法显示的问题
  3. \`F\` 修复了 \`style\` 插件连续子选择器失效的问题
  4. \`F\` 修复了 \`editable\` 插件无法修改图片和字体大小的问题

- \`v2.1.0\`
  1. \`A\` 增加了 \`container-style\` 属性，可以设置容器样式
  2. \`A\` 增加支持 \`strike\` 标签
  3. \`A\` \`editable\` 插件增加 \`placeholder\` 属性
  4. \`A\` \`editable\` 插件增加 \`insertHtml\` 方法
  5. \`U\` 外部样式支持标签名选择器

- \`v2.0.5\`
  1. \`U\` \`linktap\` 事件增加返回内部文本内容 \`innerText\`
  2. \`U\` \`selectable\` 属性设置为 \`force\` 时能够在微信 \`iOS\` 端生效（文本块会变成 \`inline-block\`）
  3. \`F\` 修复了部分情况下竖向无法滚动的问题
  4. \`F\` 修复了腾讯视频插件可能无法播放的问题
  5. \`F\` 修复了 \`highlight\` 插件没有设置高亮语言时没有应用默认样式的问题

- \`v2.0.4\`  
  1. \`A\` \`editable\` 插件增加下划线和图片超链接的功能
  2. \`F\` 修复了 \`img\` 标签设置 \`data-src\` 可能导致图片不显示的问题
  3. \`F\` 修复了 \`script\` 标签中的 \`<\` 会被解析为标签的问题
  4. \`F\` 修复了 \`editable\` 插件删除图片和切换内容时可能出现错误选择框的问题
  5. \`F\` 修复了 \`editable\` 插件无法编辑链接文本内容的问题

- \`v2.0.3\`  
  1. \`U\` 图片被点击时不冒泡（可以与整体的点击区分开）
  2. \`F\` 修复了图片链接缺省协议名时可能无法预览的问题
  3. \`F\` 修复了 \`video\` 和 \`audio\` 标签内放置文本会报错的问题
  4. \`F\` 修复了 \`editable\` 插件清空内容时弹窗可能不消失的问题
  5. \`F\` 修复了 \`highlight\` 插件部分情况下样式不正确的问题

- \`v2.0.2\`  
  1. \`F\` 修复了部分情况下 \`flex\` 布局显示不正确的问题
  2. \`F\` 修复了设置 \`loading-img\` 会导致懒加载失效的问题
  3. \`F\` 修复了 \`highlight\` 插件 \`pre\` 和 \`code\` 之间有空白符时无法高亮的问题
  4. \`F\` 修复了 \`editable\` 插件清空内容后插入可能报错的问题

- \`v2.0.1\`  
  1. \`F\` 修复了 \`a\` 标签自动跳转到不存在页面时可能报错的问题
  2. \`F\` 修复了含合并单元格的表格设置列宽可能导致显示不正确的问题
  3. \`F\` 修复了表格中的图片可能错位的问题
  4. \`F\` 修复了使用 \`editable\` 插件点击标签时可能报错的问题

- \`v2.0.0\`  
  1. \`U\` 通过 \`gulp\` 进行构建，自动生成各平台压缩版代码，减小引入包大小
  2. \`U\` 没有设置 \`href\` 属性的 \`a\` 标签不应用链接的样式，可以用作一般标签的点击处理
  3. \`U\` 提供了统一的插件接口，扩展更加方便（代码高亮、\`markdown\` 等都可以直接通过引入插件实现）
  4. \`U\` 实现了简单的编辑功能
  5. \`U\` 支持生成各平台的示例项目，便于调试
  6. \`U\` 原生包共用一份源代码（构建时进行自动转换），注释更加详细，便于了解和维护
  7. \`U\` 通过 \`jest\` 进行单元测试，进一步保证代码质量
  8. \`U\` 去除了一些冗余功能，进一步减小包大小（约 \`24.5KB\`）
  9. \`U\` 减少了递归节点树，加快渲染速度

  从 \`1.x\` 的升级方法可见 [更新指南](https://jin-yufeng.gitee.io/mp-html/#/changelog/changelog?id=v200)

查看 [更新日志](https://jin-yufeng.gitee.io/mp-html/#/changelog/changelog) 了解更多

<div style="text-align:center;margin-top:20px">
   <a href="1">上一章：使用方法</a>
</div>`,
`## 联系我们  
邮箱：[mp_html@126.com](copy:mp_html@126.com)  
\`QQ\` 交流群1（已满）：[699734691](copy:699734691)  
\`QQ\` 交流群2（已满）：[778239129](copy:778239129)  
\`QQ\` 交流群3：[960265313](copy:960265313)  
## 相关链接  
官网文档：https://jin-yufeng.gitee.io/mp-html  
\`github\`：https://github.com/jin-yufeng/mp-html  
\`gitee\`：https://gitee.com/jin-yufeng/mp-html  
\`npm\`：https://www.npmjs.com/package/mp-html  
\`uni-app\` 插件市场：https://ext.dcloud.net.cn/plugin?id=805  
`]