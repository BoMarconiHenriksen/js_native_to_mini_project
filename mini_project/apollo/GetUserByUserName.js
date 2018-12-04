import React from "react";
// ApolloProvider vi slipper for at løfte state op og ned.
// Alle komponenter kan automatisk bruge ApolloProver så længe komponenterne er inde i AP.
import { Query } from "react-apollo";
import gql from "graphql-tag";
import { Text, View, Button } from 'react-native';

/* let getUserByUserName = gql`
query{getUserByName(input:{$userName: String!}) {
  id
  userName
  firstName
  lastName
  password
  email
  }
}
`; */

const GetUserByUserName = () => (
  <Query query={getUserByUserName} >
    
    {({ loading, error, data }) => {
      if (loading) return <Text>Loading...</Text>;
      if (error) return <Text>Error in the application!</Text>;

      return data.getUserByName.map(({ id, userName, firstName, lastName, password, email }) => (
        <View key={id}>
          <Text>{`
                  ID: ${id} 
                  Username: ${userName} 
                  Firstname: ${firstName} 
                  Lastname: ${lastName} 
                  Password: ${password} 
                  Email: ${email}`
                }</Text>
        </View>
        
      ));
      
    }}
  </Query>
);

export default GetUserByUserName;