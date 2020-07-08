import React, { Component } from "react";
import { Text, View, StyleSheet, Image, Dimensions, Linking, StatusBar } from "react-native";
import MapView, { Marker } from "react-native-maps";
import BottomSheet from "reanimated-bottom-sheet";
import { robotoWeights } from "react-native-typography";
import moment from "moment";
import { Card, Icon } from "native-base";
import { TouchableOpacity } from "react-native-gesture-handler";
import TextTicker from "react-native-text-ticker";

var mapStyle = require("../utils/mapstyle.json");
export default class Activity_Detail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      initialRender: true,
      ApiData: props.route.params.data,
      title: this.titleGenerator(props.route.params.data.properties.place),
      date: moment(props.route.params.data.properties.time).format("DD MMM YYYY hh:mm a"),
      magnitude: Number(props.route.params.data.properties.mag).toFixed(1),
      place: props.route.params.data.properties.place.split(",")[0],
      depth: Number(props.route.params.data.geometry.coordinates[2]).toFixed(2),
      lat: Number(props.route.params.data.geometry.coordinates[1]).toFixed(2),
      lon: Number(props.route.params.data.geometry.coordinates[0]).toFixed(2),
      details: props.route.params.data.properties.url,
    };
  }
  INITIAL_REGION = {
    latitude: this.props.route.params.data.geometry.coordinates[1],
    longitude: this.props.route.params.data.geometry.coordinates[0],
    latitudeDelta: 40.0922,
    longitudeDelta: 40.0421,
  };

  titleGenerator = (title) => {
    if (title.includes("of")) {
      title = title.split("of")[1];
      return title;
    }
    return title;
  };

  loadInBrowser = (url) => {
    Linking.openURL(url).catch((err) => console.error("Couldn't load page", err));
  };

  renderInner = () => (
    <View style={styles.panel}>
      <TextTicker style={[robotoWeights.light, styles.panelTitle]}>{this.state.title}</TextTicker>
      <Text style={[robotoWeights.light, styles.display2]}>{this.state.date}</Text>
      <Text style={[robotoWeights.bold, styles.display3]}>{this.state.magnitude}</Text>
      <Text style={[robotoWeights.thin, styles.display4]}>Ritcher Scale</Text>
      <View style={{ justifyContent: "center", alignItems: "center" }}>
        <TextTicker duration={3000} style={[robotoWeights.light, styles.display5]}>
          {this.state.place}
        </TextTicker>
      </View>
      <Card style={{ marginTop: 55, padding: 13, alignItems: "center" }}>
        <Text style={[robotoWeights.light, styles.display7]}>
          Location: {this.state.lat}, {this.state.lon}
        </Text>
      </Card>
      <Card style={{ marginTop: 5, padding: 13, alignItems: "center" }}>
        <Text style={[robotoWeights.light, styles.display7]}>Depth:{this.state.depth} km from Sea</Text>
      </Card>

      <TouchableOpacity activeOpacity={0.8} onPress={() => this.loadInBrowser(this.state.details)}>
        <View style={styles.panelButton}>
          <Text style={[robotoWeights.medium, styles.panelButtonTitle]}>View Details</Text>
        </View>
      </TouchableOpacity>
    </View>
  );

  renderHeader = () => (
    <View style={styles.header}>
      <View style={styles.panelHeader}>
        <View style={styles.panelHandle} />
      </View>
    </View>
  );

  render() {
    return (
      <View style={{ flex: 1 }}>
        <StatusBar translucent={true} backgroundColor={"transparent"} barStyle="dark-content" />
        <MapView customMapStyle={mapStyle} style={{ height: Dimensions.get("window").height }} initialRegion={this.INITIAL_REGION}>
          <Marker coordinate={{ latitude: this.state.ApiData.geometry.coordinates[1], longitude: this.state.ApiData.geometry.coordinates[0] }} tracksViewChanges={false}>
            <Text style={{ zIndex: 1, backgroundColor: "#273238", borderRadius: 10, padding: 9, color: "white" }}>{this.state.title}</Text>

            <Icon type="MaterialCommunityIcons" style={{ alignSelf: "center", marginTop: -15, color: "#273238", fontSize: 28 }} name="map-marker-radius" />
          </Marker>
        </MapView>
        <BottomSheet snapPoints={[550, 140, 140]} renderContent={this.renderInner} renderHeader={this.renderHeader} initialSnap={1} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  cardView: {
    overflow: "hidden",
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    flex: 1,
    marginLeft: 0,
    marginRight: 0,
    marginTop: -32,
    marginBottom: 0,
  },

  panelContainer: {
    position: "absolute",
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
  },
  panel: {
    height: 550,
    padding: 10,
    backgroundColor: "#fff",
  },
  header: {
    backgroundColor: "#fff",
    shadowColor: "#000000",
    paddingTop: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    marginBottom: -1,
  },
  panelHeader: {
    alignItems: "center",
  },
  panelHandle: {
    width: 40,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#00000040",
    marginBottom: 10,
  },
  panelTitle: {
    color: "#392D34",
    fontSize: 29,
  },
  panelSubtitle: {
    fontFamily: "roboto-medium",
    fontSize: 16,
    color: "#777",
    marginLeft: 8,
  },
  panelButton: {
    padding: 15,
    borderRadius: 10,
    backgroundColor: "#E13D66",
    alignItems: "center",
    marginVertical: 8,
  },
  panelButtonTitle: {
    fontSize: 18,
    color: "white",
  },
  display2: {
    marginTop: 2,
    fontStyle: "italic",
    fontSize: 15,
    color: "#E13D66",
  },
  display3: {
    fontStyle: "italic",
    marginTop: 42,
    fontSize: 90,
    alignSelf: "center",
    color: "#3F323A",
  },
  display4: {
    fontStyle: "italic",
    fontSize: 23,
    alignSelf: "center",
    color: "#3F323A",
  },
  display5: {
    marginTop: 2,
    textAlign: "center",
    fontStyle: "italic",
    fontSize: 28,
    alignSelf: "center",
    color: "#3F323A",
  },
  display7: {
    fontSize: 20,
    color: "#392D34",
  },
});
