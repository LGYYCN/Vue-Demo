new Vue({
  el: '#notebook',
  data() {
    return {
      content: '',
      notes: [],
      selectedId: null,
    }
  },
  created() {
    this.content =
      localStorage.getItem('content') || 'You can write in **Markdown**!'
    console.log(this.content)
  },
  computed: {
    addButtonTitle() {
      return `${this.notes.length} note(s) already!`
    },
    selectedNote() {
      return this.notes.find(note => note.id === this.selectedId)
    },
    notePreview() {
      return this.selectedNote ? marked(this.selectedNote.content) : ''
    },
  },
  methods: {
    addNote() {
      const time = Date.now()
      const note = {
        id: String(time),
        title: `Now note ${this.notes.length + 1}`,
        content:
          '**Hi!** This notebook is using [markdown](https://github.com/adam-p/markdown-here/wiki/Markdown-Cheatsheet) for formatting!',
        created: time,
        favorite: false,
      }
      this.notes.push(note)
      this.selectNote(note)
    },
    selectNote(note) {
      this.selectedId = note.id
    },
    log() {
      console.log(this.selectedNode)
    },
  },
  /**
   * [watch侦听器]
   * watch 选项是一个字典, 被侦听的属性作为键, 把侦听选项对象作为值
   * 选项对象必须有一个 [handler] 属性, 该属性可以是一个函数, 也可以是一个方法名
   * [handler] 属性有两个参数 [newVal] [oldVal], 即被侦听的值的新值与旧值
   */
  watch: {
    // info_content: {
    //   handler(val, oldVal) {
    //     console.log(val, oldVal)
    //     localStorage.setItem('content', val)
    //   },
    //   /**
    //    * 与 [handler] 一起使用的还有 [deep]
    //    * [deep] 是一个 [布尔] 类型
    //    * 值为 [true] 则 Vue 会以递归的方式侦听对象内部值的变化
    //    */
    //   deep: false,
    //   /**
    //    * 还有 [immediate] 也是一个 [布尔] 类型
    //    * 值为 [true] 会在页面刷新时立即触发调用处理函数, 不需要等待数据的第一次改变
    //    */
    //   immediate: false,
    // },
    /**
     * 上述方法可以简写为如下
     * content(val,oldVal){
     *   console.log(val,oldVal);
     * }
     */
    // 因为简写 + 可以使用方法名, 故最终简写形式如下
    // content: 'saveNote',
  },
})
// const html=marked('**bold** *Italic* [link](https://www.baidu.com)') // console.log(html)
