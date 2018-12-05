import React from 'react';
import { createStackNavigator, createBottomTabNavigator } from 'react-navigation';
import { Platform } from 'react-native';
import TabBarIcon from '../components/TabBarIcon';
import HomeScreen from '../screens/HomeScreen';
import LoginScreen from '../screens/LoginScreen';
import EditUserScreen from '../screens/EditUserScreen';
import AllUsersScreen from '../screens/AllUsersScreen';


const HomeStack = createStackNavigator({
  Home: HomeScreen,
});

HomeStack.navigationOptions = {
  tabBarLabel: 'Home', tabBarIcon: ({ focused }) => ( 
    <TabBarIcon focused = { focused }
    name = {
      Platform.OS === 'ios' ?
      `ios-home${focused ? '' : 'md-home'}` :
        'md-home'
    }
    />
  ),
};

const LoginStack = createStackNavigator({
  Login: LoginScreen,
});

LoginStack.navigationOptions = { tabBarLabel: 'Login', tabBarIcon: ({ focused }) => ( 
  <TabBarIcon focused = { focused }
    name = {
      Platform.OS === 'ios' ?
      `ios-log-in${focused ? '' : 'md-log-in'}` :
        'md-log-in'
    }
    />
  ),

};

const AllUsersStack = createStackNavigator({
  Users: AllUsersScreen,
});

AllUsersStack.navigationOptions = { tabBarLabel: 'Users', tabBarIcon: ({ focused }) => ( 
  <TabBarIcon focused = { focused }
    name = {
      Platform.OS === 'ios' ?
      `ios-contacts${focused ? '' : 'md-contacts'}` :
        'md-contacts'
    }
    />
  ),

};

const EditUserStack = createStackNavigator({
  Edit: EditUserScreen,
});

EditUserStack.navigationOptions = { tabBarLabel: 'Edit User', tabBarIcon: ({ focused }) => ( 
  <TabBarIcon focused = { focused }
    name = {
      Platform.OS === 'ios' ?
      `ios-contacts${focused ? '' : 'md-contacts'}` :
        'md-contacts'
    }
    />
  ),

};

export default createBottomTabNavigator({
  HomeStack,
  LoginStack,
  AllUsersStack,
  EditUserStack,
});
