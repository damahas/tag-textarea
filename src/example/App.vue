<script setup>
import { ref } from "vue";

const value1 = ref([]);
const value2 = ref([
  { type: "text", label: "这是一段普通文本，" },
  { type: "tag1", label: "标签1", value: "tag1" },
  { type: "text", label: "后面还有文本。\n这是第二行内容，" },
  { type: "tag2", label: "标签2", value: "tag2" },
  { type: "text", label: "继续..." },
]);
const value3 = ref([
  { type: "text", label: "禁用状态的示例内容，" },
  { type: "disabled-tag", label: "不可删除标签", value: "disabled-tag" },
  { type: "text", label: "标签不可删除。" },
]);
const value4 = ref([]);
const value5 = ref([]);
const value6 = ref([
  { type: "text", label: "自定义颜色示例：\n" },
  { type: "username", label: "用户名", value: "username" },
  { type: "text", label: " 于 " },
  { type: "date", label: "2024-03-30", value: "date" },
  { type: "text", label: " 提交了 " },
  { type: "ticket_no", label: "工单#1234", value: "ticket_no" },
  { type: "text", label: "\n请及时处理。" }
]);

const value1Ref = ref(null);
const value2Ref = ref(null);
const value3Ref = ref(null);
const value4Ref = ref(null);
const value5Ref = ref(null);
const value6Ref = ref(null);

// 标签编辑相关
const tagDialogVisible = ref(false);
const tagForm = ref({
  label: "",
  value: "",
});
const currentComponentRef = ref(null);

// 预设标签列表
const presetTags = ref([
  { label: "用户名", type: "username", color: "#67c23a" },
  { label: "日期", type: "date", color: "#409eff" },
  { label: "时间", type: "time", color: "#e6a23c" },
  { label: "工单号", type: "ticket_no", color: "#909399" },
  { label: "部门", type: "department", color: "#f56c6c" },
]);

// 自定义标签颜色配置
const tagColors = {
  default: "#409eff",
  username: "#67c23a",
  date: "#409eff",
  time: "#e6a23c",
  ticket_no: "#909399",
  department: "#f56c6c",
  tag1: "#6c5fb1",
  tag2: "#00bcd4",
  "disabled-tag": "#909399",
  priority: "#9c27b0",
  status: "#00bcd4",
};

// 打开添加标签对话框
const addTag = (componentRef) => {
  currentComponentRef.value = componentRef;
  tagForm.value = {
    label: "",
    value: "",
  };
  tagDialogVisible.value = true;
};

// 快速插入预设标签
const insertPresetTag = (componentRef, tag) => {
  componentRef?.addTag({
    type: tag.type,
    label: tag.label,
    value: tag.value || tag.type,
  });
};

// 确认添加标签
const handleConfirmTag = () => {
  if (!tagForm.value.label.trim()) {
    alert("请输入标签名称");
    return;
  }

  currentComponentRef.value?.addTag({
    type: "tag",
    label: tagForm.value.label,
    value: tagForm.value.value || tagForm.value.label,
  });

  tagDialogVisible.value = false;
};

// 清空内容
const clearContent = (componentRef, valueRef) => {
  componentRef?.clearContent();
  valueRef.value = [];
};
</script>

