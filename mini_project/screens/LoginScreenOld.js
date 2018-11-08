import React from 'react';
import { Platform, View, Text, Image, TextInput, Button, StyleSheet, ScrollView } from 'react-native';
import { Fab, Icon, Container, Content } from 'native-base'
import { Constants, Location, Permissions, MapView, Marker } from 'expo';
const URL = 'https://miniprojectfsjsbebop.herokuapp.com/api/';

export default class LoginScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      text: "Waiting", loggedIn: false, userName: "", password: "", latitude: 55.5364109, longitude: 12.2190846,
      distance: 1000, location: [], markers: [{ username: 'me', latitude: 55.5364109, longitude: 12.2190846 }], region: []
    }

  }
  static navigationOptions = {
    header: null,
    title: "Login",

  };
  componentWillMount() {
    if (Platform.OS === 'android' && !Constants.isDevice) {
      this.setState({
        errorMessage: 'Oops, this will not work on Sketch in an Android emulator. Try it on your device!',
      });
    } else {
      this._getLocationAsync();
      console.log(this.state.markers)
    }
  }
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
        this.setState({ markers: responseJson.friends })
        this.setState({ loggedIn: true });
        return responseJson.friends;
      })
      .catch((error) => {
        console.error(error);
      });
  }

  _getLocationAsync = async () => {

    let { status } = await Permissions.askAsync(Permissions.LOCATION);
    if (status !== 'granted') {
      this.setState({
        errorMessage: 'Permission to access location was denied',
      });

    }

    const location = await Location.getCurrentPositionAsync({});

    this.setState({ location: location })
    this.setState({ latitude: location.coords.latitude, longitude: location.coords.longitude });
  };
  getInitialState() {
    return {
      region: {
        latitude: this.state.latitude,
        longitude: this.state.longitude,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      },
    };
  }
  
  onRegionChange(region) {
    this.setState({ region });
  }
  

  

  render() {

    let text = 'Waiting..';
    if (this.state.errorMessage) {
      text = this.state.errorMessage;
    } else if (this.state.location) {
      text = 'Your position: Latitude: ' + this.state.latitude + ' Longitude: ' + this.state.longitude
    }
    return (

      <ScrollView>
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'flex-start' }}>

          <Text style={{ fontSize: 24 }}>Login</Text>
          <Text>{text}</Text>

          <TextInput style={{ width: 200, fontSize: 18 }} placeholder='username' onChangeText={(username) => this.setState({ userName: username })} value={this.state.userName} />
          <TextInput style={{ width: 200, fontSize: 18 }} placeholder='password' onChangeText={(password) => this.setState({ password: password })} value={this.state.password} />

          <TextInput style={{ width: 200, fontSize: 18 }} keyboardType={'numeric'} placeholder='500' onChangeText={(distance) => this.setState({ distance: Number(distance) })} value={this.state.distance} />
          <Button title="get location" onPress={() => this._getLocationAsync()} />  
          <Text></Text>
          <Button title="submit" onPress={() => this.login(this.state.userName,this.state.password, this.state.latitude, this.state.longitude,this.state.distance)} />
        </View>


        < MapView style={styles.map}
          initialRegion={this.getInitialState()}
        >
        {this.state.markers.map(marker =>(
          <MapView.Marker
            coordinate={{latitude:marker.latitude,longitude:marker.longitude}}
           title={marker.username}
          />
        ))}

        </ MapView>

      </ScrollView>



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



{/* https://medium.com/nycdev/create-a-react-native-app-with-google-map-using-expo-io-68041252023d */ }
/* 
{this.state.markers.map(marker =>(
  <Marker
    coordinate={{latitude:marker.latitude,longitude:marker.longitude}}
   
  />
))} */