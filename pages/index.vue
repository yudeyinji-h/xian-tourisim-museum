<template>
  <div class="w-screen h-screen bg-indigo-800 flex justify-center">
    <nuxt-link
      to="/museumList"
      class="goLink w-10/12 h-12 bg-red-400 rounded-full fixed flex items-center justify-center text-white font-medium"
    >点 亮 我 的 足 迹</nuxt-link>
  </div>
</template>

<script>
export default {};
</script>

<style>
/* Sample `apply` at-rules with Tailwind CSS
.container {
  @apply min-h-screen flex justify-center items-center text-center mx-auto;
}
*/
.goLink {
  position: fixed;
  bottom: 15%;
  box-shadow: 0 4px 4px rgb(233, 104, 104);
  text-shadow: 0 3px 3px rgb(88, 88, 88);
}
.goLink:active {
  -webkit-tap-highlight-color: transparent;
}
</style>