<template>
  <div>
    <div class="demo-container">
      <h1>TagTextarea 组件示例</h1>
      <p class="description">支持在文本中插入标签的光标记忆富文本编辑器</p>

      <section class="demo-section">
        <h2>1. 基础用法</h2>
        <p class="section-desc">支持多行输入、标签插入、光标位置记忆</p>
        <TagTextarea
          ref="value1Ref"
          v-model="value1"
          placeholder="请输入内容，可以插入标签，支持多行"
        />
        <div class="toolbar">
          <button class="btn btn-primary" @click="addTag(value1Ref)">+ 自定义标签</button>
          <button class="btn btn-danger" @click="clearContent(value1Ref, value1)">
            清空内容
          </button>
        </div>
        <div class="result-box">
          <h3>数据结构：</h3>
          <pre>{{ JSON.stringify(value1, null, 2) }}</pre>
        </div>
      </section>

      <section class="demo-section">
        <h2>2. 带默认数据</h2>
        <p class="section-desc">初始化时传入已包含文本和标签的数据，标签根据 value 显示不同颜色</p>
        <TagTextarea
          ref="value2Ref"
          v-model="value2"
          :tag-colors="tagColors"
        />
        <div class="toolbar">
          <button class="btn btn-primary" @click="addTag(value2Ref)">+ 添加标签</button>
        </div>
        <div class="result-box">
          <h3>数据结构：</h3>
          <pre>{{ JSON.stringify(value2, null, 2) }}</pre>
        </div>
      </section>

      <section class="demo-section">
        <h2>3. 禁用状态</h2>
        <p class="section-desc">禁用状态下不可编辑，标签不可删除</p>
        <TagTextarea
          ref="value3Ref"
          v-model="value3"
          :disabled="true"
          placeholder="禁用状态"
          :tag-colors="tagColors"
        />
        <div class="result-box">
          <h3>数据结构：</h3>
          <pre>{{ JSON.stringify(value3, null, 2) }}</pre>
        </div>
      </section>

      <section class="demo-section">
        <h2>4. 自定义高度</h2>
        <p class="section-desc">通过 minHeight 属性设置最小高度（默认 80px）</p>
        <TagTextarea
          ref="value4Ref"
          v-model="value4"
          placeholder="最小高度为 120px"
          :min-height="'120px'"
          :tag-colors="tagColors"
        />
        <div class="toolbar">
          <button class="btn btn-primary" @click="addTag(value4Ref)">+ 添加标签</button>
        </div>
        <div class="result-box">
          <h3>数据结构：</h3>
          <pre>{{ JSON.stringify(value4, null, 2) }}</pre>
        </div>
      </section>

      <section class="demo-section">
        <h2>5. 快捷标签插入</h2>
        <p class="section-desc">预设常用标签，快速插入到光标位置，标签颜色根据 value 自动匹配</p>
        <TagTextarea
          ref="value5Ref"
          v-model="value5"
          placeholder="点击下方快捷标签快速插入"
          :tag-colors="tagColors"
        />
        <div class="toolbar">
          <button
            v-for="tag in presetTags"
            :key="tag.value"
            class="btn btn-tag"
            :style="{ '--tag-color': tag.color }"
            @click="insertPresetTag(value5Ref, tag)"
          >
            {{ tag.label }}
          </button>
          <button class="btn btn-primary" @click="addTag(value5Ref)">+ 自定义</button>
        </div>
        <div class="result-box">
          <h3>数据结构：</h3>
          <pre>{{ JSON.stringify(value5, null, 2) }}</pre>
        </div>
      </section>

      <section class="demo-section">
        <h2>6. 自定义颜色配置</h2>
        <p class="section-desc">根据业务需求自定义不同类型标签的颜色，如用户、日期、工单等</p>
        <TagTextarea
          ref="value6Ref"
          v-model="value6"
          placeholder="显示自定义颜色标签的示例"
          :tag-colors="{
            default: '#409eff',
            username: '#67c23a',
            date: '#e6a23c',
            ticket_no: '#f56c6c',
            priority: '#9c27b0',
            status: '#00bcd4'
          }"
        />
        <div class="toolbar">
          <button class="btn" style="--tag-color: #67c23a" @click="value6Ref?.addTag({ type: 'username', label: '张三', value: 'username' })">
            用户
          </button>
          <button class="btn" style="--tag-color: #e6a23c" @click="value6Ref?.addTag({ type: 'date', label: '2024-03-30', value: 'date' })">
            日期
          </button>
          <button class="btn" style="--tag-color: #f56c6c" @click="value6Ref?.addTag({ type: 'ticket_no', label: '工单#5678', value: 'ticket_no' })">
            工单号
          </button>
          <button class="btn" style="--tag-color: #9c27b0" @click="value6Ref?.addTag({ type: 'priority', label: '高优先级', value: 'priority' })">
            优先级
          </button>
          <button class="btn" style="--tag-color: #00bcd4" @click="value6Ref?.addTag({ type: 'status', label: '处理中', value: 'status' })">
            状态
          </button>
          <button class="btn btn-danger" @click="clearContent(value6Ref, value6)">
            清空内容
          </button>
        </div>
        <div class="result-box">
          <h3>数据结构：</h3>
          <pre>{{ JSON.stringify(value6, null, 2) }}</pre>
        </div>
      </section>

      <section class="demo-section">
        <h2>使用说明</h2>
        <div class="usage-info">
          <h3>数据结构说明</h3>
          <ul>
            <li>文本节点：<code>{ type: 'text', label: '文本内容' }</code></li>
            <li>标签节点：
              <code>{ type: '标签类型', label: '显示文本', value: '自定义数据' }</code>
            </li>
          </ul>
          <ul>
            <li><code>type</code>: 标签类型，用于匹配颜色（如 'username'、'date'、'priority' 等）</li>
            <li><code>label</code>: 标签显示的文本内容</li>
            <li><code>value</code>: 标签的自定义数据，可存储任意值（ID、对象、复杂结构等）</li>
          </ul>
          <h3>Props</h3>
          <ul>
            <li><code>modelValue</code> (Array): 绑定值，数组包含文本节点和标签节点</li>
            <li><code>placeholder</code> (String): 占位符文本，默认空字符串</li>
            <li><code>disabled</code> (Boolean): 是否禁用，默认 false</li>
            <li><code>minHeight</code> (String): 最小高度，默认 '80px'</li>
            <li>
              <code>tagColors</code> (Object): 标签颜色配置，根据 tag 的 type 匹配颜色，默认配置：
              { default: '#409eff', user: '#67c23a', system: '#e6a23c', warning: '#f56c6c', info: '#909399' }
            </li>
          </ul>
          <h3>Methods（通过 ref 调用）</h3>
          <ul>
            <li>
              <code>addTag(tagData)</code>: 在当前光标位置插入标签，tagData 格式为
              <code>{ type: '标签类型', label: '显示文本', value: '自定义数据' }</code>
            </li>
            <li><code>clearContent()</code>: 清空编辑器内容</li>
            <li><code>getContent()</code>: 获取当前内容数组</li>
            <li><code>deleteTag(index)</code>: 删除指定索引的标签</li>
            <li><code>editTag(index, tagData)</code>: 编辑指定索引的标签</li>
            <li><code>focus()</code>: 聚焦编辑器</li>
            <li><code>blur()</code>: 失焦编辑器</li>
          </ul>
          <h3>Events</h3>
          <ul>
            <li><code>update:modelValue</code>: 值更新时触发</li>
            <li><code>change</code>: 内容变化时触发</li>
            <li><code>blur</code>: 失去焦点时触发</li>
            <li><code>focus</code>: 获得焦点时触发</li>
            <li><code>tag-add</code>: 添加标签时触发，参数为新标签数据</li>
            <li><code>tag-edit</code>: 编辑标签时触发，参数为标签索引和标签数据</li>
            <li><code>tag-delete</code>: 删除标签时触发，参数为标签索引和标签数据</li>
          </ul>
        </div>
      </section>
    </div>

    <!-- 标签编辑对话框 -->
    <div
      v-if="tagDialogVisible"
      class="dialog-overlay"
      @click.self="tagDialogVisible = false"
    >
      <div class="dialog">
        <div class="dialog-header">
          <h3>添加标签</h3>
          <button class="dialog-close" @click="tagDialogVisible = false">×</button>
        </div>
        <div class="dialog-body">
          <div class="form-item">
            <label>标签名称 <span class="required">*</span></label>
            <input
              v-model="tagForm.label"
              type="text"
              placeholder="请输入标签名称，如：用户名"
            />
          </div>
          <div class="form-item">
            <label>标签值</label>
            <input
              v-model="tagForm.value"
              type="text"
              placeholder="请输入标签值（可选），如：username"
            />
          </div>
          <div class="preview-box">
            <span class="preview-label">标签预览：</span>
            <span class="preview-tag">
              {{ tagForm.label || "标签预览" }}
            </span>
          </div>
        </div>
        <div class="dialog-footer">
          <button class="btn btn-default" @click="tagDialogVisible = false">取消</button>
          <button class="btn btn-primary" @click="handleConfirmTag">确定</button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.demo-container {
  max-width: 900px;
  margin: 0 auto;
  padding: 30px 20px;
}

