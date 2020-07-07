import React from "react";
import { Image, AsyncStorage, View, ActivityIndicator, StatusBar, StyleSheet } from "react-native";
import Onboarding from "react-native-onboarding-swiper";

export default class Tutorial_Screen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isFromHelp: props.route.params.isFromHelp,
      isSaving: false,
    };
  }

  done = async () => {
    if (this.state.isFromHelp) {
      this.props.navigation.goBack();
    } else {
      try {
        this.setState({ isSaving: true });
        await AsyncStorage.setItem("tutorial", "true");
        this.props.navigation.replace("Home");
      } catch (err) {
        console.error(err);
      }
    }
  };

  render() {
    return (
      <View style={{ backgroundColor: "white", flex: 1, justifyContent: "center" }}>
        <StatusBar translucent={true} backgroundColor={"transparent"} barStyle="dark-content" />
        {this.state.isSaving ? (
          <ActivityIndicator size="large" />
        ) : (
          <View style={{ marginTop: 24, flex: 1 }}>
            <Onboarding
              controlStatusBar={false}
              onDone={this.done}
              onSkip={this.done}
              pages={[
                {
                  backgroundColor: "white",
                  image: <Image source={require("../../assets/tutorial/tutorial_a.png")} resizeMode={"center"} />,
                  title: "",
                  subtitle: "",
                },
                {
                  backgroundColor: "white",
                  image: <Image source={require("../../assets/tutorial/tutorial_b.png")} resizeMode={"center"} />,
                  title: "",
                  subtitle: "",
                },
                {
                  backgroundColor: "white",
                  image: <Image source={require("../../assets/tutorial/tutorial_c.png")} resizeMode={"center"} />,
                  title: "",
                  subtitle: "",
                },
                {
                  backgroundColor: "white",
                  image: <Image source={require("../../assets/tutorial/tutorial_d.png")} resizeMode={"center"} />,
                  title: "",
                  subtitle: "",
                },
              ]}
            />
          </View>
        )}
      </View>
    );
  }
}

const style = StyleSheet.create({
  Onboarding_title: {
    color: "red",
  },
});
