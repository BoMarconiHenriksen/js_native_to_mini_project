import React from 'react';
import { Platform, View, Text, Image, TextInput, Button, StyleSheet, ScrollView } from 'react-native';
import { Fab, Icon, Container, Content } from 'native-base'
import loginfacade from '../facades/loginFacade';
import { Constants, Location, Permissions ,MapView,Marker} from 'expo';
const URL = 'https://miniprojectfsjsbebop.herokuapp.com/api/';

export default class LoginScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = { text: "Waiting", loggedIn: false, userName: "", password: "", latitude: 0, longitude: 0, 
    distance: 1000, location: [], friends:[] , markers:[]}

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
    }
  }
  login =async (username, password, latitude, longitude, distance) => {
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
            this.setState({friends:responseJson.friends})
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
  _getFriends=async ()=>{
    this.setState({loggedIn:true});

   let friends= await this.login(this.state.userName, this.state.password, this.state.latitude, 
      this.state.longitude, this.state.distance)
    const friendsMapped=friends.map((friend)=>{
return friend.username
    })
      }
      


     

  

  render() {
   
    let text = 'Waiting..';
    if (this.state.errorMessage) {
      text = this.state.errorMessage;
    } else if (this.state.location) {
      text = 'Your position: Latitude: ' + this.state.latitude + ' Longitude: ' + this.state.longitude
    }
    return (
      <Container  contentContainerStyle={styles.contentContainer}>
      <Container>
     
      
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'flex-start' }}>

          <Text style={{ fontSize: 24 }}>Login</Text>
          <Text>{text}</Text>

          <TextInput style={{ width: 200, fontSize: 18 }} placeholder='username' onChangeText={(username) => this.setState({ userName: username })} value={this.state.userName} />
          <TextInput style={{ width: 200, fontSize: 18 }} placeholder='password' onChangeText={(password) => this.setState({ password: password })} value={this.state.password} />

          <TextInput style={{ width: 200, fontSize: 18 }} keyboardType={'numeric'} placeholder='500' onChangeText={(distance) => this.setState({ distance: Number(distance) })} value={this.state.distance} /> 
          {/* <Button title="get location" onPress={() => this._getLocationAsync()} />  */}
          <Text></Text>
          <Button title="submit" onPress={async() => this._getFriends()} />
        </View>
  

      
    </Container>
    <Container styles={styles.container2}>
    <MapView
      style={ styles.map }
      initialRegion={{
        latitude: this.state.latitude,
        longitude: this.state.longitude,
        latitudeDelta: 0.022,
        longitudeDelta: 0.022,
      }}
   ></MapView>

</Container>
  

</Container>
    );
  }
}
    
  const styles = StyleSheet.create({
   
  MainContainer :{
   
  justifyContent: 'center',
  flex:1,
  margin: 10
  },
   
  TextInputStyle: {
   
  textAlign: 'center',
   
  }, container2: {
    ...StyleSheet.absoluteFillObject,
    flex:2,
    height: 400,
    width: 400,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor:'transparent'
  },
  map: {
    ...StyleSheet.absoluteFillObject,
},
   
  });

  {/* https://medium.com/nycdev/create-a-react-native-app-with-google-map-using-expo-io-68041252023d */}