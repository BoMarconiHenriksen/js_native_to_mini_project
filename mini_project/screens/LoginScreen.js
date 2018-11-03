import React from 'react';
import {Platform,  View, Text, Image, TextInput, Button,StyleSheet} from 'react-native';
import { Fab, Icon, Container, Content } from 'native-base'
import loginfacade from '../facades/loginFacade';
import { Constants, Location, Permissions } from 'expo';

export default class LoginScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = { text: "Waiting", loggedIn: false, userName: "", password: "", latitude:0, longitude:0, distance: 1000, location:[] }

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
      this.setState({location:location})
      this.setState({ latitude:location.coords.latitude, longitude:location.coords.longitude });
    };
  
    render() {
      let text = 'Waiting..';
      if (this.state.errorMessage) {
        text = this.state.errorMessage;
      } else if (this.state.location) {
       text='Your position: Latitude: '+this.state.latitude+' Longitude: '+this.state.longitude
      }
      return (
        <Container style={{ alignItems: 'center', justifyContent: 'center', padding: 50 }}>
          <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>

            <Image source={require('../assets/icon.png')} style={{
              width: 50,
              height: 50,
              alignSelf: 'center',

            }} />
            <Text style={{ fontSize: 36 }}>Login</Text>
            <Text>{text}</Text>
          </View>



          <View style={{ flex: 1 }}>




            <TextInput style={{ width: 200, fontSize: 18 }} placeholder='username' onChangeText={(username) => this.setState({ userName: username })} value={this.state.userName} />
            <TextInput style={{ width: 200, fontSize: 18 }} placeholder='password' onChangeText={(password) => this.setState({ password: password })} value={this.state.password} />
            
          <TextInput   keyboardType={'numeric'} placeholder='500' onChangeText={(distance) => this.setState({distance:Number(distance)})} value={this.state.distance} /> 
            <Button title="get location" onPress={() => this._getLocationAsync()} />
            <Text></Text>
            <Button title="submit" onPress={() => loginfacade.login(this.state.userName, this.state.password, this.state.latitude,this.state.longitude, this.state.distance )} />
          </View>
        </Container>

      ); }
  }

  4
  5
  6
  7
  8
  9
  10
  11
  12
  13
  14
  15
  16
    
  const styles = StyleSheet.create({
   
  MainContainer :{
   
  justifyContent: 'center',
  flex:1,
  margin: 10
  },
   
  TextInputStyle: {
   
  textAlign: 'center',
   
  }
   
  });