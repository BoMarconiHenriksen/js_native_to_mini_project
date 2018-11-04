import React from 'react';
import { Platform, View, Text, Image, TextInput, Button, StyleSheet, ScrollView } from 'react-native';
import { Fab, Icon, Container, Content } from 'native-base'
import loginfacade from '../facades/loginFacade';
import { Constants, Location, Permissions ,MapView,Marker} from 'expo';


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
    this.setState({friends:[{latitude:this.state.latitude, longitude:this.state.longitude, username:this.state.userName}]})
   let friends= await loginfacade.login(this.state.userName, this.state.password, this.state.latitude, 
      this.state.longitude, this.state.distance).then((data)=>{
        if(data){
          this.setState({loggedIn:true});
          this.setState({friends:friends})
        }else{
          this.setState({friends:[{username:'weird', latitude:this.state.latitude, longitude:this.state.longitude}]})
        }
      })


  }
     

  

  render() {
    console.log(this.state.friends)
    let text = 'Waiting..';
    if (this.state.errorMessage) {
      text = this.state.errorMessage;
    } else if (this.state.location) {
      text = 'Your position: Latitude: ' + this.state.latitude + ' Longitude: ' + this.state.longitude
    }
    return (
      <Container style={styles.container} contentContainerStyle={styles.contentContainer}>
      <Container>
     
      
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'flex-start' }}>

          <Text style={{ fontSize: 24 }}>Login</Text>
          <Text>{text}</Text>

          <TextInput style={{ width: 200, fontSize: 18 }} placeholder='username' onChangeText={(username) => this.setState({ userName: username })} value={this.state.userName} />
          <TextInput style={{ width: 200, fontSize: 18 }} placeholder='password' onChangeText={(password) => this.setState({ password: password })} value={this.state.password} />

          <TextInput style={{ width: 200, fontSize: 18 }} keyboardType={'numeric'} placeholder='500' onChangeText={(distance) => this.setState({ distance: Number(distance) })} value={this.state.distance} />
          {/* <Button title="get location" onPress={() => this._getLocationAsync()} /> */}
          <Text></Text>
          <Button title="submit" onPress={async() => this._getFriends()} />
        </View>
  

      
    </Container>
    <Container>
    <MapView
      style={ styles.map }
      initialRegion={{
        latitude: 37.78825,
        longitude: -122.4324,
        latitudeDelta: 0.00422,
        longitudeDelta: 0.00421,
      }}
   / >

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
   
  },  map: {
      height: 100,
      width :400,
      flex:1
     
   }
   
  });