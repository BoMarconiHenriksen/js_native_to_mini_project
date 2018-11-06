import React from 'react';
import { Icon } from 'react-native-elements';
import { createStackNavigator, createBottomTabNavigator ,TabNavigator } from 'react-navigation';
import HomeScreen from '../screens/HomeScreen';
import LoginScreen from '../screens/LoginScreen';
import MaptestScreen from '../screens/MaptestScreen';


const HomeStack = createStackNavigator({
    Home: HomeScreen,
  });
      
      HomeStack.navigationOptions = {
        tabBarLabel: 'Home'
    
      };
      const LoginStack = createStackNavigator({
        Login: LoginScreen,
      });
          
        LoginStack.navigationOptions = {
            tabBarLabel: 'Login'
           
          };
   

  export default createBottomTabNavigator({
    HomeStack,
    LoginStack

  })