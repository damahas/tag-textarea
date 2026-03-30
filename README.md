# TagTextarea

一个基于 Vue 3 的富文本标签输入组件，支持在文本中插入和编辑标签。

## 功能特性

- 支持文本和标签混合编辑
- 标签可配置不同颜色
- 标签存储自定义数据
- 支持数据双向绑定
- 支持清空内容
- 支持实时数据获取
- 跨平台兼容（支持浏览器和小程序）

## 安装

```bash
npm install tag-textarea
```

## 基础用法

```vue
<template>
  <TagTextarea v-model="content" />
</template>

<script setup>
import { ref } from 'vue'
import TagTextarea from 'tag-textarea'

const content = ref([
  { type: 'text', label: '你好，' },
  { type: 'username', label: '张三', value: 'user_123' }
])
</script>
```

## Props

| 参数 | 说明 | 类型 | 默认值 |
|------|------|------|--------|
| modelValue | 内容数据 | `Array<{type: string, label: string, value?: any}>` | `[]` |
| tagColors | 标签颜色配置 | `Object` | 见下方默认配置 |
| placeholder | 占位提示 | `String` | `'请输入内容...'` |

### tagColors 默认配置

```js
{
  default: '#409eff',
  username: '#67c23a',
  product: '#e6a23c',
  department: '#f56c6c'
}
```

## 数据结构

```typescript
interface ContentItem {
  type: 'text' | string  // text 表示纯文本，其他值表示标签类型
  label: string           // 显示文本
  value?: any            // 自定义数据（仅标签需要）
}
```

## 示例

### 基础示例

```vue
<template>
  <TagTextarea v-model="content" />
  <button @click="getContent">获取内容</button>
  <button @click="clearContent">清空内容</button>
</template>

<script setup>
import { ref } from 'vue'
import TagTextarea from 'tag-textarea'

const content = ref([])
const textareaRef = ref(null)

const getContent = () => {
  console.log(textareaRef.value?.getContent())
}

const clearContent = () => {
  textareaRef.value?.clearContent()
}
</script>
```

### 自定义标签颜色

```vue
<template>
  <TagTextarea 
    v-model="content" 
    :tagColors="{
      default: '#909399',
      priority: '#f56c6c',
      status: '#67c23a',
      assignee: '#409eff'
    }"
  />
</template>

<script setup>
import { ref } from 'vue'

const content = ref([
  { type: 'text', label: '优先级：' },
  { type: 'priority', label: '高', value: 3 },
  { type: 'text', label: '，状态：' },
  { type: 'status', label: '进行中', value: 'in_progress' },
  { type: 'text', label: '，负责人：' },
  { type: 'assignee', label: '李四', value: {id: 1, name: '李四'} }
])
</script>
```

### 插入预设标签

```vue
<template>
  <div>
    <TagTextarea ref="textareaRef" v-model="content" />
    <button @click="insertTag('username', '王五', 'user_789')">
      插入用户
    </button>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const content = ref([])
const textareaRef = ref(null)

const insertTag = (type, label, value) => {
  textareaRef.value?.insertTag({ type, label, value })
}
</script>
```

## Methods

通过 ref 可以访问以下方法：

### getContent()

获取当前编辑器内容

```js
const content = textareaRef.value?.getContent()
```

### clearContent()

清空编辑器内容

```js
textareaRef.value?.clearContent()
```

### insertTag(tagItem)

在光标位置插入标签

```js
textareaRef.value?.insertTag({
  type: 'username',
  label: '用户名',
  value: 'user_123'
})
```

## 运行示例

```bash
npm install
npm run dev
```

## 浏览器兼容性

支持所有现代浏览器。

## License

MIT
