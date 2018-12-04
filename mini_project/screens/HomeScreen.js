import React from 'react';
import { Image, ScrollView, StyleSheet, Text, View } from 'react-native';
import { MapView } from 'expo';

export default class HomeScreen extends React.Component {
  static navigationOptions = {
    header: null,
  };

  render() {
    return (
      <View style={styles.container}>

        <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
          
          <View style={styles.welcomeContainer}>
            <Text style={styles.title}>FriendFinderBB</Text>
            {/* this is a nice logo like image and then it show a map of where i lived it just looks pretty a view 500 meter in width*/}
            <Image
              source={
                require('../assets/icon.png')
              }
              style={styles.welcomeImage}
            />
          </View>

         <MapView
            style={styles.map}
            initialRegion={{
              latitude: 55.5364062,
              longitude: 12.2190946,
              latitudeDelta: 0.000920,
              longitudeDelta: 0.000422,
            }}
          />

        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#Fffffd',
  },

  contentContainer: {
    paddingTop: 30,
  },
  welcomeContainer: {
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 20,
  },
  welcomeImage: {
    width: 100,
    height: 200,
    resizeMode: 'contain',
    marginTop: 10,
    marginLeft: -10,
  },
  
  title: {
    fontSize: 26,
    color: "#66B032",
    textAlign: 'center',
  }, 
  map: {
    height: 150,
    flex: 1

  }
});

