<template>
  <div class="w-screen h-screen p-6 bg-purple-800 flex flex-col items-center">
    <div class="rounded-lg overflow-hidden" ref="mapp"></div>
    <div
      class="w-11/12 h-12 bg-red-400 rounded-full text-white flex items-center justify-center mt-8"
      @click="getMapImage()"
    >保存图片</div>
  </div>
</template>
<script>
import { mapGetters } from "vuex";
import { option } from "~/config/map-option";
import "echarts/extension/bmap/bmap";
import { loadBMap } from "~/plugins/map";
export default {
  middleware: "auth",
  data() {
    return {
      option
    };
  },

  mounted() {
    this.loadMapSize();
    let mapChart = this.$echarts.init(this.$refs.mapp);
    this.option.series[0].data = this.addressArr;
    loadBMap("ralOwiDmBSaW5S8DMDhjFsuivtiAK2dm").then(() => {
      mapChart.setOption(this.option);
    });
  },
  computed: {
    ...mapGetters(["addressArr"])
  },
  methods: {
    async getMapImage() {
      if (process.client) {
        let html2canvas = require("html2canvas");
        const canvas = await html2canvas(this.$refs.mapp, {
          useCORS: true,
          allowTaint: false
        });
        canvas.id = "mapcanvas";
        canvas.toBlob(blob => {
          if (this.getBrowser() === "IE" || this.getBrowser() === "Edge") {
            window.navigator.msSaveBlob(blob, "mapImage.png");
          } else if (this.getBrowser() === "wx") {
            const ctx = wx.createCanvasContext("mapcanvas");
            ctx.setFillStyle("white");
            ctx.draw(
              true,
              setTimeout(() => {
                // wx.canvasToTempFilePath把当前画布指定区域的内容导出生成指定大小的图片，并返回文件路径
                wx.canvasToTempFilePath({
                  x: 0,
                  y: 0,
                  fileType: "png",
                  canvasId: "mapcanvas",
                  success: function(res) {
                    // 通过wx.saveImageToPhotosAlbum保存图片到本地
                    wx.saveImageToPhotosAlbum({
                      filePath: res.tempFilePath,
                      success: res => {
                        wx.showModal({
                          title: "图片保存成功",
                          icon: "success",
                          duration: 1000
                        });
                      },
                      fail: err => {}
                    });
                  },
                  fail: function(res) {
                    if (
                      res.errMsg === "saveImageToPhotosAlbum:fail auth deny" ||
                      res.errMsg == "saveImageToPhotosAlbum:fail:auth denied" ||
                      res.errMsg ==
                        "saveImageToPhotosAlbum:fail authorize no response"
                    ) {
                      wx.showModal({
                        title: "提示",
                        content: "需要授权才可保存图片",
                        showCancel: false,
                        success(res) {
                          if (res.confirm) {
                            wx.openSetting({
                              success(settingdata) {
                                if (
                                  settingdata.authSetting[
                                    "scope.writePhotosAlbum"
                                  ]
                                ) {
                                  wx.showToast({
                                    title: "获取权限成功，再次点击可保存图片",
                                    icon: "none",
                                    duration: 1000
                                  });
                                } else {
                                  wx.showToast({
                                    title: "获取权限失败",
                                    icon: "none",
                                    duration: 1000
                                  });
                                }
                              },
                              fail() {
                                wx.showToast({
                                  title: "获取权限失败",
                                  icon: "none",
                                  duration: 2000
                                });
                              }
                            });
                          }
                        }
                      });
                    }
                  }
                });
              }, 100)
            );
            ctx.save();
          } else {
            const bloburl = window.URL.createObjectURL(blob);
            const a = document.createElement("a");
            a.href = bloburl;
            a.download = "mapImage.png" || "image";
            document.body.appendChild(a);
            a.style.display = "none";
            a.click();
            document.body.removeChild(a);
            window.URL.revokeObjectURL(a.href);
          }
        });

        // const blob = this.dataURLtoBlob(canvas.toDataURL("image/png"));
        // if (this.getBrowser() === "IE" || this.getBrowser() === "Edge") {
        //   window.navigator.msSaveBlob(blob, "mapImage.png");
        // } else if (this.getBrowser() === "wx") {
        //   // wx.canvasToTempFilePath把当前画布指定区域的内容导出生成指定大小的图片，并返回文件路径。
        //   wx.canvasToTempFilePath({
        //     x: 0,
        //     y: 0,
        //     canvasId: "mapcanvas",
        //     success: function(res) {
        //       console.log(res.tempFilePath);
        //       // 通过wx.saveImageToPhotosAlbum保存图片到本地
        //       wx.saveImageToPhotosAlbum({
        //         filePath: res.tempFilePath,
        //         success: res => {
        //           console.log("保存成功");
        //           wx.showModal({
        //             title: "保存成功",
        //             content: "图片已保存到相册"
        //           });
        //         },
        //         fail: err => {}
        //       });
        //     }
        //   });
        // } else {
        //   // 将画布内容转为Blob
        //   canvas.toBlob(blob => {
        //     // blob转为同源url
        //     let bloburl = window.URL.createObjectURL(blob);
        //     const a = document.createElement("a");
        //     a.href = bloburl;
        //     a.download = "mapImage.png" || "image";
        //     document.body.appendChild(a);
        //     a.style.display = "none";
        //     a.click();
        //     document.body.removeChild(a);
        //     window.URL.revokeObjectURL(a.href);
        //   });
        // }

        // 方案二
        // if (this.getBrowser() === "IE" || this.getBrowser() === "Edge") {
        //   window.navigator.msSaveBlob(blob, "mapImage.png");
        // } else {
        //   let x = new XMLHttpRequest();
        //   x.open("GET", canvas.toDataURL("image/png"), true);
        //   x.responseType = "blob";
        //   x.οnlοad = function(e) {
        //     let url = window.URL.createObjectURL(x.response);
        //     let a = document.createElement("a");
        //     a.href = url;
        //     a.download = "mapImage.png" || "image";
        //     a.click();
        //   };
        //   x.send();
        // }
      }
    },
    loadMapSize() {
      this.$refs.mapp.style.width = 90 + "vw";
      this.$refs.mapp.style.height = 75 + "vh";
    },
    // 判断浏览器类型
    getBrowser() {
      let userAgent = navigator.userAgent;
      //判断是否Opera浏览器
      if (userAgent.indexOf("OPR") > -1) {
        return "Opera";
      }
      //判断是否Firefox浏览器
      if (userAgent.indexOf("Firefox") > -1) {
        return "FF";
      }
      //判断是否IE浏览器
      if (userAgent.indexOf("Trident") > -1) {
        return "IE";
      }
      //判断是否Edge浏览器
      if (userAgent.indexOf("Edge") > -1) {
        return "Edge";
      }
      //判断是否chrome浏览器
      if (userAgent.indexOf("Chrome") > -1) {
        return "Chrome";
      }
      //判断是否Safari浏览器
      if (userAgent.indexOf("Safari") > -1) {
        return "Safari";
      }
      // 微信内置浏览器
      if (!!/MicroMessenger/i.test(userAgent)) {
        return "wx";
      }
    }

    // 将base64图片流文件转成blob文件
    // dataURLtoBlob(dataurl) {
    //   var arr = dataurl.split(","),
    //     mime = arr[0].match(/:(.*?);/)[1],
    //     bstr = atob(arr[1]),
    //     n = bstr.length,
    //     u8arr = new Uint8Array(n);
    //   while (n--) {
    //     u8arr[n] = bstr.charCodeAt(n);
    //   }
    //   return new Blob([u8arr], { type: mime });
    // }
  }
};
</script>

<style>
/* 隐藏百度地图版权信息 */
.anchorBL {
  display: none;
}
/* 隐藏百度地图logo */
.BMap_cpyCtrl {
  display: none;
}
</style>