import React from 'react';
import {Platform,  View, Text, Image, TextInput, Button,StyleSheet} from 'react-native';
import { Fab, Icon, Container, Content } from 'native-base'
import loginfacade from '../facades/loginFacade';
import { Constants, Location, Permissions } from 'expo';

export default class LoginScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = { loggedIn: false, userName: "", password: "", latitude:0, longitude:0, distance: 1000 }

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
      console.log(location.coords.latitude)
      this.setState({ latitude:location.coords.latitude, longitude:location.coords.longitude });
    };
  
    render() {
      return (
        <Container style={{ alignItems: 'center', justifyContent: 'center', padding: 50 }}>
          <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>

            <Image source={require('../assets/icon.png')} style={{
              width: 50,
              height: 50,
              alignSelf: 'center',

            }} />
            <Text style={{ fontSize: 36 }}>Login</Text>
          </View>



          <View style={{ flex: 1 }}>




            <TextInput style={{ width: 200, fontSize: 18 }} placeholder='username' onChangeText={(username) => this.setState({ userName: username })} value={this.state.userName} />
            <TextInput style={{ width: 200, fontSize: 18 }} placeholder='password' onChangeText={(password) => this.setState({ password: password })} value={this.state.password} />
            
            {/* <TextInput  style={styles.TextInputStyle} keyboardType={'numeric'} value={this.state.distance} onChange={distance => this.setState({distance:distance})} /> */}
            <Button title="get location" onPress={() => this._getLocationAsync()} />
            <Button title="submit" onPress={() => loginfacade.login(this.state.userName, this.state.password, this.state.latitude,this.state.longitude, 1000)} />
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