.demo-container h1 {
  text-align: center;
  color: #303133;
  margin: 0 0 10px 0;
  font-size: 28px;
}

.description {
  text-align: center;
  color: #909399;
  margin: 0 0 40px 0;
  font-size: 14px;
}

.demo-section {
  margin-bottom: 40px;
  padding: 24px;
  border: 1px solid #e4e7ed;
  border-radius: 8px;
  background-color: #fff;
}

.demo-section h2 {
  margin-top: 0;
  color: #303133;
  font-size: 20px;
  font-weight: 600;
}

.section-desc {
  color: #909399;
  font-size: 14px;
  margin: 8px 0 16px 0;
}

.toolbar {
  margin: 16px 0;
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
}

.btn {
  padding: 8px 16px;
  border: 1px solid #dcdfe6;
  border-radius: 4px;
  background-color: #fff;
  color: #606266;
  font-size: 14px;
  cursor: pointer;
  transition: all 0.2s;
  font-weight: 500;
}

.btn:hover {
  color: #409eff;
  border-color: #c6e2ff;
  background-color: #ecf5ff;
}

.btn-primary {
  color: #fff;
  background-color: #409eff;
  border-color: #409eff;
}

.btn-primary:hover {
  background-color: #66b1ff;
  border-color: #66b1ff;
  color: #fff;
}

