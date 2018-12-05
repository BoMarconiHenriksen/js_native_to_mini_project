import React from "react";
import { Query } from "react-apollo";
import gql from "graphql-tag";
import { Text, View } from 'react-native';

let getUserByUserName = gql`
query User($userName: String!) { 
  getUserByName(input:{userName: $userName}) {
  id
  userName
  firstName
  lastName
  password
  email
  }
}
`; 

const GetUserByUserName = ({userName}) => (
  <Query query={getUserByUserName} variables={{ userName }} >
    
    {({ loading, error, data }) => {
      if (loading) return <Text>Loading...</Text>;
      if (error) return `Error! ${error.message}`;

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
