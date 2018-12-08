import React from "react";
import { Query, Mutation } from "react-apollo";
import gql from "graphql-tag";
import { Text, View } from 'react-native';
import users from './Users';
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
  }
}
`;

const UpdateUser = ({id, user }) =>(
  
    <Mutation
      mutation={Update_User}
      variables={{ id:id, [Object.keys(user)[0]]:Object.values(user)[0]}}
    >

      {(updateUser, { loading, error, data }) => {
  
        updateUser({ variables: { input: { id:id, [Object.keys(user)[0]]:Object.values(user)[0]}}});
        // if (loading) return <Text>Loading...</Text>;
        if (error) return `Error! ${error.message}`;

        let   view = <View>
            <Text>{`
                Opdateret ID: ${id}  
                 ${Object.keys(user)[0]} : ${Object.values(user)[0]}
                  
                 `
            }</Text>
          </View>
        
        return view;

      }}</Mutation>
    
) 
export default UpdateUser;
