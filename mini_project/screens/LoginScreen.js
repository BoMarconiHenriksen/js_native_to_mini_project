import React from 'react';
import { Platform, View, Text, TextInput, Button, StyleSheet, ScrollView, ActivityIndicator, } from 'react-native';
import { Constants, Location, Permissions, MapView, Marker } from 'expo';

export default class LoginScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoggedIn: false, 
      getUserPosition: false,
      showLoadingIcon: false,
      // userName, password and distance stores the text input.
      userName: "", 
      password: "",
      message: "",
      distance: "",
      // Is used for get location.
      latitude: null, 
      longitude: null,
      location: [],
      // Is used to show the user on a map.
      //markers: [{ username: "", latitude: "", longitude: "" }], 
      //region: []
      // lets do something with delta distance need the formular
    };

  };

  // Remove header.
  static navigationOptions = {
      header: null,
    }; 

  componentWillMount() {
    if (Platform.OS === 'android' && !Constants.isDevice) {
      this.setState({
        errorMessage: 'Oops, this will not work on Sketch in an Android emulator. Try it on your device!',
      });
    } else {
      this._getLocationAsync();
      //console.log(this.state.markers)
    }
  }

  // Get user location
  _getLocationAsync = async () => {
    // Changing state will rerender the view.
    this.setState({
      showLoadingIcon: true,
    });

    let { status } = await Permissions.askAsync(Permissions.LOCATION);
    if (status !== 'granted') {
      this.setState({
        errorMessage: 'Permission to access location was denied',
      });
    };

    const location = await Location.getCurrentPositionAsync({});
    this.setState({
      showLoadingIcon: false,
      getUserPosition: true,
    });

    this.setState({ location: location });
    this.setState({ latitude: location.coords.latitude, longitude: location.coords.longitude });
  };

  showUserPosition() {
    if (this.state.errorMessage) {
      return userPosition = this.state.errorMessage;
    } else if (this.state.location && this.state.getUserPosition === true) {
      return userPosition = 'Your position: Latitude: ' + this.state.latitude + ' Longitude: ' + this.state.longitude
    };
  };

  render() {

    let velcomeText = 'Login and find your friends.';
    
    return (

      <ScrollView>
        <View style={{ flex: 1, alignItems: 'center', padding: 20, justifyContent: 'flex-start' }}>

          <Text style={{ padding: 20, fontSize: 35 }}>Login</Text>
          <Text style={{ fontSize: 18 }}>{velcomeText}</Text>

          <TextInput style={{ padding: 10, width: 200, fontSize: 24 }} placeholder='Enter user name' onChangeText={(username) => this.setState({ userName: username })} value={this.state.userName} />
          <TextInput style={{ padding: 10, width: 200, fontSize: 24 }} placeholder='Enter password' onChangeText={(password) => this.setState({ password: password })} value={this.state.password} />
          <TextInput style={{ padding: 10, width: 200, fontSize: 24 }} keyboardType={'numeric'} placeholder='Distance in km' onChangeText={(distance) => this.setState({ distance: Number(distance) })} value={this.state.distance} />
          
          {/* Show loading icon. */}
          {this.state.showLoadingIcon &&
            <ActivityIndicator size="large" color="#4c4cff" />
          }

          {/* Show lat and long for the user. */}
          <Text>{this.showUserPosition()}</Text>

          {/* isLoggingIn tracks whether logging in is in progress. */}
          {/* https://reactjs.org/docs/conditional-rendering.html?utm_source=syndicate&utm_campaign=scotchio-feb2017&utm_medium=post#inline-if-with-logical-ampamp-operator */}
          {this.state.isLoggingIn && <ActivityIndicator />}
          <View style={{margin:30}} >
            <Button 
              title="submit" 
              onPress={() => this._getmarkers()} 
            />
          </View>

          {/* Show error message. KAN VI BRUGE LENGTH??? */}
          { this.state.message.length > 0 && 
          <Text
            style={{fontSize: 18, color: 'red', padding: 5}}>
            {this.state.message}
          </Text> }
          
        </View>

        {/* Show the area where the user is. If latitude is null the map does not render */}
        { this.state.latitude != null &&
          < MapView style={styles.map}
          initialRegion={{
            latitude: this.state.latitude,
            longitude: this.state.longitude,
            latitudeDelta: 0.0922, 
            longitudeDelta: 0.0421
          }}
        >
        
        </ MapView>
        }
        
        
      </ScrollView>
    );
  };
};

const styles = StyleSheet.create({
  container: {
    flex: 4,
    backgroundColor: '#Fffffd',
  },

  contentContainer: {
    paddingTop: 30,
  },

  tabBarInfoContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    ...Platform.select({
      ios: {
        shadowColor: 'black',
        shadowOffset: { height: -3 },
        shadowOpacity: 0.1,
        shadowRadius: 3,
      },
      android: {
        elevation: 20,
      },
    }),
    alignItems: 'center',
    backgroundColor: '#fbfbfb',
    paddingVertical: 20,
  },
  tabBarInfoText: {
    fontSize: 26,
    color: 'rgba(96,100,109, 1)',
    textAlign: 'center',
  },
  navigationFilename: {
    marginTop: 5,
  },


  title: {
    fontSize: 26,
    color: "#66B032",
    textAlign: 'center',
  }, map: {
    height: 400,
    flex: 1

  }
});