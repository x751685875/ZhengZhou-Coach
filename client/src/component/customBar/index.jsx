import Taro, { Component } from "@tarojs/taro";
import { View, Image } from "@tarojs/components";

import "./index.scss";

class Index extends Component {
  constructor(props) {
    super(props);

    this.state = {
      StatusBar: 0,
      paddingBottom: 0,
      CustomBar: 0,
      shareMenu: false
    };
  }

  componentWillMount() {
    Taro.getSystemInfo({
      success: e => {
        let StatusBar = e.statusBarHeight,
          custom = Taro.getMenuButtonBoundingClientRect(),
          CustomBar = custom.bottom + custom.top - e.statusBarHeight,
          paddingBottom = custom.top - e.statusBarHeight;

        this.setState({
          StatusBar,
          CustomBar,
          paddingBottom
        });
      }
    });
  }

  componentDidShow() {
    let currentPages = getCurrentPages();

    if (currentPages.length == 1) {
      if (currentPages[currentPages.length - 1].route != "pages/index/index") {
        this.setState({
          shareMenu: true
        });
      }
    }
  }

  goBack() {
    wx.navigateBack();
  }

  goHome() {
    wx.reLaunch({
      url: "/pages/index/index"
    });
  }

  render() {
    let { StatusBar, CustomBar } = this.state;
    return (
      <View className="custom-bar" style={`height:${CustomBar + 8}px`}>
        <View
          className="bg-gradual"
          style={`height:${CustomBar + 8}px;padding:${StatusBar}px 10px 8px`}
        >
          {this.state.shareMenu ? (
            <View className="shareMenu" onClick={this.goHome.bind(this)}>
              <View className="at-icon at-icon-home"></View>
            </View>
          ) : this.props.goBack ? (
            <View className="go-back" onClick={this.goBack.bind(this)}>
              <View className="at-icon at-icon-chevron-left"></View>
            </View>
          ) : (
            <View className="avatar-box">
              <open-data type="userAvatarUrl" className="avatar" />
            </View>
          )}

          <Text className="title">
            {this.props.title ? this.props.title : "郑州长途客运"}
          </Text>

          <Image
            className="background"
            mode="scaleToFill"
            src="cloud://coach-cloud-j8zrd.636f-coach-cloud-j8zrd-1300588813/Images/wave.gif"
          ></Image>
        </View>
      </View>
    );
  }
}

export default Index;
