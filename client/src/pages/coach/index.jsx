import Taro, { Component } from "@tarojs/taro";
import { View, Text, Navigator } from "@tarojs/components";
import { connect } from "@tarojs/redux";
import { actionCreators } from "../../reducer";

import CustomBar from "../../component/customBar";
import GoTop from "../../component/goTop";

import { AtTimeline, AtActivityIndicator, AtButton } from "taro-ui";

import utils from "../../utils.js";

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
    navigationBarTitleText: `${this.state.start} - ${this.state.end}`
  };

  constructor(props) {
    super(props);

    this.state = {
      data: [],
      msg: null,
      newData: null,
      start: decodeURIComponent(this.$router.params.start),
      end: decodeURIComponent(this.$router.params.end)
    };
  }

  componentWillMount() {
    let time = utils.formatTime(new Date());
    this.setState({
      newDate: time
    });

    this.requestData();
  }

  componentDidMount() {
    // 显示当前页面的转发按钮
    wx.showShareMenu({
      withShareTicket: true
    });
  }

  requestData(start, end) {
    let _this = this;
    // 请求数据
    Taro.request({
      url: "https://api.jisuapi.com/bus/city2c",
      data: {
        appkey: "你的ApiKey",
        start: start ? start : this.state.start,
        end: end ? end : this.state.end
      },
      success(res) {
        // 更新搜索历史
        wx.cloud.callFunction({
          // 要调用的云函数名称
          name: "history",
          data: {
            update: true,
            newData: {
              end: _this.state.end,
              start: _this.state.start
            }
          }
        });

        if (res.data.result.length) {
          _this.setState({
            data: res.data.result
          });
        } else {
          _this.setState({
            msg: "没有班次"
          });
        }
      }
    });
  }

  reverseData() {
    let start = this.state.end,
      end = this.state.start;
    this.setState({
      data: [],
      msg: null,
      start: start,
      end: end
    });

    this.requestData(start, end);
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

  onCoachItem() {
    wx.showToast({
      title: "暂不支持在线购票服务",
      icon: "none",
      duration: 2000
    });

    setTimeout(function() {
      wx.hideToast();
    }, 2000);
  }

  render() {
    return (
      <View className="coach">
        <CustomBar
          goBack
          title={`${this.state.start} - ${this.state.end}`}
        ></CustomBar>

        <View className="title-box">
          <View className="title">
            <View className="title-box-r">
              {this.state.start}
              <View className="at-icon at-icon-arrow-right"></View>
              {this.state.end}
            </View>
            <Text className="date">{this.state.newDate}</Text>
          </View>
          <AtButton
            type="primary"
            size="small"
            className="at-button"
            onClick={this.reverseData.bind(this)}
          >
            <View className="at-icon at-icon-repeat-play"></View>
            返程
          </AtButton>
        </View>

        <View className="station">
          <Navigator
            className="box"
            url={`/pages/station/index?station=${this.state.start}`}
            open-type="navigate"
            hover-class="navigator-hover"
          >
            {`${this.state.start}车站信息汇总`}
          </Navigator>
          <Navigator
            className="box"
            url={`/pages/station/index?station=${this.state.end}`}
            open-type="navigate"
            hover-class="navigator-hover"
          >
            {`${this.state.end}车站信息汇总`}
          </Navigator>
        </View>

        {this.state.msg ? (
          <View className="msg">
            <View className="at-icon at-icon-volume-off"></View>
            {this.state.msg}
          </View>
        ) : (
          <View>
            <View className="coach-box">
              {this.state.data.map((res, index) => {
                return (
                  <View
                    className="coach-item"
                    key={res.starttime ? res.starttime + index : index}
                    onClick={this.onCoachItem.bind(this)}
                  >
                    <View className="date">{res.starttime}</View>
                    <View className="content">
                      <AtTimeline
                        items={[
                          { title: res.startstation },
                          { title: res.endstation }
                        ]}
                      ></AtTimeline>

                      {res.distance ? (
                        <View className="time">
                          <View className="at-icon at-icon-clock"></View>
                          {res.distance}
                        </View>
                      ) : null}
                    </View>
                    <View className="right">
                      <View className="price">
                        <Text>￥</Text>
                        {res.price}
                      </View>
                      {res.ticket ? (
                        <View className="ticket">{res.ticket}</View>
                      ) : null}

                      {res.bustype ? (
                        <View className="bustype">{res.bustype}</View>
                      ) : null}
                    </View>
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
