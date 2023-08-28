# print-dom-js

<div align="center">

<h1 align="center">print-dom-js</h1>

一个用于Web的打印插件，它的主要功能是将指定的 DOM 元素内容打印出来

</div>


# 使用指南

## 安装

npm 安装：

```bash
npm i print-dom-js --save
```

yarn 安装：

```bash
yarn add print-dom-js --save
```

## 开始使用

# 基本示例


```javascript
<template>
  <div ref="box">
    <div class="noPrints">不打印</div>
    <div>打印</div>
  </div>
  <button @click="pr.startPrint">打印</button>
</template>

<script setup lang="ts">
  import { reactive, ref, nextTick } from "vue";
  import Print from "print-dom-js";
  let pr = ref(null);
  nextTick(() => {
  pr.value = new Print({dom:box.value, options:[".noPrints"],callback:(value)=>{
    console.log("打印完成",value);
  },watermark:"测试水印"});
  console.log(pr.value);
});
</script>
```

## Props


| 名称          |         说明          |  类型   | 可选值 |                    默认值                    |
| ------------- | :-------------------: | :-----: | :----: | :------------------------------------------: |
| dom         |      Dom实例       | string  |   -    |                                         |
| options        |      要排除的元素       | Array  |   -    |                                         |
| callback         |     成功的回调      | function  |   -    |                                       |
| watermark           |       水印        | string  |   -    |                      -                       |




# Author
