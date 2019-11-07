import Taro, { Component } from "@tarojs/taro";
import { View } from "@tarojs/components";

import "./index.scss";

class Index extends Component {
  constructor(props) {
    super(props);

    this.state = {
      hotData: [
        { end: "洛阳", start: "郑州" },
        { end: "新郑", start: "郑州" },
        { end: "开封", start: "郑州" },
        { end: "焦作", start: "郑州" },
        { end: "许昌", start: "郑州" },
        { end: "新乡", start: "郑州" },
        { end: "长葛", start: "郑州" },
        { end: "禹州", start: "郑州" },
        { end: "平顶山", start: "郑州" },
        { end: "安阳", start: "郑州" },
        { end: "鹤壁", start: "郑州" },
        { end: "濮阳", start: "郑州" },
        { end: "漯河", start: "郑州" },
        { end: "三门峡", start: "郑州" },
        { end: "南阳", start: "郑州" },
        { end: "商丘", start: "郑州" },
        { end: "信阳", start: "郑州" },
        { end: "周口", start: "郑州" },
        { end: "驻马店", start: "郑州" },
        { end: "巩义", start: "郑州" },
        { end: "荥阳", start: "郑州" },
        { end: "新密", start: "郑州" },
        { end: "登封", start: "郑州" },
        { end: "偃师", start: "郑州" },
        { end: "舞钢", start: "郑州" },
        { end: "济源", start: "郑州" },
        { end: "灵宝", start: "郑州" },
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
