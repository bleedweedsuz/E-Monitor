import React from "react";
import { Text, View, StyleSheet, TouchableOpacity, Image, Dimensions, StatusBar, RefreshControl, AsyncStorage} from "react-native";
import { loadEarthquakeData } from "../utils/Utility";
import { EARTHQUAKE_API_QUERY } from "../utils/Constants";
import { CollapsibleHeaderFlatList } from "react-native-collapsible-header-views";
import { Card, CardItem, Body } from "native-base";
import { material, robotoWeights } from "react-native-typography";
import moment from "moment";
import BottomSheet from "reanimated-bottom-sheet";
import { SelectMultipleGroupButton } from "react-native-selectmultiple-button";
import _ from "lodash";
import { TouchableHighlight } from "react-native-gesture-handler";
import ContentLoader from "react-native-easy-content-loader";
import { DUMMY_DATA } from "../utils/Constants";
import Animated from "react-native-reanimated";

const BOTTOMSHEET_BUTTON_COLOR = "#e13d66";
const mockData = DUMMY_DATA;
const BOTTOMSHEET_OFFSET = 25;

export default class Activity_Home extends React.Component {
  _isMounted = false;
  state = {
    isCheckingForTutorial:false,
    loading: true,
    error: false,
    ApiData: [],
    selectedScale: "all_",
    selectedTime: "hour",
    flatListRefresh: false,
    bottomSheetContainerHeight: 0,
    bottomSheetContainerOpacity: 0,
    bottomSheetVisible: false,
    fadingAmt: new Animated.Value(1),
    zindex_animatedView: -10, //Default Back
  };