.btn-danger {
  color: #f56c6c;
  border-color: #fbc4c4;
  background-color: #fef0f0;
}

.btn-danger:hover {
  color: #fff;
  background-color: #f56c6c;
  border-color: #f56c6c;
}

.btn-tag {
  background-color: #f0f2f5;
  border-color: #dcdfe6;
}

.btn-tag:hover {
  background-color: var(--tag-color, #6c5fb1);
  border-color: var(--tag-color, #6c5fb1);
  color: #fff;
}

.result-box {
  margin-top: 20px;
  padding: 16px;
  background-color: #f5f7fa;
  border-radius: 6px;
  border: 1px solid #e4e7ed;
}

.result-box h3 {
  margin-top: 0;
  margin-bottom: 12px;
  font-size: 14px;
  color: #606266;
  font-weight: 600;
}

.result-box pre {
  margin: 0;
  padding: 12px;
  background-color: #fff;
  border: 1px solid #e4e7ed;
  border-radius: 4px;
  font-size: 12px;
  overflow-x: auto;
  color: #606266;
  font-family: "Consolas", "Monaco", "Courier New", monospace;
}

/* 使用说明 */
.usage-info h3 {
  font-size: 16px;
  color: #303133;
  margin: 20px 0 10px 0;
}

.usage-info h3:first-child {
  margin-top: 0;
}

.usage-info ul {
  margin: 0 0 0 20px;
  padding: 0;
}

.usage-info li {
  margin: 8px 0;
  font-size: 14px;
  color: #606266;
  line-height: 1.6;
}

.usage-info code {
  padding: 2px 6px;
  background-color: #f5f7fa;
  border-radius: 3px;
  color: #e96900;
  font-family: "Consolas", "Monaco", monospace;
  font-size: 13px;
}

.required {
  color: #f56c6c;
}

/* 对话框样式 */
.dialog-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 2000;
  backdrop-filter: blur(2px);
}

.dialog {
  background-color: #fff;
  border-radius: 8px;
  width: 480px;
  max-width: 90%;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.15);
  animation: dialog-in 0.2s ease-out;
}

@keyframes dialog-in {
  from {
    opacity: 0;
    transform: translateY(-20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.dialog-header {
  padding: 18px 24px;
  border-bottom: 1px solid #e4e7ed;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.dialog-header h3 {
  margin: 0;
  font-size: 18px;
  color: #303133;
  font-weight: 600;
}

.dialog-close {
  border: none;
  background: none;
  font-size: 28px;
  color: #909399;
  cursor: pointer;
  padding: 0;
  line-height: 1;
  transition: color 0.2s;
  width: 28px;
  height: 28px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 4px;
}

.dialog-close:hover {
  color: #303133;
  background-color: #f5f7fa;
}

.dialog-body {
  padding: 24px;
}

.form-item {
  margin-bottom: 20px;
}

.form-item:last-of-type {
  margin-bottom: 0;
}

.form-item label {
  display: block;
  margin-bottom: 8px;
  font-size: 14px;
  color: #606266;
  font-weight: 500;
}

.form-item input[type="text"] {
  width: 100%;
  padding: 10px 14px;
  border: 1px solid #dcdfe6;
  border-radius: 4px;
  font-size: 14px;
  color: #606266;
  box-sizing: border-box;
  transition: border-color 0.2s;
}

.form-item input[type="text"]:focus {
  outline: none;
  border-color: #409eff;
  box-shadow: 0 0 0 2px rgba(64, 158, 255, 0.1);
}

.form-item input[type="text"]::placeholder {
  color: #c0c4cc;
}

.preview-box {
  margin-top: 20px;
  padding: 14px 16px;
  background-color: #f5f7fa;
  border-radius: 6px;
  display: flex;
  align-items: center;
  gap: 10px;
  border: 1px solid #e4e7ed;
}

.preview-label {
  font-size: 14px;
  color: #909399;
  font-weight: 500;
}

.preview-tag {
  padding: 6px 14px;
  border-radius: 4px;
  background-color: #6c5fb1;
  color: white;
  font-size: 13px;
  display: inline-block;
  font-weight: 500;
}

.dialog-footer {
  padding: 16px 24px;
  border-top: 1px solid #e4e7ed;
  display: flex;
  justify-content: flex-end;
  gap: 10px;
  background-color: #f9fafc;
  border-radius: 0 0 8px 8px;
}

.btn-default {
  color: #606266;
  background-color: #fff;
  border-color: #dcdfe6;
}

.btn-default:hover {
  color: #409eff;
  border-color: #c6e2ff;
  background-color: #ecf5ff;
}
</style>
