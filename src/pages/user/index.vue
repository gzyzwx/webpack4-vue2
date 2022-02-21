<template>
  <div>
    <div>Vue Router user111搞定{{ aaa }}</div>
  </div>
</template>

<script>
export default {
  data: () => {
    return {
      aaa: '111'
    }
  },
  mounted() {
    let a = 1
    console.log(a)
    console.log(1, '1', a)
  }
}
</script>

<style></style>
