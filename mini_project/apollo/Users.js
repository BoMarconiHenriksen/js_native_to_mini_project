import React from "react";
// ApolloProvider vi slipper for at løfte state op og ned.
// Alle komponenter kan automatisk bruge ApolloProver så længe komponenterne er inde i AP.
import { Query } from "react-apollo";
import gql from "graphql-tag";
import { Text, View } from 'react-native';

let getAllusersQuery = gql`
{
  getUsers {
    id
    firstName
    lastName
    userName
    password
    email
  }
}
`;

const Users = () => (
  <Query query={getAllusersQuery} >
    
    {( { loading, error, data }) => {
      if (loading) return <Text>Loading...</Text>;
      if (error) return `Error! ${error.message}`;

      return data.getUsers.map(({ id, userName, firstName, lastName, password, email }) => (
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

export default Users;
