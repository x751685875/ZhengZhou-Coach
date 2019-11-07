import Taro, { Component } from "@tarojs/taro";
import { View } from "@tarojs/components";

import "./index.scss";

class Index extends Component {
  constructor(props) {
    super(props);

    this.state = {
      hotData: [
        { end: "洛阳市", start: "郑州市" },
        { end: "新郑市", start: "郑州市" },
        { end: "开封市", start: "郑州市" },
        { end: "焦作市", start: "郑州市" },
        { end: "许昌市", start: "郑州市" },
        { end: "新乡市", start: "郑州市" },
        { end: "长葛市", start: "郑州市" },
        { end: "禹州市", start: "郑州市" },
        { end: "平顶山市", start: "郑州市" },
        { end: "安阳市", start: "郑州市" },
        { end: "鹤壁市", start: "郑州市" },
        { end: "濮阳市", start: "郑州市" },
        { end: "漯河市", start: "郑州市" },
        { end: "三门峡市", start: "郑州市" },
        { end: "南阳市", start: "郑州市" },
        { end: "商丘市", start: "郑州市" },
        { end: "信阳市", start: "郑州市" },
        { end: "周口市", start: "郑州市" },
        { end: "驻马店市", start: "郑州市" },
        { end: "巩义市", start: "郑州市" },
        { end: "荥阳市", start: "郑州市" },
        { end: "新密市", start: "郑州市" },
        { end: "登封市", start: "郑州市" },
        { end: "偃师市", start: "郑州市" },
        { end: "舞钢市", start: "郑州市" },
        { end: "济源市", start: "郑州市" },
      ]
    };
  }

  componentDidShow() {}

  render() {
    return (
      <View className="hot">
        <View className="title">
          <View className="text">
            热门搜索
            <View className="before"></View>
          </View>
        </View>
        <View className="hot-box">
          {this.state.hotData.map(res => {
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
    );
  }
}

export default Index;
