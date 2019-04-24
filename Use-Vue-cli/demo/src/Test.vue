<template>
  <div>
    <p>
      {{message}}
    </p>
    <input type="text" v-model="message">
  </div>
</template>

<script scoped>
export default {
  data() {
    return {
      message: 'Hello world!'
    }
  },
}
</script>

<style scoped>
  p {
    color: gray
  }
</style>
