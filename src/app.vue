<template>
  <div>
    <router-view />
  </div>
</template>

<script>
export default {
  data() {
    return {
      text: '不是阿怪的阿怪'
    }
  },
  methods: {}
}
</script>

<style lang="less" scoped>
.text {
  color: red;
}
</style>
