import React, { Component } from "react";
import { View, StatusBar, StyleSheet, Linking, Image, Text } from "react-native";
import { useHeaderHeight } from "@react-navigation/stack";
import { Card, CardItem, Body, Container, Header, Content, Thumbnail, Button, Icon, Left } from "native-base";
import { robotoWeights } from "react-native-typography";
import { ScrollView, TouchableOpacity } from "react-native-gesture-handler";

export default class Activity_Info extends React.Component {
  HeaderHeight = () => {
    const headerHeight = useHeaderHeight();
    return <View style={{ height: headerHeight }}></View>;
  };

  render() {
    return (
      <View style={{ backgroundColor: "white", flex: 1 }}>
        <StatusBar translucent={true} backgroundColor={"transparent"} barStyle="dark-content"/>
        <this.HeaderHeight />
        <ScrollView>
          <Content>
            <Card style={{ marginLeft: 8, marginRight: 8, borderRadius: 10, marginTop: 10 }}>
              <CardItem style={{ borderRadius: 10 }}>
                <Left>
                  <Thumbnail style={{ height: 40, width: 40, resizeMode: "center" }} source={require("../../assets/logo-inside.png")} />
                  <Body>
                    <Text style={[robotoWeights.light, styles.display1]}>Earthquake Monitor</Text>
                    <Text style={[robotoWeights.light, styles.display22]}>Version: 1.0</Text>
                  </Body>
                </Left>
              </CardItem>
              <CardItem style={{ borderRadius: 10, paddingTop: 5 }} activeOpacity={0.6} button onPress={() => Linking.openURL("https://github.com/bleedweedsuz/ApkPopper/blob/master/LICENSE").catch((err) => console.error("Couldn't load page", err))}>
                <Body>
                  <Text style={[robotoWeights.light, styles.display22]}>You can view this application source code on github</Text>
                  <Text style={[robotoWeights.light, styles.display3]}>https://github.com/bleedweedsuz/ApkPopper/blob/master/LICENSE</Text>
                </Body>
              </CardItem>
              <CardItem style={{ borderRadius: 10, paddingTop: 0 }} activeOpacity={0.6} button onPress={() => Linking.openURL("https://github.com/bleedweedsuz/ApkPopper/blob/master/LICENSE").catch((err) => console.error("Couldn't load page", err))}>
                <Body>
                  <Text style={[robotoWeights.light, styles.display22]}>License link:</Text>
                  <Text style={[robotoWeights.light, styles.display3]}>https://github.com/bleedweedsuz/ApkPopper/blob/master/LICENSE</Text>
                </Body>
              </CardItem>
            </Card>
          </Content>

          <Content>
            <Card style={{ marginLeft: 8, marginRight: 8, borderRadius: 10, marginTop: 10 }}>
              <CardItem style={{ borderRadius: 10, paddingBottom: 10 }} activeOpacity={0.6} button onPress={()=> { this.props.navigation.navigate("Tutorial", {isFromHelp:true}) }}>
                <Body>
                  <Text style={[robotoWeights.light, styles.display1]}>Tutorial</Text>
                  <Text style={[robotoWeights.light, styles.display4]}>to understand workflow of this app. </Text>
                </Body>
              </CardItem>
            </Card>
          </Content>

          <Content>
            <Card style={{ marginLeft: 8, marginRight: 8, borderRadius: 10, marginTop: 10 }}>
              <CardItem style={{ borderRadius: 10, paddingBottom: 0 }}>
                <Body>
                  <Text style={[robotoWeights.light, styles.display1]}>Used Libraries and its License</Text>
                </Body>
              </CardItem>
              
              <CardItem style={{ borderRadius: 10, paddingTop: 5 }} activeOpacity={0.6} button onPress={() => Linking.openURL("https://github.com/manosim/react-native-base/blob/master/LICENSE").catch((err) => console.error("Couldn't load page", err))}>
                <Body>
                  <Text style={[robotoWeights.light, styles.display22]}>NativeBase</Text>
                  <Text style={[robotoWeights.light, styles.display3]}>URL: https://github.com/GeekyAnts/NativeBase</Text>
                  <Text style={[robotoWeights.light, styles.display3]}>License Link: https://github.com/manosim/react-native-base/blob/master/LICENSE</Text>
                </Body>
              </CardItem>

              <CardItem style={{ borderRadius: 10, paddingTop: 5 }} activeOpacity={0.6} button onPress={() => Linking.openURL("https://reactnavigation.org/").catch((err) => console.error("Couldn't load page", err))}>
                <Body>
                  <Text style={[robotoWeights.light, styles.display22]}>React Navigation 5</Text>
                  <Text style={[robotoWeights.light, styles.display3]}>URL: https://reactnavigation.org/</Text>
                  <Text style={[robotoWeights.light, styles.display3]}>GitHub: https://github.com/react-navigation/react-navigation</Text>
                </Body>
              </CardItem>

              <CardItem style={{ borderRadius: 10, paddingTop: 5 }} activeOpacity={0.6} button onPress={() => Linking.openURL("https://github.com/moment/momentjs.com/blob/master/LICENSE").catch((err) => console.error("Couldn't load page", err))}>
                <Body>
                  <Text style={[robotoWeights.light, styles.display22]}>Moment</Text>
                  <Text style={[robotoWeights.light, styles.display3]}>URL: https://github.com/moment/moment</Text>
                  <Text style={[robotoWeights.light, styles.display3]}>License Link: https://github.com/moment/momentjs.com/blob/master/LICENSE</Text>
                </Body>
              </CardItem>

              <CardItem style={{ borderRadius: 10, paddingTop: 5 }} activeOpacity={0.6} button onPress={() => Linking.openURL("https://github.com/react-native-community/react-native-maps/blob/master/LICENSE").catch((err) => console.error("Couldn't load page", err))}>
                <Body>
                  <Text style={[robotoWeights.light, styles.display22]}>react-native-maps</Text>
                  <Text style={[robotoWeights.light, styles.display3]}>URL: https://github.com/react-native-community/react-native-maps</Text>
                  <Text style={[robotoWeights.light, styles.display3]}>License Link: https://github.com/react-native-community/react-native-maps/blob/master/LICENSE</Text>
                </Body>
              </CardItem>

              <CardItem style={{ borderRadius: 10, paddingTop: 5 }} activeOpacity={0.6} button onPress={() => Linking.openURL("https://github.com/hectahertz/react-native-typography/blob/master/LICENSE").catch((err) => console.error("Couldn't load page", err))}>
                <Body>
                  <Text style={[robotoWeights.light, styles.display22]}>React Native Typography</Text>
                  <Text style={[robotoWeights.light, styles.display3]}>URL: https://github.com/hectahertz/react-native-typography</Text>
                  <Text style={[robotoWeights.light, styles.display3]}>License Link: https://github.com/hectahertz/react-native-typography/blob/master/LICENSE</Text>
                </Body>
              </CardItem>

              <CardItem style={{ borderRadius: 10, paddingTop: 5 }} activeOpacity={0.6} button onPress={() => Linking.openURL("https://github.com/osdnk/react-native-reanimated-bottom-sheet/blob/master/LICENSE.md").catch((err) => console.error("Couldn't load page", err))}>
                <Body>
                  <Text style={[robotoWeights.light, styles.display22]}>Reanimated Bottom Sheet</Text>
                  <Text style={[robotoWeights.light, styles.display3]}>URL: https://github.com/osdnk/react-native-reanimated-bottom-sheet</Text>
                  <Text style={[robotoWeights.light, styles.display3]}>License Link: https://github.com/osdnk/react-native-reanimated-bottom-sheet/blob/master/LICENSE.md</Text>
                </Body>
              </CardItem>

              <CardItem style={{ borderRadius: 10, paddingTop: 5 }} activeOpacity={0.6} button onPress={() => Linking.openURL("https://github.com/iyegoroff/react-native-collapsible-header-views/blob/master/LICENSE").catch((err) => console.error("Couldn't load page", err))}>
                <Body>
                  <Text style={[robotoWeights.light, styles.display22]}>react-native-collapsible-header-views</Text>
                  <Text style={[robotoWeights.light, styles.display3]}>URL: https://github.com/iyegoroff/react-native-collapsible-header-views</Text>
                  <Text style={[robotoWeights.light, styles.display3]}>License Link: https://github.com/iyegoroff/react-native-collapsible-header-views/blob/master/LICENSE</Text>
                </Body>
              </CardItem>

              <CardItem style={{ borderRadius: 10, paddingTop: 5 }} activeOpacity={0.6} button onPress={() => Linking.openURL("https://github.com/danceyoung/react-native-selectmultiple-button/blob/master/LICENSE").catch((err) => console.error("Couldn't load page", err))}>
                <Body>
                  <Text style={[robotoWeights.light, styles.display22]}>React Native SelectMultiple Button</Text>
                  <Text style={[robotoWeights.light, styles.display3]}>URL: https://github.com/danceyoung/react-native-selectmultiple-button</Text>
                  <Text style={[robotoWeights.light, styles.display3]}>License Link: https://github.com/danceyoung/react-native-selectmultiple-button/blob/master/LICENSE</Text>
                </Body>
              </CardItem>

              <CardItem style={{ borderRadius: 10, paddingTop: 5 }} activeOpacity={0.6} button onPress={() => Linking.openURL("https://github.com/jfilter/react-native-onboarding-swiper/blob/master/LICENSE").catch((err) => console.error("Couldn't load page", err))}>
                <Body>
                  <Text style={[robotoWeights.light, styles.display22]}>React Native Onboarding Swiper</Text>
                  <Text style={[robotoWeights.light, styles.display3]}>URL: https://github.com/jfilter/react-native-onboarding-swiper</Text>
                  <Text style={[robotoWeights.light, styles.display3]}>License Link: https://github.com/jfilter/react-native-onboarding-swiper/blob/master/LICENSE</Text>
                </Body>
              </CardItem>
            </Card>
          </Content>

          <Content>
            <Card style={{ marginLeft: 8, marginRight: 8, borderRadius: 10, marginTop: 10 }}>
              <CardItem style={{ borderRadius: 10 }} activeOpacity={0.6} button onPress={() => Linking.openURL("https://earthquake.usgs.gov/").catch((err) => console.error("Couldn't load page", err))}>
                <Body>
                  <Text style={[robotoWeights.light, styles.display1]}>Used Earthquake API</Text>
                  <Text style={[robotoWeights.light, styles.display22]}>Earthquake USGS</Text>
                  <Text style={[robotoWeights.light, styles.display3]}>URL: https://earthquake.usgs.gov/</Text>
                </Body>
              </CardItem>
            </Card>
          </Content>
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  display1: {
    color: "#1B2F33",
    fontSize: 19,
  },
  display2: {
    fontWeight: "bold",
    fontSize: 15,
    marginTop: 4,
    marginBottom: 3,
  },
  display22: {
    fontSize: 16,
    marginTop: 2,
    marginBottom: 3,
  },
  display3: {
    marginTop: 1.5,
    textDecorationLine: "underline",
    marginBottom: 2,
    fontSize: 12,
    color: "#E13D66",
  },
  display4: {
    marginTop: 1.5,
    marginBottom: 2,
    fontSize: 12,
    color: "#E13D66",
  },
});
