import React from 'react';
import { Platform, StatusBar, StyleSheet, View } from 'react-native';
import { AppLoading, Asset, Font, Icon } from 'expo';
import Tabs from './navigation/TabNavigator';
import loginfacade from './facades/loginFacade'
export default class App extends React.Component {
 

  render() {

      return (
        <View style={styles.container}>
          
          <Tabs />
        </View>
      );
    }
  }

 

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F0F7D4',
  },
});
