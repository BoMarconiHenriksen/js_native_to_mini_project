import React from 'react';
import { StyleSheet, View } from 'react-native';
import TabNavigator from './navigation/TabNavigator';
import { ApolloProvider } from "react-apollo";
import ApolloClient from "apollo-boost";

 // Client for Apollo.
const client = new ApolloClient({
    uri: "https://miniprojectfsjsbebop.herokuapp.com/graphql"
  });
export default class App extends React.Component {
 

  render() {

      return (
        <ApolloProvider client={client}>

        <View style={styles.container}>
          <TabNavigator />
        </View>
        
        </ApolloProvider>
        
      );
    }
  }

 

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F0F7D4',
  },
});
