import React from "react";
import { Query, Mutation } from "react-apollo";
import gql from "graphql-tag";
import { Text, View } from 'react-native';
import users from '../apollo/Users';
// https://codesandbox.io/s/v3mn68xxvy
// https://www.apollographql.com/docs/react/essentials/mutations.html#basic

let getAllusersQuery = gql`
{
  getUsers {
    id
    firstName
    lastName
    userName
    password
    email
  }
}
`;

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

export default class CreateUser extends React.Component {

  render() {
    let user = this.props.user;

      // Apollo giver adgang til cachen og payload(som er den data, der er blevet slettet)
    update = ( cache, payload ) => {
      // Opdater klienten så den matcher serveren.
      // Læs hvad der er i cachen.
      const data = cache.readQuery({ query: createUser })
      console.log(data, payload);
      // Filter den slettere bruger ud af cachen.
      data.getUsers = data.getUsers.filter(getUser => getUser.id !== payload.data.deleteItem.id);
      // Læg de resterende brugere i cachen.
      cache.writeQuery({ query: createUser, data })
    };

    return (
      
      <Mutation mutation={createUserQuery} variables={{userName: user.userName, firstName:user.firstName, lastName:user.lastName, password:user.password, email:user.email }}>

      {(createUser, { loading, error, data }) => {
  
        
        if (loading) return <Text>Loading...</Text>;
        if (error) return `Error! ${error.message}`;

        createUser({ variables:{input:{ userName:user.userName, firstName:user.firstName, lastName: user.lastName, password:user.password, email:user.email}}});

          
          return null;
  
}};


      </Mutation>
    )
  }
}


/* 
<Mutation 
    mutation={createUserQuery} 
    variables={{userName: user.userName, firstName:user.firstName, lastName:user.lastName, password:user.password, email:user.email }}

  >
    
    {(createUser, { loading, error, data }) => {
 
      createUser();
      if (loading) return <Text>Loading...</Text>;
      if (error) return `Error! ${error.message}`;

      return null;
      
    }}
  </Mutation>
);
*/

/* 
let view = <View>
          <Text>{`
                  ID: ${data.createUser.id} 
                  Username: ${data.createUser.userName} 
                  Firstname: ${data.createUser.firstName} 
                  Lastname: ${data.createUser.lastName} 
                  Password: ${data.createUser.password} 
                  Email: ${data.createUser.email}`
                }</Text>
        </View>
        
        return view;
*/

