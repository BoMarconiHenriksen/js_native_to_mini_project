import React from "react";
import { Query, Mutation } from "react-apollo";
import gql from "graphql-tag";
import { Text, View } from 'react-native';
import users from '../apollo/Users';
// https://codesandbox.io/s/v3mn68xxvy
// https://www.apollographql.com/docs/react/essentials/mutations.html#basic

let createUserQuery = gql`
mutation CreateUser($userName: String!, $firstName: String!, $lastName: String!, $password: String!, $email: String!) { 
  createUser(input:{userName: $userName, firstName: $firstName, lastName: $lastName, password: $password, email: $email}) {
    id
    userName
    firstName
    lastName
    password
    email
  }
}
`; 

const CreateUser = ({ userName, firstName, lastName, password, email }) => (
  <Mutation 
    mutation={createUserQuery} 
    variables={{ userName, firstName, lastName, password, email }}
    update={(cache, { data: { userName, firstName, lastName, password, email } }) => {
        const { allUsers } = cache.readQuery({ query: users.getAllusersQuery });
        cache.writeQuery({
            query: users.getAllusersQuery,
            data: { allUsers: allUsers.concat([userName, firstName, lastName, password, email]) }
        })
    }}
  >
    
    {({ loading, error, data }) => {
      if (loading) return <Text>Loading...</Text>;
      if (error) return `Error! ${error.message}`;
    

        let view = <View>
          <Text>{`
                  ID: ${data.createUserQuery.id} 
                  Username: ${data.createUserQuery.userName} 
                  Firstname: ${data.createUserQuery.firstName} 
                  Lastname: ${data.createUserQuery.lastName} 
                  Password: ${data.createUserQuery.password} 
                  Email: ${data.createUserQuery.email}`
                }</Text>
        </View>
        
        return view;
      
    }}
  </Mutation>
);

export default CreateUser;
