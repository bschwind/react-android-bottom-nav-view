/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import BottomNav from "./BottomNav"
import BottomNavTab from "./BottomNavTab"
import {
  AppRegistry,
  StyleSheet,
  Text,
  View
} from 'react-native';

export default class bottomBar extends Component {
  render() {
    return (
      <View style = {{flex: 1, backgroundColor: "blue"}}>
        <BottomNav style = { {backgroundColor: "rgb(106, 179, 68)"} }>
          <BottomNavTab
            title={"List"}
            iconName={"gmd-list"}>
            <View style = {{height: 56, width: 56, margin: 100, backgroundColor: "blue"}}></View>
          </BottomNavTab>
          <BottomNavTab
            title={"Map"}
            iconName={"gmd-place"}>
            <View style = {{height: 56, width: 56, margin: 156, backgroundColor: "green"}}></View>
          </BottomNavTab>
          <BottomNavTab
            title={"Settings"}
            iconName={"gmd-settings"}>
            <View style = {{height: 56, width: 56, margin: 156, backgroundColor: "green"}}></View>
          </BottomNavTab>
        </BottomNav>
      </View>
    );
  }
}

const styles = StyleSheet.create({

});

AppRegistry.registerComponent('bottomBar', () => bottomBar);
