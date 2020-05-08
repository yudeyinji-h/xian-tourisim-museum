<template>
  <div class="container" style="height:100%">
    <ul>
      <li
        v-for="(item,id) in museums"
        :key="id"
        class="eachMuseum"
        @click="isSelected(id)"
      >{{item.museum}}</li>
    </ul>
  </div>
</template>

<script>
import { mapState, mapMutations } from "vuex";
export default {
  data() {
    return {};
  },
  //created() {
  //  this.addSelect();
    
  //},
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
      console.log(this.museums[id])
    }
  }
};
</script>

<style>
.container {
  margin: 60px 0;
}
.eachMuseum {
  width: 30%;
  height: 60px;
  background-color: rgb(228, 226, 133);
  margin: 4px;
  float: left;
  color: #000;
  font-size: 13px;
  text-align: center;
  padding: 3px;
}
.activeMuseum {
  background-color: orange;
  color: #fff;
}
</style>