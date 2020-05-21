<template>
  <div class="w-screen h-screen  bg-indigo-800 pt-6">
    <div class="w-auto listItem bg-green-500 mx-4 rounded-md flex overflow-hidden">
      <ul class="h-full flex justify-around flex-wrap py-1 px-1 overflow-y-scroll mt-2">
          <li
            v-for="(item,id) in museums"
            :key="id"
            :class="[{activeMuseum:item.selected,eachMuseum:true}]"
            @click="isSelected(id)"
          >{{item.museum}}</li>
        </ul>
    </div>
    <div class="w-11/12 h-12 mx-auto mt-8 rounded-full overflow-hidden subShadow">
      <nuxt-link
        to="/map"
        class="w-full h-full flex items-center justify-center text-white font-semibold submitt"
      >提 交</nuxt-link>
    </div>
  </div>
</template>
<script>
import { mapState, mapMutations } from "vuex";
export default {
  layout: "showMap",
  data() {
    return {
      isActive: false
    };
  },
  mounted() {
    this.addSelect();
  },
  computed: {
    ...mapState(["museums"])
  },
  methods: {
    ...mapMutations(["changeSelected", "addSelect"]),
    isSelected(id) {
      this.changeSelected(id);
    }
  }
};
</script>

<style>

.listItem {
  height: 80%;
}
.eachMuseum {
  height: 14%;
  width: 30%;
  background-color: #fff;
  color: green;
  margin: 6px 4px;
  border-radius: 6px;
  font-size: 12px;
  padding: 8px 5px;
  text-align: justify;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
}
.activeMuseum {
  background-color: rgb(230, 100, 82);
  border: 1px solid #fff;
  color: #fff;
}
.submitt {
  background: linear-gradient(to right, rgb(14, 194, 119), rgb(12, 221, 211));
  text-shadow: 0 3px 3px rgb(88, 88, 88);
}
.submitt:active {
  -webkit-tap-highlight-color: transparent;
}
.subShadow {
  box-shadow: 0 3px 3px rgb(13, 136, 120);
}
</style>