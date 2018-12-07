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
      console.log('ID!!!!' + id);
      if (loading) return <Text>Deleting...</Text>;
      if (error) return `Error! ${error.message}`;
     
        let view = <View>
          <Text>{`
                User deleted. ${data} 
                `
                }</Text>
        </View>
        
        return view;
      
    }}
  </Mutation>
);

export default DeleteUser;

/* 
const DeleteUser = ({id}) => (
  
  <Mutation mutation={deleteUserQuery} variables={{ id }} >
   
    {(deleteUser,{ loading, error, data }) => {
     deleteUser({ variables: { id:id} });
      let view="";
      if (loading) return <Text>Deleting...</Text>;
      if (error) return Error! ${error.message};
      if (data!==null) view= <View> <Text>returns null</Text></View>
         view = <View>
         <Text>{`
                User deleted. ${data} 
                `
}</Text>
        </View>
        
        return view;
      
    }}
  </Mutation>
);
*/