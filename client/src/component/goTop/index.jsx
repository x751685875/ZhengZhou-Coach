import Taro, { Component } from "@tarojs/taro";
import { View } from "@tarojs/components";
import { connect } from "@tarojs/redux";

import "./index.scss";

@connect(
  ({ globalReducer }) => ({
    globalReducer
  }),
  dispatch => ({})
)
class Index extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  componentDidMount() {}

  onGoTop() {
    Taro.pageScrollTo({
      scrollTop: 0,
      duration: 300
    });
  }

  render() {
    return (
      <View>
        {this.props.globalReducer.goTop ? (
          <View className="goTop" onClick={this.onGoTop.bind(this)}>
            <View className="at-icon at-icon-chevron-up"></View>
          </View>
        ) : null}
      </View>
    );
  }
}

export default Index;
