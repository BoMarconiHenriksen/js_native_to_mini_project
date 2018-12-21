import React from "react";
import { Query, Mutation } from "react-apollo";
import gql from "graphql-tag";
import { Text, View } from 'react-native';
import users from './Users';
import { asyncify } from "async";
// https://codesandbox.io/s/v3mn68xxvy
// https://www.apollographql.com/docs/react/essentials/mutations.html#basic



let Update_User = gql`
mutation UpdateUser($id:ID!, $userName:String,  $firstName:String,  $lastName:String,  $password:String,$type:String,$company:String,$companyUrl:String, $email:String) { 
  updateUser(input:{id:$id,userName: $userName, firstName: $firstName, lastName: $lastName, password: $password,job:{type:$type,company:$company,companyUrl:$companyUrl},email: $email}) {
    id
    userName
    firstName
    lastName
    password
    email
    job{
      type
    company
    companyUrl
    }
  }
}
`;

const UpdateUser =({id, user }) =>(
  
    <Mutation
      mutation={Update_User}
      variables={{ id:id, [Object.keys(user)[0]]:Object.values(user)[0]}}
    >

      {(updateUser, {  error, data }) => {
  

      
       // if (loading) return <Text>Loading...</Text>;
        if (error) return <Text>{`Error! ${error.message}`}</Text>;
       
     if(data)return <Text>{`
     Opdateret ID: ${data.updateUser.id}
     Username: ${data.updateUser.userName} 
                  Firstname: ${data.updateUser.firstName} 
                  Lastname: ${data.updateUser.lastName} 
                  Password: ${data.updateUser.password} 
                  Email: ${data.updateUser.email}  
                  Job - type: ${data.updateUser.job[0].type}  
                  Job - company: ${data.updateUser.job[0].company} 
                  Job - companyUrl: ${data.updateUser.job[0].companyUrl} 
   
      `
 }</Text>;
 
          updateUser({ variables: { input: { id:id, [Object.keys(user)[0]]:Object.values(user)[0]}}});
        

        let   view =  <View>
            <Text>{`
                Opdateret ID: ${id}  
              
                 `
            }</Text>
          </View>
        
       return  view;
          
      }}</Mutation>
    
) 
export default UpdateUser;
