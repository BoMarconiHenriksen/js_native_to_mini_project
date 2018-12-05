import React from 'react';
import { Text, View, StyleSheet, ScrollView } from 'react-native';
import Users from '../apollo/Users';

export default class AllUsersScreen extends React.Component {
    static navigationOptions = {
      header: null,
    };

    render() {
        return (
        
            <ScrollView>
                <View style={styles.container}></View>
                
                <View style={styles.title}>
                    <Text>'A list of all users.'</Text>
                </View>

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
