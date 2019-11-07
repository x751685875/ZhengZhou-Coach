import Taro, { Component } from "@tarojs/taro";
import { View } from "@tarojs/components";

import "./index.scss";

class Index extends Component {
  constructor(props) {
    super(props);

    this.state = {
      start: "",
      end: "",
      historyData: []
    };
  }

  componentDidShow() {
    let _this = this;
    // 获取搜索历史
    wx.cloud
      .callFunction({
        // 要调用的云函数名称
        name: "history",
        data: {
          inquire: true
        }
      })
      .then(res => {
        _this.setState({
          historyData: res.result
        });
      })
      .catch(err => {
        // handle error
      });
  }

  render() {
    return (
      <View>
        {this.state.historyData.length ? (
          <View className="history">
            <View className="title">
              <View className="text">
                搜索历史
                <View className="before"></View>
              </View>
            </View>
            <View className="history-box">
              {this.state.historyData.map(res => {
                return (
                  <Navigator
                    url={`/pages/coach/index?start=${res.start}&end=${res.end}`}
                    open-type="navigate"
                    hover-class="navigator-hover"
                    className="item"
                    key={res.start + res.end}
                  >
                    <Text>{res.start}</Text>
                    <View className="at-icon at-icon-arrow-right"></View>
                    <Text>{res.end}</Text>
                  </Navigator>
                );
              })}
            </View>
          </View>
        ) : null}
      </View>
    );
  }
}

export default Index;
