import Taro, { Component } from "@tarojs/taro";
import { View, Picker, Image, Navigator } from "@tarojs/components";

import "./index.scss";

const db = wx.cloud.database();

class Index extends Component {
  constructor(props) {
    super(props);

    this.state = {
      countryList: [],
      startCountry: "郑州市",
      endCountry: "",
      exchange: false
    };
  }

  componentWillMount() {
    db.collection("city")
      .get()
      .then(res => {
        // res.data 是一个包含集合中有权限访问的所有记录的数据，不超过 20 条
        this.setState({
          countryList: res.data[0].city,
          endCountry: res.data[0].city[0]
        });
      });
  }

  // 选择城市
  onCountriesChange(e) {
    if (this.state.exchange) {
      this.setState({
        startCountry: this.state.countryList[e.detail.value]
      });
    } else {
      this.setState({
        endCountry: this.state.countryList[e.detail.value]
      });
    }
  }

  startToast() {
    wx.showToast({
      title: "此项不可更改",
      icon: "none",
      duration: 2000
    });

    setTimeout(function() {
      wx.hideToast();
    }, 2000);
  }

  exchange() {
    this.setState({
      startCountry: this.state.endCountry,
      endCountry: this.state.startCountry,
      exchange: !this.state.exchange
    });
  }

  render() {
    return (
      <View className="filter">
        <View
          className={`start-end ${this.state.exchange ? "on-exchange" : ""}`}
        >
          <View className="start" onClick={this.startToast.bind(this)}>
            <View className="text">起点 / 终点</View>
            <View className="location">
              {this.state.exchange
                ? this.state.endCountry
                : this.state.startCountry}
            </View>
          </View>

          <View className="exchange" onClick={this.exchange.bind(this)}>
            <Image
              mode="scaleToFill"
              src="cloud://coach-cloud-j8zrd.636f-coach-cloud-j8zrd-1300588813/Images/exchange.svg"
            ></Image>
          </View>

          <Picker
            className="end"
            mode="selector"
            range={this.state.countryList}
            onChange={this.onCountriesChange.bind(this)}
          >
            <View className="text">请选择</View>
            <View className="location">
              {this.state.exchange
                ? this.state.startCountry
                : this.state.endCountry}
            </View>
          </Picker>
        </View>

        <Navigator
          className="button"
          url={`/pages/coach/index?start=${this.state.startCountry}&end=${this.state.endCountry}`}
          open-type="navigate"
          hover-class="navigator-hover"
        >
          点击查询
        </Navigator>
      </View>
    );
  }
}

export default Index;
