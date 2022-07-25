<template>
  <div class="page">
    <img :src="img" alt="" />
    1111
    <div id="lottie_box"></div>
    <button @click="startFun">播放</button>
    <button @click="suspendFun">暂停</button>
  </div>
</template>

<script>
import lottie from 'lottie-web'
import aaa from '@/assets/images/demo.jpg'
import donghua from '@/assets/data.json'
console.log(aaa)
export default {
  name: 'Lottie',
  data() {
    return {
      lottie: {},
      img: aaa
    }
  },
  mounted() {
    this.lottie = lottie.loadAnimation({
      container: document.getElementById('lottie_box'),
      renderer: 'svg',
      loop: true,
      path: donghua
      // path: 'https://labs.nearpod.com/bodymovin/demo/markus/halloween/markus.json'
    })
  },
  methods: {
    suspendFun: function () {
      this.lottie.pause()
    },
    startFun: function () {
      this.lottie.play()
    }
  }
}
</script>

<style>
.page {
  width: 750px;
}
</style>
