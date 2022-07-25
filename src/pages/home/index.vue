<template>
  <div>
    <div>'vuex-state:'{{ text }}</div>
    <div>'vuex-getter:'{{ getText }}</div>
    <button @click="setText(123)">修改state的值</button>
    <img :src="aaa" alt="" />
    <img :src="aaa1" alt="" />
    <img :src="ddd" alt="" />
  </div>
</template>
<script>
import { mapGetters, mapState, mapActions } from 'vuex'

import { ccc } from '@/utils/index'
console.log(ccc, ccc('dddd'))
import aaa from '@/assets/images/demo.jpg'
const aaa1 = require('@/assets/images/demo.jpg')
import ddd from '../../assets/images/demo.jpg'
console.log(aaa, aaa1.default, ddd)
// import {dateFormat, copy} from 'hx-utils' // 只有配置npmrc 才能下载
// console.log(dateFormat, 'dateFormat')
// console.log(dateFormat('YY-DD', new Date))

export default {
  data() {
    return {
      aaa,
      aaa1: aaa1.default,
      ddd
    }
  },
  computed: {
    ...mapState(['text']),
    ...mapGetters(['getText'])
  },
  mounted() {
    console.log(this.aaa, 'this.aaa')
  },
  methods: {
    ...mapActions(['setText'])
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
