import React from "react";
import { Query, Mutation } from "react-apollo";
import gql from "graphql-tag";
import { Text, View } from 'react-native';

let deleteUserQuery = gql`
mutation deleteUser($id: ID!) { 
    deleteUser(id: $id) 
    
}
`; 

const DeleteUser = ({id}) => (
  <Mutation mutation={deleteUserQuery} variables={{ id }} >
    
    {({ loading, error, data }) => {
      if (loading) return <Text>Deleting...</Text>;
      if (error) return `Error! ${error.message}`;
     
        let view = <View>
          <Text>{`
                User deleted. ${data.deleteUserQuery} 
                `
                }</Text>
        </View>
        
        return view;
      
    }}
  </Mutation>
);

export default DeleteUser;
