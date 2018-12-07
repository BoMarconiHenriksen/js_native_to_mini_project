import React from "react";
import { Mutation } from "react-apollo";
import gql from "graphql-tag";
import { Text, View } from 'react-native';

let deleteUserQuery = gql`
mutation deleteUserQuery($id: ID!) { 
    deleteUser(id: $id) 
}
`; 

const DeleteUser = ({id}) => (
  <Mutation mutation={deleteUserQuery} variables={{ id }} >

  {(deleteUser, { loading, error, data }) => {
    console.log('ID!!!!' + id);
    //if (loading) return <Text>Deleting...</Text>;
    if (error) return `Error! ${error.message}`;
    console.log(data);
    deleteUser();

      let view = 
      <View>
        <Text>{`
              User is deleted.
              `
              }
        </Text>
      </View>
      
      return view;
  }}
      
  </Mutation>
);

export default DeleteUser;
