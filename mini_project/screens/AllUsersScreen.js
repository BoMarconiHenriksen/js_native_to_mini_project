import React from 'react';
import { Text, View, StyleSheet, ScrollView } from 'react-native';
import Users from '../apollo/Users';

export default class AllUsersScreen extends React.Component {
    static navigationOptions = {
        
        title: "A list of all users."
      };
    render() {
        return (
        
            <ScrollView>
                <View style={styles.container}></View>
                
             

                <Users />
            </ScrollView>
        
        );
    };
};

const styles = StyleSheet.create({
    container: {
      flex: 4,
      backgroundColor: '#Fffffd',
    },
});
