// 获取终端的相关信息
let terminal = {
  // 辨别移动终端类型
  platform: (function() {
    let u = navigator.userAgent
    let app = navigator.appVersion

    return {
      //IE内核
      windows: u.indexOf('Windows') > -1,
      //opera内核
      presto: u.indexOf('Presto') > -1,
      //苹果、谷歌内核
      webKit: u.indexOf('AppleWebKit') > -1,
      //火狐内核
      gecko: u.indexOf('Gecko') > -1 && u.indexOf('KHTML') == -1,
      //是否为移动终端
      mobile: !!u.match(/AppleWebKit.*Mobile.*/) || !!u.match(/AppleWebKit/),
      //ios终端
      ios: !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/),
      //android终端或者uc浏览器
      android: u.indexOf('Android') > -1 || u.indexOf('Linux') > -1,
      //是否iPad
      iPad: u.indexOf('iPad') > -1,
      //是否为iPhone或者QQHD浏览器
      iPhone: u.indexOf('iPhone') > -1,
      //是否为mac系统
      Mac: u.indexOf('Macintosh') > -1,
      //是否web应该程序，没有头部与底部
      webApp: u.indexOf('Safari') == -1,
    }
  })(),
  // 辨别移动终端的语言：zh-cn、en-us、ko-kr、ja-jp...
  language: (navigator.browserLanguage || navigator.language).toLowerCase(),
}

console.log((navigator.browserLanguage || navigator.language).toLowerCase())
// Ready translated locale messages

const messages = {
  'zh-cn': {
    toolbar: {
      add: '添加笔记',
      lines: '行数',
      words: '词数',
      characters: '字数',
      created: '记录时间',
      delete: '删除',
      favorite: '收藏',
    },
  },
  en: {
    toolbar: {
      add: 'Add Note',
      lines: 'Lines',
      words: 'Words',
      characters: 'Characters',
      created: 'Created',
      delete: 'Remove Note',
      favorite: 'Favorite Note',
    },
  },
}

// Create VueI18n instance with options
const i18n = new VueI18n({
  locale: terminal.language, // set locale
  messages, // set locale messages
})

// console.log(terminal.language)

// Create a Vue instance with `i18n` option
// md({ i18n }).$mount('#app')

// Now the app has started!

let md = new Vue({
  el: '#notebook',
  data() {
    return {
      content: '',
      notes: JSON.parse(localStorage.getItem('notes')) || [],
      selectedId: localStorage.getItem('selected-id') || null,
    }
  },
  computed: {
    addButtonTitle() {
      if (terminal.language == 'en') {
        return `${this.notes.length} note(s) already!`
      } else {
        return `${this.notes.length} 条记录!`
      }
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
  i18n,
})

/// const html=marked('**bold** *Italic* [link](https://www.baidu.com)') // console.log(html)
