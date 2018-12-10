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

const CreateUser = ({ user}) => (
  <Mutation 
    mutation={createUserQuery} 
   variables={{userName: user.userName, firstName:user.firstName, lastName:user.lastName, password:user.password, email:user.email }}
    // update={(cache, { data: {user} }) => {
    //     const { allUsers } = cache.readQuery({ query: users.getAllusersQuery });
    //     cache.writeQuery({
    //         query: users.getAllusersQuery,
    //         data: { allUsers: allUsers.concat([userName, firstName, lastName, password, email]) }
    //     })
    // }}
  >
    
    {(createUser,{ loading, error, data }) => {
  
  createUser({ variables:{input:{ userName:user.userName, firstName:user.firstName, lastName: user.lastName, password:user.password, email:user.email}}});
    //  if (loading) return <Text>Loading...</Text>;
      if (error) return    <Text>{`Error! ${error.message}` }</Text>;
    

        let view = <View>
          <Text>{`
                  ID: ${createUser.id} 
                  Username: ${createUser.userName} 
                  Firstname: ${createUser.firstName} 
                  Lastname: ${createUser.lastName} 
                  Password: ${createUser.password} 
                  Email: ${createUser.email}`
                }</Text>
        </View>
        
        return view;
      
    }}
  </Mutation>
);

export default CreateUser;
