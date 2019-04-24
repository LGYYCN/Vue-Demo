<template>
    <li class="movie">
      {{movie.title}}
    </li>
</template>

<script scoped>
export default {
props:['movie']
}
</script>

<style scoped lang='scss'>
.movie:not(:last-child){
  padding-bottom: 6px;
  margin-bottom: 6px;
  border-bottom: 1px solid rgba(0,0,0,.1)
}
</style>
