import React from 'react';
import { StyleSheet, View } from 'react-native';
import Tabs from './navigation/TabNavigator';


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



/* */

