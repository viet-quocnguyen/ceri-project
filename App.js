import React, { Component } from "react";
import { AppLoading } from "expo";
import { Provider } from "react-redux";
import { Ionicons } from "@expo/vector-icons";
import store from "./src/duck/store";

import * as Font from "expo-font";
import Navigator from "./src/routes/homeStack";

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isReady: false
    };
  }

  async componentDidMount() {
    await Font.loadAsync({
      Roboto: require("native-base/Fonts/Roboto.ttf"),
      Roboto_medium: require("native-base/Fonts/Roboto_medium.ttf"),
      ...Ionicons.font
    });
    this.setState({ isReady: true });
  }

  render() {
    if (!this.state.isReady) {
      return <AppLoading />;
    }

    return (
      <Provider store={store}>
        <Navigator />
      </Provider>
    );
  }
}
