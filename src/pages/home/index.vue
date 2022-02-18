<template >
  <div>
    <div>'vuex-state:'{{ text }}</div>
    <div>'vuex-getter:'{{ getText }}</div>
    <button @click="setText(123)">修改state的值</button>
  </div>
</template>
<script>
import { mapGetters, mapState, mapActions } from "vuex"
import {ccc} from '@/utils/index'
console.log(ccc('dddd'))
import aaa from '@/assets/images/demo.jpg'
// import {dateFormat, copy} from 'hx-utils' // 只有配置npmrc 才能下载
// console.log(dateFormat, 'dateFormat')
// console.log(dateFormat('YY-DD', new Date))

export default {
  data() {
    return {
      ddd:222
    }
  },
  computed: {
    ...mapState(['text']),
    ...mapGetters(['getText'])
  },
  methods: {
    ...mapActions(['setText']),
    // copyHandler() {
    //   复制功能，必须有人为事件，否则chrome 不会自动复制 例如播放视频也是无法自动播放
    //   copy('222').then(res => {
    //     console.log('success')
    //   }).catch(err => {
    //     console.log(err, 'err')
    //   })
    // }
  }
}
</script>
