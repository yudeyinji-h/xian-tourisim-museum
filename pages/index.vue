<template>
  <div class="container" style="100%">
    <h1>西安旅游博物馆</h1>
    <button>
      <nuxt-link to="/museumList" class="hrefStyle">Go</nuxt-link>
    </button>
  </div>
</template>

<script>
export default {
  components: {}
};
</script>

<style>
/* Sample `apply` at-rules with Tailwind CSS
.container {
  @apply min-h-screen flex justify-center items-center text-center mx-auto;
}
*/
.container {
  margin: 0 auto;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
}
button {
  display: block;
  height: 50px;
  margin: 10px;
  background-color: skyBlue;
  padding: 0 30px;
  border-radius: 10px;
  outline: none;
}
.hrefStyle {
  outline: none;
}
</style>
