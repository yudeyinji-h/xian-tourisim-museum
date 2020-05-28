<template>
  <div class="w-screen h-screen bg-purple-800 pt-6">
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
    <div
      class="w-11/12 h-12 mx-auto mt-8 rounded-full overflow-hidden subShadow"
      @click="checkclicked"
    >
      <nuxt-link
        to="/map"
        class="w-full h-full flex items-center justify-center text-white font-semibold submitt"
      >提 交</nuxt-link>
    </div>

    <!-- 弹窗提示 -->
    <div
      class="bg-gray-100 border border-red-500 text-red-700 px-4 py-3 rounded relative dialog hidden"
      role="alert"
      ref="mess"
    >
      <span>请选择您去过的博物馆！</span>
    </div>
  </div>
</template>
<script>
import { mapState, mapMutations, mapGetters } from "vuex";

export default {
  data() {
    return {
      isActive: false
    };
  },
  mounted() {
    this.addSelect();
  },
  computed: {
    ...mapState(["museums"]),
    ...mapGetters(["addressArr"])
  },
  methods: {
    ...mapMutations(["changeSelected", "addSelect"]),
    isSelected(id) {
      this.changeSelected(id);
    },
    checkclicked() {
      if (this.addressArr.length === 0) {
        this.$refs.mess.style.display = "block";
        setTimeout(() => {
          this.$refs.mess.style.display = "none";
        }, 1500);
      }
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
.dialog {
  position: fixed;
  bottom: 16%;
  left: 20%;
}
</style>