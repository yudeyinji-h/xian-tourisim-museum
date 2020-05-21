<template>
  <div class="w-screen h-screen p-6 bg-indigo-800 flex flex-col items-center">
    <div class="rounded-lg overflow-hidden" ref="mapp"></div>
    <div
      class="w-11/12 h-12 bg-red-400 rounded-full text-white flex items-center justify-center mt-8"
      @click="getMapImage"
    >保存图片</div>
  </div>
</template>
<script>
import { mapGetters } from "vuex";
import { option } from "~/config/map-option";
import "echarts/extension/bmap/bmap";
import { loadBMap } from "~/plugins/map";

export default {
  data() {
    return {
      option,
      isLoaded: false
    };
  },

  // beforeCreate() {
  //   // 在页面创建之前，把百度分享的参数置空
  //   if (process.client) {
  //     window._bd_share_main = "";
  //   }
  // },

  mounted() {
    this.loadMapSize();
    let mapChart = this.$echarts.init(this.$refs.mapp);
    this.option.series[0].data = this.addressArr;
    loadBMap("ralOwiDmBSaW5S8DMDhjFsuivtiAK2dm").then(() => {
      mapChart.setOption(this.option);
      this.isLoaded = true;
    });
  },
  computed: {
    ...mapGetters(["addressArr"])
  },
  methods: {
    async getMapImage() {
      if (process.client && this.isLoaded) {
        this.isLoaded = false;
        let html2canvas = require("html2canvas");
        const canvas = await html2canvas(this.$refs.mapp, { useCORS: true });
        let mapLink = document.createElement("a");
        mapLink.href = canvas.toDataURL("image/png", 1);
        // mapLink.crossOrigin = "anonymous";
        mapLink.download = "myMap";
        document.body.appendChild(mapLink);
        mapLink.click();
        document.body.removeChild(mapLink);
      }
    },
    loadMapSize() {
      this.$refs.mapp.style.width = 90 + "vw";
      this.$refs.mapp.style.height = 75 + "vh";
      // 相当于
      // this.$refs.mapp.style.width = window.innerWidth * 0.9 + 'px';
      // this.$refs.mapp.style.height = window.innerHeight * 0.75 + 'px';
    },
    
  

    // reurl() {
    //   // 解决第一次进入不加载js文件
    //   if (location.href.indexOf("#reloaded") === -1) {
    //     location.href = location.href + "#reloaded";
    //     location.reload();
    //   }
    // }
  }
};
</script>

<style>
/* .mapp {
  height: 587px;
} */
/* .mapview {
  height: 460px;
} */
/* 隐藏百度地图版权信息 */
.anchorBL {
  display: none;
}
/* 隐藏百度地图logo */
.BMap_cpyCtrl {
  display: none;
}
</style>