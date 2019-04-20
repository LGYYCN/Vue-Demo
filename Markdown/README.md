# 	项目一：Markdown 笔记本

### 目标：
>
> 1. 本应用将允许用户以 Markdown 的标记语言来进行书写笔记。
>
> 2. 支持 Markdown 实时预览。
>
> 3. 用户可以添加任意多条笔记。
>
> 4. 笔记可以在用户下次打开应用的时候重新加载出来。
>
### 应用界面：
>
> 1. 笔记编辑器作为主要内容呈现在中间；
> 2. 右侧面板用来实时预览当前的 Markdown 笔记；
> 3. 左侧面板上有笔记列表和添加笔记的按钮。

### 项目笔记

#### 1、About watch

   ```js
   /**
    * [watch侦听器]
    * watch 选项是一个字典, 被侦听的属性作为键, 把侦听选项对象作为值
    * 选项对象必须有一个 [handler] 属性, 该属性可以是一个函数, 也可以是一个方法名
    * [handler] 属性有两个参数 [newVal] [oldVal], 即被侦听的值的新值与旧值
    */
   watch: {
   	selectedNote(v, o) {
   		console.log(`${v} == ${o}`)
   	},
   	notes: {
   		handler: 'saveNotes',
   		deep: true,
   	},
   	selectedId(val) {
   		localStorage.setItem('selected-id', val)
   	},
   	info_content: {
   		handler(val, oldVal) {
         console.log(val, oldVal)
         localStorage.setItem('content', val)
       },
       /**
        * 与 [handler] 一起使用的还有 [deep]
        * [deep] 是一个 [布尔] 类型
        * 值为 [true] 则 Vue 会以递归的方式侦听对象内部值的变化
        */
       deep: false,
       /**
        * 还有 [immediate] 也是一个 [布尔] 类型
        * 值为 [true] 会在页面刷新时立即触发调用处理函数, 不需要等待数据的第一次改变
        */
       immediate: false,
     },
     /**
      * 上述方法可以简写为如下
      * content(val,oldVal){
      *   console.log(val,oldVal);
      * }
      */
     // 因为简写 + 可以使用方法名, 故最终简写形式如下
     content: 'saveNote',
   }
   ```

#### 2、异或运算运用 — boolean值取反

```js
var boo = true
// 使用 ! 取反
boo = !boo
// 使用 ^ (亦或运算符)
boo = boo ^ true
// 使用 ^ 进一步简写
boo ^= true
```

#### 3、文本统计相关 — 正则

```js
inesCount() {
  // 计算行数
  if (this.selectedNote) {
    // 以换行、回车作为分隔符，计算数组长度
    return this.selectedNote.content.split(/\r\n|\n|\r/).length
  }
},
wordsCount() {
  if (this.selectedNote) {
    let s = this.selectedNote.content
    // 将 换行 转为 空格
    s = s.replace(/\n/g, ' ')
    // 排除开头与结尾的空格
    s = s.replace(/(^\s*)|(\s*$)/gi, '')
    // 将多个重复的空格转换为一个
    s = s.replace(/\s\s+/gi, ' ')
    // 以空格为分隔符，返回最终的单词数量
    return s.split(' ').length
  }
},
charactersCount() {
  if (this.selectedNote) {
    // 直接获取字符串总长度
    return this.selectedNote.content.split('').length
  }
}
```

#### 4、数组排序 — sort()

```js
/**
 * 在本项目中，对于笔记列表进行如下排序
 * 1、收藏的笔记显示在前面
 * 2、先创建的笔记显示在前面
 */
// 创建时间排序
sort((a,b) => a.created - b.created)
// 在时间排序的基础上，再收藏排序，如果两条笔记都收藏了，则不变位置；
// 如果 a 收藏了而 b 没有，则返回负值(即 a 在 b 之前)；
// 如果 b 收藏了而 a 没有，则返回正值(即 a 在 b 之后）
sort((a,b) => a.favorite === b.favorite ? 0 : a.favorite ? -1 : 1)

```







