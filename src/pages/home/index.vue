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
  }
}
</script>
