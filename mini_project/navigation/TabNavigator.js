import React from 'react';
import { Icon } from 'react-native-elements';
import { createStackNavigator, createBottomTabNavigator ,TabNavigator } from 'react-navigation';
import { Platform} from 'react-native';
import TabBarIcon from '../components/TabBarIcon';
import HomeScreen from '../screens/HomeScreen';
import LoginScreen from '../screens/LoginScreen';
import LoginBeScreen from '../screens/LoginBeScreen';


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
                ? `ios-home${focused ? '' : 'md-home'}`
                : 'md-home'
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
                    ? `ios-log-in${focused ? '' : 'md-log-in'}`
                    : 'md-log-in'
                }
              />
            ),
           
          };
   
          const LoginBeStack = createStackNavigator({
            LoginBe: LoginBeScreen,
          });
              
            LoginBeStack.navigationOptions = {
                tabBarLabel: 'LoginBe',
                tabBarIcon: ({ focused }) => (
                  <TabBarIcon
                    focused={focused}
                    name={
                      Platform.OS === 'ios'
                        ? `ios-log-in${focused ? '' : 'md-log-in'}`
                        : 'md-log-in'
                    }
                  />
                ),
               
              };

  export default createBottomTabNavigator({
    HomeStack,
    LoginStack,
    LoginBeStack

  })