  componentDidMount() {
    //this.clear();
    //this.checkTutorialPlayBack();
    this._isMounted = true;
    const funTry = (responseData) => {
      if (this._isMounted) {
        this.setState({ loading: false, ApiData: responseData.features });
      }
    };

    const funCatch = () => {
      if (this._isMounted) {
        this.setState({ loading: false, error: true });
      }
    };
    loadEarthquakeData(EARTHQUAKE_API_QUERY + "all_day.geojson", funTry, funCatch);
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  //check for tutorial info
  checkTutorialPlayBack = async() => {
    this.setState({isCheckingForTutorial:true});
    const tutorial = await AsyncStorage.getItem('tutorial');
    if (tutorial == null) { 
      this.props.navigation.replace("Tutorial", {isFromHelp:false}); 
    }
    else{ 
      this.setState({isCheckingForTutorial:false}); 
    }
  }

  //clear = async() => { await AsyncStorage.clear(); } //for test only

  onItemClick = (item) => {
    this.props.navigation.navigate("Detail", { data: item, mainData: this.state.ApiData });
  };

  cardItem = (item) => {
    return (
      <ContentLoader pRows={2} tHeight={26} titleStyles={{ marginBottom: 5 }} paragraphStyles={{ marginTop: 5 }} pHeight={[17, 14]} tWidth={80} pWidth={Dimensions.get("window").width - 60} containerStyles={{ paddingLeft: 20, paddingRight: 20, paddingTop: 18, backgroundColor: "#f8f8f8", elevation: 3.5, marginLeft: 8.5, height: 117, width: Dimensions.get("window").width - 17, borderRadius: 10, marginTop: 10, marginBottom: 5 }} active loading={this.state.loading}>
        <TouchableOpacity activeOpacity={0.7} onPress={() => this.onItemClick(item)}>
          <Card style={{ marginLeft: 8, marginRight: 8, borderRadius: 10, marginTop: 10, backgroundColor: "#f8f8f8" }}>
            <CardItem style={{ borderRadius: 10, backgroundColor: "#f8f8f8" }}>
              <Body>
                <View>
                  <Text style={[material.display1, styles.display1]}>{"M " + Number(item.properties.mag).toFixed(1)}</Text>
                  <Text style={[robotoWeights.light, styles.display2]}>{item.properties.place}</Text>
                  <View style={{ flexDirection: "row", width: "100%" }}>
                    <View style={{ flex: 1 }}></View>
                    <View>
                      <Text style={[robotoWeights.regular, styles.display3]}>{moment(item.properties.time).fromNow()}</Text>
                    </View>
                  </View>
                </View>
              </Body>
            </CardItem>
          </Card>
        </TouchableOpacity>
      </ContentLoader>
    );
  };

  bs = React.createRef();
  onFilterClick = () => {
    this.setState({ bottomSheetContainerOpacity: 1, zindex_animatedView:10 });
    this.bs.current.snapTo(3);
  };

  loadingEarthquakeData = () => {
    this.setState({ loading: true });
    const funTry = (responseData) => {
      this.setState({ loading: false, ApiData: responseData.features });
      this.setState({ flatListRefresh: false });
    };

    const funCatch = () => {
      this.setState({ loading: false, error: true });
    };
    loadEarthquakeData(EARTHQUAKE_API_QUERY + this.state.selectedScale + this.state.selectedTime + ".geojson", funTry, funCatch);
  };

  filterData = () => {
    this.bs.current.snapTo(2);
    this.loadingEarthquakeData();
  };

  renderHeader = () => (
    <View style={[styles.header, { opacity: this.state.bottomSheetContainerOpacity }]}>
      <View style={styles.panelHeader}>
        <View style={styles.panelHandle} />
      </View>
    </View>
  );

  renderInner = () => (
    <View
      style={[styles.panel, { opacity: this.state.bottomSheetContainerOpacity }]}
      onLayout={(event) => {
        this.setState({ bottomSheetContainerHeight: event.nativeEvent.layout.height + BOTTOMSHEET_OFFSET });
        this.bs.current.snapTo(0);
      }}
    >
      <Text style={[robotoWeights.light, styles.TextHeader1]}>Filter by Time</Text>
      <View style={{ flexWrap: "wrap", flexDirection: "row", justifyContent: "center" }}>
        <SelectMultipleGroupButton
          multiple={false}
          group={[
            { value: "hour", displayValue: "Past Hour" },
            { value: "day", displayValue: "Past Day" },
            { value: "week", displayValue: "Past 7 Days" },
            { value: "month", displayValue: "Past 30 Days" },
          ]}
          singleTap={(valueTap) => this._onFilterByTime(valueTap)}
          defaultSelectedIndexes={[0]}
          buttonViewStyle={{ margin: 5, borderRadius: 4 }}
          highLightStyle={{
            borderColor: "#00000080",
            textColor: "#00000080",
            backgroundColor: "#ffffff00",
            borderTintColor: BOTTOMSHEET_BUTTON_COLOR,
            backgroundTintColor: BOTTOMSHEET_BUTTON_COLOR,
            textTintColor: "white",
          }}
        />
      </View>
      <Text style={[robotoWeights.light, styles.TextHeader2]}>Filter by Ritcher Scale</Text>
      <View style={{ flexWrap: "wrap", flexDirection: "row", justifyContent: "center" }}>
        <SelectMultipleGroupButton
          multiple={false}
          group={[
            { value: "all_", displayValue: "All Earthquakes" },
            { value: "1.0_", displayValue: "M1.0+ Earthquakes" },
            { value: "2.5_", displayValue: "M2.5+ Earthquakes" },
            { value: "4.5_", displayValue: "M4.5+ Earthquakes" },
          ]}
          singleTap={(valueTap) => this._onFilterByScale(valueTap)}
          defaultSelectedIndexes={[0]}
          buttonViewStyle={{ margin: 5, borderRadius: 4 }}
          highLightStyle={{
            borderColor: "#00000080",
            textColor: "#00000080",
            backgroundColor: "#ffffff00",
            borderTintColor: BOTTOMSHEET_BUTTON_COLOR,
            backgroundTintColor: BOTTOMSHEET_BUTTON_COLOR,
            textTintColor: "white",
          }}
        />
      </View>
      <TouchableHighlight underlayColor="none" onPress={this.filterData}>
        <View style={styles.panelButton}>
          <Text style={[robotoWeights.medium, styles.panelButtonTitle]}>Filter Earthquake Data</Text>
        </View>
      </TouchableHighlight>
    </View>
  );

  _onFilterByTime(valueTap) {
    this.setState({
      selectedTime: valueTap,
    });
  }

  _onFilterByScale(valueTap) {
    this.setState({
      selectedScale: valueTap,
    });
  }

  onInfoClick = () => {
    this.props.navigation.navigate("Info");
  };

  onRefreshFlatList = () => {
    this.setState({ flatListRefresh: true });
    this.loadingEarthquakeData();
  };

  //Bottomsheet
  bottomSheet_onAnimationOpenEnd = () => {
    this.setState({ bottomSheetVisible: true });
  };

  bottomSheet_onAnimationCloseEnd = () => {
    this.setState({ bottomSheetVisible: false });
  };

  //prettier-ignore
  render(){
    return (
      <View style={{ flex: 1, backgroundColor: "#f8f8f8"}}>
        {
          this.state.isCheckingForTutorial?
            null
          :
            <View style={{flex: 1,}}>
              <StatusBar translucent={true} backgroundColor={"white"} barStyle="dark-content"/>
              <Animated.View style={{ alignItems: 'center', width:"100%", height:"100%", position: "absolute", opacity: Animated.sub(0.3, Animated.multiply(this.state.fadingAmt, 10)), zIndex:this.state.zindex_animatedView, backgroundColor:"black"}}></Animated.View>
                <CollapsibleHeaderFlatList
                  disableVirtualization={true}
                  CollapsibleHeaderComponent={
                    <View style={{ height: 100, backgroundColor: "#f8f8f8", paddingTop: 40 }}>
                      <View style={{ flexDirection: "row" }}>
                        <Image style={{ width: 37, height: 37, marginLeft: 15, resizeMode: "center" }} source={require("../../assets/logo-inside.png")} />
                        <View style={{ flex: 1, paddingRight: 18 }}>
                          <TouchableOpacity style={{marginRight:-5, flex: 1, alignSelf: "flex-end", justifyContent: "center", alignContent: "center" }} onPress={() => this.onFilterClick()}>
                            <Image style={{ width: 34, height: 34, alignSelf: "flex-end", resizeMode:"center" }} source={require("../../assets/filter.png")} />
                          </TouchableOpacity>
                        </View>

                        <TouchableOpacity style={{ marginRight: 20, alignSelf: "center", justifyContent: "center", alignContent: "center" }} onPress={() => this.onInfoClick()}>
                          <Image style={{ width: 34, height: 34, resizeMode:"center"  }} source={require("../../assets/question.png")} />
                        </TouchableOpacity>
                      </View>
                    </View>
                  }
                  refreshControl={<RefreshControl progressViewOffset={90} refreshing={this.state.flatListRefresh} onRefresh={() => this.onRefreshFlatList()} />}
                  headerHeight={100}
                  data={this.state.ApiData.length === 0 ? mockData : this.state.ApiData}
                  renderItem={({ item }) => this.cardItem(item)}
                  extraData={this.state}
                />
              <BottomSheet ref={this.bs} onCloseEnd={()=>{ this.setState({zindex_animatedView:-10}) }} enabledInnerScrolling={true} callbackNode={this.state.fadingAmt} enabledContentTapInteraction={false} snapPoints={[0, 0, 0,this.state.bottomSheetContainerHeight]} renderContent={this.renderInner} renderHeader={this.renderHeader}  />
            </View>
            
        }
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    height: Dimensions.get("window").height,
    backgroundColor: "white",
  },
  display1: {
    color: "#1B2F33",
  },
  display2: {
    fontSize: 17,
    marginTop: 2,
    marginBottom: 15,
  },
  display3: { fontSize: 13, color: "#E13D66", fontStyle: "italic" },
  header: {
    borderWidth: 2,
    borderColor: "#ddd",
    borderRadius: 20,
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
    borderBottomColor: "#fff",
    backgroundColor: "#fff",
    shadowColor: "#000000",
    paddingTop: 17,
    paddingBottom: 5,
    //borderTopLeftRadius: 20,
    //borderTopRightRadius: 20,
    marginBottom: -2,
    marginLeft: -1,
    marginRight: -1,
  },
  panelHeader: {
    alignItems: "center",
  },
  panelHandle: {
    width: 40,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#00000040",
    marginBottom: 0,
  },
  panel: {
    padding: 10,
    backgroundColor: "#fff",
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
  TextHeader1: {
    marginBottom: 5,
    marginLeft: 1,
    fontSize: 20,
    color: "black",
  },
  TextHeader2: {
    marginBottom: 5,
    marginTop: 10,
    marginLeft: 1,
    fontSize: 20,
    color: "black",
  },
});
