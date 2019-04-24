<template>
  <ul class="movies">
    <Movie v-for="(item, index) in movies"
           :key="index"
           :movie="item">
    </Movie>
  </ul>
</template>
<script scoped>
import Movie from "./Movie";
export default {
  data() {
    return {
      movies: [
        {
          id: 0,
          title: "复仇者联盟"
        },
        {
          id: 1,
          title: "英雄联盟"
        },
        {
          id: 1,
          title: "英雄联盟"
        },
        {
          id: 1,
          title: "英雄联盟"
        }
      ]
    };
  },
  components: { Movie }
};
</script>

<style scoped lang='scss'>
</style>
