import React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { ApolloProvider } from "react-apollo";
import ApolloClient from "apollo-boost";
import Users from '../apollo/Users';

 // Client for Apollo.
 const client = new ApolloClient({
    uri: "https://miniprojectfsjsbebop.herokuapp.com/graphql"
  });

export default class AllUsersScreen extends React.Component {
    static navigationOptions = {
      header: null,
    };

    render() {
        return (
        
        <ApolloProvider client={client}>
            <View style={styles.container}></View>
            
            <View style={styles.title}>
                <Text>'A list of all users.'</Text>
            </View>

            <Users />
        </ApolloProvider>
        );
    };
};

const styles = StyleSheet.create({
    container: {
      flex: 4,
      backgroundColor: '#Fffffd',
    },
});
