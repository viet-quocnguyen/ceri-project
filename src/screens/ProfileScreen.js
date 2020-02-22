import React, { Component } from "react";
import { Text, View, Button } from "react-native";

class ProfileScreen extends Component {
  render() {
    return (
      <View>
        <Text>{this.props.name}</Text>
        <Button
          title="Go to HomeScreen"
          onPress={() => this.props.navigation.goBack()}
        />
      </View>
    );
  }
}

export default ProfileScreen;
