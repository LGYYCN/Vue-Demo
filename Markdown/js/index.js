new Vue({
  el: '#notebook',
  data() {
    return {
      content: '',
      notes: JSON.parse(localStorage.getItem('notes')) || [],
      selectedId: localStorage.getItem('selected-id') || null,
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
    sortedNotes() {
      return this.notes
        .slice()
        .sort((a, b) => {
          return a.created - b.created
        })
        .sort((a, b) => {
          return a.favorite === b.favorite ? 0 : a.favorite ? -1 : 1
        })
    },
    linesCount() {
      // 计算行数
      if (this.selectedNote) {
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
        return s.split(' ').length
      }
    },
    charactersCount() {
      if (this.selectedNote) {
        return this.selectedNote.content.split('').length
      }
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
    saveNotes() {
      localStorage.setItem('notes', JSON.stringify(this.notes))
    },
    removeNote() {
      if (this.selectedNote && confirm('Delete the note?')) {
        const index = this.notes.indexOf(this.selectedNote)
        if (index !== -1) {
          this.notes.splice(index, 1)
        }
      }
    },
    favoriteNote() {
      this.selectedNote.favorite = !this.selectedNote.favorite
    },
  },
  /**
   * [watch侦听器]
   * watch 选项是一个字典, 被侦听的属性作为键, 把侦听选项对象作为值
   * 选项对象必须有一个 [handler] 属性, 该属性可以是一个函数, 也可以是一个方法名
   * [handler] 属性有两个参数 [newVal] [oldVal], 即被侦听的值的新值与旧值
   */
  watch: {
    notes: {
      handler: 'saveNotes',
      deep: true,
    },
    selectedId(val) {
      localStorage.setItem('selected-id', val)
    },
    selectedNote(val) {
      console.log(val)
    },
  },
  filters: {
    date(time) {
      return moment(time).format('YYYY/MM/DD HH:mm:ss')
    },
  },
})
// const html=marked('**bold** *Italic* [link](https://www.baidu.com)') // console.log(html)
