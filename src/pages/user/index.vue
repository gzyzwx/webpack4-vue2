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
    console.log(1, '1')
  }
}
</script>

<style></style>
