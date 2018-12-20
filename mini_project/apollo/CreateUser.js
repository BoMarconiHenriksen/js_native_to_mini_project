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
/*     update={(cache, { data: {user} }) => {
        const { allUsers } = cache.readQuery({ query: users.getAllusersQuery });
        cache.writeQuery({
            query: users.getAllusersQuery,
            data: { allUsers: allUsers.concat([userName, firstName, lastName, password, email]) }
        })
    }} */
  >
    
    {(createUser,{ loading, error, data }) => {
  

    if (loading) return <Text>Loading...</Text>;
      if (error) {
        if (error.message.includes("E11000")) return   <Text></Text>;
        return   <Text>{`Error! ${error.message}` }</Text>;

      }
   let Data= createUser({ variables:{input:{ userName:user.userName, firstName:user.firstName, lastName: user.lastName, password:user.password, email:user.email}}});
   
      if(data){   
         return (
          <Text>{`
                  ID: ${data.createUser.id} 
                  Username: ${data.createUser.userName} 
                  Firstname: ${data.createUser.firstName} 
                  Lastname: ${data.createUser.lastName} 
                  Password: ${data.createUser.password} 
                  Email: ${data.createUser.email}`
         }</Text>);}
   

                let   view =  
                    <Text>{`
                    ${user.userName} not created
                      
                         `
                    }</Text>
               
                
               return  view;
      
      
    }}
  </Mutation>
);

export default CreateUser;
