# 组件对照

## 你看到的是什么

| 现象 | 名称 | 说明 |
|------|------|------|
| 浏览器顶栏「xxx 显示」白框 | Native Confirm / `window.confirm` | 系统级，样式改不了 |
| 页面居中、带遮罩、取消/确定 | **Modal / Confirm Dialog** | 页面内二次确认 |
| 右上角滑入短提示 | **Toast**（类似 Sonner） | 成功/失败轻反馈 |

## 本库提供

1. `YhFeedback.confirm` → Confirm Modal  
2. `YhFeedback.toast` → Toast  

## 主流开源对照（若以后要换库）

| 库 | Confirm | Toast |
|----|---------|-------|
| Arco Design | Modal.confirm | Message / Notification |
| Ant Design | Modal.confirm | message / notification |
| Element Plus | ElMessageBox | ElMessage |
| Sonner | — | Toast only |

本库适合：后台插件、静态页、不想引整套组件库时。
