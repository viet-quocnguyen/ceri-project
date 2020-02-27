import React, { useState } from "react";
import {
  Container,
  Button,
  Footer,
  FooterTab,
  Text,
  View,
  Content,
  Form,
  Textarea
} from "native-base";
import { StyleSheet } from "react-native";
import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps";
import PubNub from "pubnub";
import PubNubReact, { PubNubProvider, PubNubConsumer } from "pubnub-react";
import mapStyle from "./mapstyle";

const pubnub = new PubNub({
  publishKey: "pub-c-15fa2416-0866-469b-b6d5-07b6e088368d",
  subscribeKey: "sub-c-a77755e2-5918-11ea-b451-9a833ea0503a",
  uuid: PubNub.generateUUID()
});

const channels = ["myChatChannel"];

function HomeScreen() {
  const [messages, addMessage] = useState([]);
  const [message, setMessage] = useState("");

  const sendMessage = message => {
    console.log(`my message: ${message}`);
    pubnub.publish({ channels: channels[0], message }, () => setMessage(""));
  };

  return (
    <PubNubProvider client={pubnub}>
      <View>
        <PubNubConsumer>
          {client => {
            client.addListener({
              message: messageEvent => {
                console.log("messageEvent");
                addMessage([...messages, messageEvent.message]);
              }
            });

            client.subscribe({ channels });
          }}
        </PubNubConsumer>
      </View>

      <Text>Chat Room</Text>
      {messages.map((message, messageIndex) => {
        console.log(message);
        return <Text>{message}</Text>;
      })}

      <Content padder>
        <Form>
          <Textarea
            onChangeText={text => {
              setMessage(text);
            }}
            value={message}
            rowSpan={5}
            bordered
            placeholder="Textarea"
          />
          <Button
            onPress={e => {
              sendMessage(message);
            }}
          >
            <Text>Send Message</Text>
          </Button>
        </Form>
      </Content>
    </PubNubProvider>
  );
}
// class HomeScreen extends Component {
//   constructor(props) {
//     super(props);

//     this.pubnub = new PubNub({
//       publishKey: "pub-c-8cc6ac6a-994d-4cce-865c-7b26b8b2f4be",
//       subscribeKey: "sub-c-9978ee42-5783-11ea-94fd-ea35a5fcc55f"
//     });

//     this.state = {
//       currentLoc: {
//         latitude: -1,
//         longtitude: -1
//       },
//       numUsers: 0,
//       username: "Viet",
//       fixedOnUUID: "",
//       focusOnMe: false, //zoom map to user's current location if true
//       users: new Map(), //store data of each user in a Map
//       isFocused: false,
//       allowGPS: true //toggle the app's ability to gather GPS data of the user
//     };
//   }

//   onRegionChange(region) {
//     this.setState({ region });
//   }

//   render() {
//     var mapStyle = mapStyle;
//     return (
//       <View style={styles.container}>
//         <MapView
//           provider={PROVIDER_GOOGLE}
//           style={styles.map}
//           initialRegion={{
//             latitude: 37.78825,
//             longitude: -122.4324,
//             latitudeDelta: 0.0922,
//             longitudeDelta: 0.0421
//           }}
//           customMapStyle={mapStyle}
//         >
//           <Marker
//             draggable
//             coordinate={{
//               latitude: 37.78825,
//               longitude: -122.4324
//             }}
//             onDragEnd={e => alert(JSON.stringify(e.nativeEvent.coordinate))}
//             title={"Test Marker"}
//             description={"This is a description of the marker"}
//           />
//         </MapView>
//       </View>
//     );
//   }
// }

// const styles = StyleSheet.create({
//   container: {
//     position: "absolute",
//     top: 0,
//     left: 0,
//     right: 0,
//     bottom: 0,
//     alignItems: "center",
//     justifyContent: "flex-end"
//   },
//   map: {
//     position: "absolute",
//     top: 0,
//     left: 0,
//     right: 0,
//     bottom: 0
//   }
// });

export default HomeScreen;
