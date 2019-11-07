import Taro, { Component } from "@tarojs/taro";
import { View, Text } from "@tarojs/components";
import { connect } from "@tarojs/redux";
import { actionCreators } from "../../reducer";

import CustomBar from "../../component/customBar";
import GoTop from "../../component/goTop";

import { AtActivityIndicator } from "taro-ui";

import "./index.scss";

@connect(
  ({ globalReducer }) => ({
    globalReducer
  }),
  dispatch => ({
    goTop(res) {
      dispatch(actionCreators.goTop(res));
    }
  })
)
class Index extends Component {
  config = {
    navigationBarTitleText: `${this.state.station}车站信息汇总`
  };

  constructor(props) {
    super(props);

    this.state = {
      data: [],
      msg: "",
      station: decodeURIComponent(this.$router.params.station)
    };
  }

  componentWillMount() {
    this.onStation();
  }

  componentDidMount() {
    // 显示当前页面的转发按钮
    wx.showShareMenu({
      withShareTicket: true
    });
  }

  // 监听页面滚动
  onPageScroll(e) {
    console.log(e.scrollTop);
    if (e.scrollTop > 200) {
      this.props.goTop(true);
    } else {
      this.props.goTop(false);
    }
  }

  onStation() {
    let _this = this;
    // 请求数据
    Taro.request({
      url: "https://api.jisuapi.com/bus/station",
      data: {
        appkey: "你的ApiKey",
        city: _this.state.station
      },
      success(res) {
        if (res.data.result.length) {
          _this.setState({
            data: res.data.result
          });
        } else {
          _this.setState({
            msg: `暂无${_this.state.station}车站信息`
          });
        }
      }
    });
  }

  goTel(tel) {
    wx.makePhoneCall({
      phoneNumber: tel
    });
  }

  render() {
    return (
      <View className="station">
        <CustomBar
          goBack
          title={`${this.state.station}车站信息汇总`}
        ></CustomBar>

        {this.state.msg ? (
          <View className="msg">
            <View className="at-icon at-icon-volume-off"></View>
            {this.state.msg}
          </View>
        ) : (
          <View>
            <View className="station-box">
              {this.state.data.map((res, index) => {
                return (
                  <View
                    className="station-item"
                    key={res.name + res.address + index}
                  >
                    <View className="right">
                      <Text className="name">{res.name}</Text>
                      <Text className="address">{res.address}</Text>
                      <Text className="tel">{res.tel}</Text>
                    </View>

                    {res.tel ? (
                      <View
                        className="go-tel"
                        onClick={this.goTel.bind(this, res.tel)}
                      >
                        电话咨询
                      </View>
                    ) : null}
                  </View>
                );
              })}
            </View>

            {this.state.data.length ? null : (
              <AtActivityIndicator
                mode="center"
                color="#39b54a"
                size={36}
              ></AtActivityIndicator>
            )}
          </View>
        )}

        <GoTop goTop={this.state.goTop}></GoTop>
      </View>
    );
  }
}

export default Index;
