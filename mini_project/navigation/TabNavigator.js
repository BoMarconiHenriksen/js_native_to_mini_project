import React from 'react';
import { TabNavigator } from 'react-navigation';
import { Icon } from 'react-native-elements';
import { createStackNavigator, createBottomTabNavigator,createMaterialTopTabNavigator } from 'react-navigation';
import HomeScreen from '../screens/HomeScreen';
import LoginScreen from '../screens/LoginScreen';
import TabBarIcon from '../components/TabBarIcon';

const HomeStack = createStackNavigator({
    Home: HomeScreen,
  });
      
      HomeStack.navigationOptions = {
        tabBarLabel: 'Home',
        tabBarIcon: ({ focused }) => (
          <TabBarIcon
            focused={focused}
            name={
              Platform.OS === 'ios'
                ? `ios-information-circle${focused ? '' : '-outline'}`
                : 'md-information-circle'
            }
          />
        ),
      };
      const LoginStack = createStackNavigator({
        Login: LoginScreen,
      });
          
        LoginStack.navigationOptions = {
            tabBarLabel: 'Login',
            tabBarIcon: ({ focused }) => (
              <TabBarIcon
                focused={focused}
                name={
                  Platform.OS === 'ios'
                    ? `ios-information-circle${focused ? '' : '-outline'}`
                    : 'md-information-circle'
                }
              />
            ),
          };


  export default createMaterialTopTabNavigator({
    HomeStack,
    LoginStack
  })