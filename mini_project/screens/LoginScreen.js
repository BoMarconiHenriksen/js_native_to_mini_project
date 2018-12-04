import React from 'react';
import { Platform, View, Text, TextInput, Button, StyleSheet, ScrollView, ActivityIndicator, } from 'react-native';
import { Constants, Location, Permissions, MapView, Marker} from 'expo';

const URL = 'https://miniprojectfsjsbebop.herokuapp.com/api/';

export default class LoginScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      //isLoggedIn is an indikator for which message the user can see
      isLoggedIn: false, getUserPosition: false, showLoadingIcon: false,
      // userName, password and distance stores the text input.
      userName: "", password: "", message: "", distance: 50,
      // Is used for get location.
      latitude: 55.70, longitude: 12.30, location: { latitude: 56, longitude: 12.3 },
      // Is used to show the user on a map.
      markers: [{ username: 'Your position', latitude: 55.5364469, longitude:12.2190163 }],
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
    // Changing state will rerender the view.
    let { status } = await Permissions.askAsync(Permissions.LOCATION);
    if (status !== 'granted') {
      this.setState({
        errorMessage: 'Permission to access location was denied',
      });
    };

    this.setState({
      showLoadingIcon: true,
    });
    //this is one of expos location methods
    const location = await Location.getCurrentPositionAsync({});

    this.setState({
      showLoadingIcon: false,
      getUserPosition: true,
      region: {
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
        latitudeDelta: 0.0922, //this s around 10 km 1 degree is 111 km, 0.922 is 100 
        longitudeDelta: 0.0421 // the screens width is shorter than its length- 
      },
      location: location,
      latitude: location.coords.latitude,
      longitude: location.coords.longitude,
      markers: [{ username: 'Your position', latitude: location.coords.latitude, longitude: location.coords.longitude }], //shows your own posistion and when you login you get your friends pos

    })
  };
  // simply gives us the coordinates of the phones current position in a written message
  showUserPosition() {
    if (this.state.errorMessage) {
      return userPosition = this.state.errorMessage;
    } else if (this.state.location && this.state.getUserPosition === true) {
      return userPosition = 'Your position: Latitude: ' + this.state.latitude + ' Longitude: ' + this.state.longitude
    };
  };

  // you login with a fetch that returns a jsonobject with your loggedin friends within the distance you've set. if you haven't got the password or the username right 
  //you get an errormessage and can try to login again without the app crashing. 
  //In this method you also set the state of the mapregion you want to see and calculate latitude and longitude deltas based on the distanceparameter
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
        console.log(responseJson)
        if (responseJson.status) {
          
          this.setState({ message: responseJson.message ,   markers: [{ username: 'Your position', latitude: this.state.latitude, longitude: this.state.longitude }]})
        } else {
          // a lot of different set states. Message is cleared if you had failed in login the first time you tried. Markers are set as the friends returned from fetch
          //Regions deltavalues is calculated and set based on distance and loggedIn is set to true so the user can be welcomed properly
          this.setState({ message: " ", markers: responseJson.friends })
          this.setState({
            region: {
              latitude: this.state.latitude, longitude: this.state.longitude, latitudeDelta: 0.00922 * (distance * 1.25) * 0.001,
              longitudeDelta: 0.00421 * (distance * 1.25) * 0.001
            }
          })
          this.setState({ isLoggedIn: true });
          return responseJson.friends;
        }
      })
      .catch((error) => {
        console.log(error)
        this.setState({ message: "error" ,   markers: [{ username: 'Your position', latitude: this.state.latitude, longitude: this.state.longitude }]})
    
      });
  }


  render() {
    
    let velcomeText = "";
    if (this.state.isLoggedIn === false) {
      velcomeText = 'Login and find your friends.'
    } else {
      velcomeText = 'Welcome ' + this.state.userName
    }
    return (

      <ScrollView>
        <View style={styles.viewtextinput}>

          <Text style={{ fontSize: 18 }}>{velcomeText}</Text>

          <TextInput style={styles.textinput} placeholder='Enter user name' onChangeText={(username) => this.setState({ userName: username })} value={this.state.userName} />
          <TextInput style={styles.textinput} placeholder='Enter password' onChangeText={(password) => this.setState({ password: password })} value={this.state.password} />
          <TextInput type='number' style={styles.textinput} keyboardType={'numeric'} placeholder='10' onChangeText={(distance) => this.setState({ distance: Number(distance * 1000) })} value={this.state.distance} />

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
      
          <Text
            style={styles.error}>
            {this.state.message}
          </Text>

        {/* Show the map and the user and his friends on a map. */}
        {this.state.latitude != null &&
          < MapView key={this.state.region + Date()}
            style={styles.map}
            initialRegion={this.state.region}
          >
          {/* friends markers rturned from a succesful login */}
            {this.state.markers.map(marker => (
              <MapView.Marker key={marker.username}
                coordinate={{ latitude: marker.latitude, longitude: marker.longitude }}
                title={marker.username}
                pinColor={'green'}
              />
            ))}
            {/*the users marker */}
            <MapView.Marker key="yourposition"
              coordinate={{ latitude: this.state.latitude, longitude: this.state.longitude }}
              title="You"
              pinColor={'magenta'}
            />
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

  },
  error:{
     fontSize: 18, color: 'red', padding: 5
     }
});