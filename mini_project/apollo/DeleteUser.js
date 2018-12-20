import React from "react";
import { Query, Mutation } from "react-apollo";
import gql from "graphql-tag";
import { Text, View } from 'react-native';

const deleteUserQuery = gql`
 mutation DeleteUser ($id: ID!) {
    deleteUser(id: $id)
  }
`; 

const DeleteUser = ({id}) => (
  
  <Mutation mutation={deleteUserQuery} variables={{ id }} >
   
    {(deleteUser,{ loading, error, data }) => {
     
      let view="";
     // if (loading) return <Text>Deleting...</Text>;
      if (error) return `Error! ${error.message}`;
      if(id!==null)  deleteUser({ variables: { id:id} });
      if (data!==null) view= <View> <Text>returns null</Text></View>
         view = <View>
         <Text>{`
                User with id: ${id} deleted. 
             `
}</Text>
        </View>
        
        return view;
      
    }}
  </Mutation>
);

export default DeleteUser;
