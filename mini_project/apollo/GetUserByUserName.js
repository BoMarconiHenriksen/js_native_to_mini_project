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

        let view = <View>
          <Text>{`
                  ID: ${data.getUserByName.id} 
                  Username: ${data.getUserByName.userName} 
                  Firstname: ${data.getUserByName.firstName} 
                  Lastname: ${data.getUserByName.lastName} 
                  Password: ${data.getUserByName.password} 
                  Email: ${data.getUserByName.email}`
                }</Text>
        </View>
        
        return view;
      
    }}
  </Query>
);

export default GetUserByUserName;
