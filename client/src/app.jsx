import "@tarojs/async-await";
import Taro, { Component } from "@tarojs/taro";
import { Provider } from "@tarojs/redux";

import Index from "./pages/index";
// import QQMapWX from "./qqmap-wx-jssdk.min.js";

import configStore from "./store";

import "./app.scss";

const store = configStore();

class App extends Component {
  config = {
    pages: ["pages/index/index", "pages/coach/index", "pages/station/index"],
    window: {
      backgroundTextStyle: "light",
      navigationBarBackgroundColor: "#fff",
      navigationBarTitleText: "郑州长途客运",
      navigationBarTextStyle: "white",
      navigationStyle: "custom"
    },
    cloud: true
    // permission: {
    //   "scope.userLocation": {
    //     desc: "你的位置信息将用于自动显示当前位置"
    //   }
    // }
  };

  componentWillMount() {
    Taro.cloud.init();

    // let qqmapsdk = new QQMapWX({
    //   key: "JRVBZ-27MKU-D27VD-2WAGS-L3VRO-UNBPA" // 必填
    // });

    // wx.getLocation({
    //   type: "wgs84",
    //   success(res) {
    //     const latitude = res.latitude;
    //     const longitude = res.longitude;
    //     const speed = res.speed;
    //     const accuracy = res.accuracy;

    //     qqmapsdk.reverseGeocoder({
    //       location: {
    //         latitude: res.latitude,
    //         longitude: res.longitude
    //       },
    //       success: function(addressRes) {
    //         const result = addressRes.result;
    //         console.log(result);
    //       },
    //       fail: function(err) {
    //         console.log(err);
    //       }
    //     });
    //   }
    // });
  }

  componentDidShow() {
    wx.getSystemInfo({
      success: res => {
        let data = {
          // 语言
          language: res.language,
          // 设备型号
          model: res.model,
          // 操作系统及版本
          system: res.system,
          // 微信版本号
          version: res.version
        };

        // 调用云函数
        wx.cloud.callFunction({
          name: "login",
          data: data
        });
      },
      fail(err) {
        console.log(err);
      }
    });
  }

  componentDidHide() {}

  componentDidCatchError() {}

  // 在 App 类中的 render() 函数没有实际作用
  // 请勿修改此函数
  render() {
    return (
      <Provider store={store}>
        <Index />
      </Provider>
    );
  }
}

Taro.render(<App />, document.getElementById("app"));
