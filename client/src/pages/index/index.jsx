import Taro, { Component } from "@tarojs/taro";
import { View } from "@tarojs/components";

import CustomBar from "../../component/customBar";
import GoTop from "../../component/goTop";
import Filter from "../../component/filter";
import History from "../../component/history";
import Hot from "../../component/hot";

import "./index.scss";

class Index extends Component {
  config = {
    navigationBarTitleText: "郑州长途客运"
  };

  constructor(props) {
    super(props);

    this.state = {};
  }

  componentDidMount() {
    // 显示当前页面的转发按钮
    wx.showShareMenu({
      withShareTicket: true
    });
  }

  render() {
    return (
      <View className="index">
        <CustomBar bgColor="bg-gradual-pink" isBack="{{true}}"></CustomBar>
        <View className="content">
          <Filter></Filter>
          <History></History>
          <Hot></Hot>
        </View>

        <GoTop></GoTop>
      </View>
    );
  }
}

export default Index;
