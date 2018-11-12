import React from 'react';
import { Platform, View, Text, TextInput, Button, StyleSheet, ScrollView, ActivityIndicator, } from 'react-native';
import { Constants, Location, Permissions, MapView, Marker } from 'expo';
const URL = 'https://miniprojectfsjsbebop.herokuapp.com/api/';


export default class LoginScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoggedIn: false, getUserPosition: false, showLoadingIcon: false,
      // userName, password and distance stores the text input.
      userName: "", password: "", message: "", distance: 50,
      // Is used for get location.
      latitude: 55.70, longitude: 12.30, location: { latitude: 56, longitude: 12.3 },
      // Is used to show the user on a map.
      markers: [],
      region: { latitude: 55.5364469, longitude: 12.2190163, latitudeDelta: 0.0922, longitudeDelta: 0.0421 }
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
    }
  }
  // Get user location
  _getLocationAsync = async () => {
    // Changing state will rerender the view. (at least it ought to)
    let { status } = await Permissions.askAsync(Permissions.LOCATION);
    if (status !== 'granted') {
      this.setState({
        errorMessage: 'Permission to access location was denied',
      });
    };

    this.setState({
      showLoadingIcon: true,
    });
    const location = await Location.getCurrentPositionAsync({});

    this.setState({
      showLoadingIcon: false,
      getUserPosition: true,
      region: {
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421
      },
      location: location,
      latitude: location.coords.latitude,
      longitude: location.coords.longitude,
      markers: [{ username: 'Your position', latitude: location.coords.latitude, longitude: location.coords.longitude }], //shows your own posistion and when you login you get your friends pos

    })
  };

  showUserPosition() {
    if (this.state.errorMessage) {
      return userPosition = this.state.errorMessage;
    } else if (this.state.location && this.state.getUserPosition === true) {

      return userPosition = 'Your position: Latitude: ' + this.state.latitude + ' Longitude: ' + this.state.longitude
    };
  };

  // you login with a fetch that returns a jsonobject with your loggedin friends within the distance you've set. 
  login = async (username, password, latitude, longitude, distance) => {
    await fetch(URL + "login", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      }, body: JSON.stringify({
        userName: username,
        password: password,
        latitude: latitude,
        longitude: longitude,
        distance: distance
      }),
    }).then((response) => response.json())
      .then((responseJson) => {
        this.setState({ markers: responseJson.friends })
        this.setState({
          region: {
            latitude: this.state.latitude, longitude: this.state.longitude, latitudeDelta: 0.00922 * (distance + distance * 0.25) * 0.001 ,
            longitudeDelta: 0.00421 * (distance + distance * 0.25) * 0.001
          }
        })
        this.setState({ loggedIn: true });
        return responseJson.friends;
      })
      .catch((error) => {
        console.error(error);
      });
  }


  render() {

    let velcomeText = 'Login and find your friends.';

    return (

      <ScrollView>
        <View style={styles.viewtextinput}>


          <Text style={{ fontSize: 18 }}>{velcomeText}</Text>

          <TextInput style={styles.textinput} placeholder='Enter user name' onChangeText={(username) => this.setState({ userName: username })} value={this.state.userName} />
          <TextInput style={styles.textinput} placeholder='Enter password' onChangeText={(password) => this.setState({ password: password })} value={this.state.password} />
          <TextInput style={styles.textinput} keyboardType={'numeric'} placeholder='Distance in km' onChangeText={(distance) => this.setState({ distance: Number(distance * 1000) })} value={this.state.distance} />

          <Button title="submit" onPress={() => this.login(this.state.userName, this.state.password, this.state.latitude, this.state.longitude, this.state.distance)} />
        </View>

        {/* Show loading icon. */}
        {this.state.showLoadingIcon &&
          <ActivityIndicator size="small" color="#4c4cff" />
        }

        {/* Show lat and long for the user. */}
        <Text>{this.showUserPosition()}</Text>

        {/* isLoggingIn tracks whether logging in is in progress. */}

        {this.state.isLoggingIn && <ActivityIndicator />}

        {/* Show error message. KAN VI BRUGE LENGTH??? */}
        {this.state.message.length > 0 &&
          <Text
            style={{ fontSize: 18, color: 'red', padding: 5 }}>
            {this.state.message}
          </Text>}


        {/* Show the user on a map. */}
        {this.state.latitude != null &&
          < MapView key={this.state.region + Date()}
            style={styles.map}
            initialRegion={this.state.region}
          >
            {this.state.markers.map(marker => (
              <MapView.Marker key={marker.username}
                coordinate={{ latitude: marker.latitude, longitude: marker.longitude }}
                title={marker.username}
                pinColor={'blue'}
              />
            ))}

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

  title: {
    fontSize: 26,
    color: "#66B032",
    textAlign: 'center',
  },
  viewtextinput: {
    flex: 1, alignItems: 'center', padding: 20, justifyContent: 'flex-start'
  },
  textinput: {
    padding: 5, width: 200, fontSize: 18
  },
  map: {
    height: 400,
    flex: 1

  }
});