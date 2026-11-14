# yh-feedback

轻量 **UI / Feedback** 组件：页面内 **Confirm Modal（确认对话框）** + **Toast（角落轻提示）**。

用来替代浏览器原生 `window.alert` / `window.confirm`（顶栏系统框、样式不可控）。

- 零依赖（Vanilla JS + CSS）
- 无构建步骤，直接引入 `dist/`
- 兼容别名 `DagUI`（烟火云插件历史命名）

## 分类

| 层级 | 名称 |
|------|------|
| 大类 | UI |
| 子类 | Feedback（反馈） |
| 组件 | Confirm Dialog / Modal + Toast |

同类常见叫法：Modal、Dialog、二次确认、Sonner 式 Toast。

## 安装 / 引入

```html
<link rel="stylesheet" href="dist/yh-feedback.css" />
<script src="dist/yh-feedback.js"></script>
```

## 用法

```js
// Toast
YhFeedback.toast('已保存', 'success') // info | success | error | warn

// Confirm Modal
const ok = await YhFeedback.confirm({
  title: '清空记录',
  content: '此操作不可恢复。',
  okText: '清空',
  cancelText: '取消',
  danger: true,
})
if (ok) {
  // 用户点了确认
}
```

## 演示

打开 `examples/index.html`。

## 目录

```
yh-feedback/
├── dist/           # 可直接引用的产物
│   ├── yh-feedback.js
│   └── yh-feedback.css
├── examples/       # 本地演示
├── docs/           # 说明与对照
└── README.md
```

## 来源

从烟火云魔方财务插件 **DownstreamApiGuard** 后台交互抽出，独立成库便于各项目复用。

## License

MIT
