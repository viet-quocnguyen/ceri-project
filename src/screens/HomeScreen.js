import React, { Component } from "react";
import {
  Container,
  Content,
  Header,
  Left,
  Right,
  Body,
  Title,
  Button,
  Icon,
  Footer,
  FooterTab,
  Text
} from "native-base";

class HomeScreen extends Component {
  constructor(props) {
    super(props);
  }

  pressHandler = () => {
    this.props.navigation.navigate("Profile");
  };

  render() {
    return (
      <Container>
        <Content>
          <Button success onPress={this.pressHandler}>
            <Text>Go to Profile</Text>
          </Button>
        </Content>

        <Footer>
          <FooterTab>
            <Button full>
              <Text>Footer</Text>
            </Button>
          </FooterTab>
        </Footer>
      </Container>
    );
  }
}

export default HomeScreen;
