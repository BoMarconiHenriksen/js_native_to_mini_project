import React from "react";
import { Query, Mutation } from "react-apollo";
import gql from "graphql-tag";
import { Text, View, TextInput, StyleSheet } from 'react-native';

// https://codesandbox.io/s/v3mn68xxvy
// https://www.apollographql.com/docs/react/essentials/mutations.html#basic

let getAllusersQuery = gql`
  query getAllusersQuery
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

let createUserMutation = gql`
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
    state = {
      userName: null, firstName: null, lastName: null, password: null, email: null
    };

    // Apollo giver adgang til cachen og payload(som er den data, der er blevet slettet)
    update = ( cache, payload ) => {
      // Opdater klienten så den matcher serveren.
      // Læs hvad der er i cachen.
      const data = cache.readQuery({ query: getAllusersQuery })
      console.log(data, payload);
      // Filter den slettere bruger ud af cachen.
      data.getUsers = data.getUsers.filter(getUser => getUser.id !== payload.data.deleteItem.id);
      // Læg de resterende brugere i cachen.
      cache.writeQuery({ query: getAllusersQuery, data })
    };


    handleChange = () => {
      // Get access to name and input.
      const { name, value } = e.target;
      // Virker for alle name input.
      this.setState({ [name] : value });
    };

  render() {
//  update={this.update}
// if (loading) return <Text>Loading...</Text>;
// if (error) return `Error! ${error.message}`;
    return (
      
      <Mutation mutation={createUserMutation} variables={this.state}>
      
      {/* the only child of a mutation or a query can only be a function. */}
      {/* () gives an implecit return. */}
      {(createUser, { loading, error, data }) => (
        
        <View>
        {/* Create user input and button. */}
        <Text>Create User</Text>
        <TextInput
        name={userName} 
        value={this.state.userName}
        style={styles.textinput} 
        /* onChangeText={(username) => _inputUsername = username} */
        onChange={this.handleChange}
        placeholder='Enter user name'
        />
                  
        <TextInput
        name={firstName} 
        value={this.state.firstName} 
        style={styles.textinput} 
        /* onChangeText={(firstname) => _inputFirstname = firstname} */
        onChange={this.handleChange}
        placeholder='Enter first name'
        />
        
        <TextInput 
        name={lastName} 
        value={this.state.lastName}
        style={styles.textinput} 
        /* onChangeText={(lastname) => _inputLastname = lastname} */
        onChange={this.handleChange}
        placeholder='Enter last name'
        />
        
        <TextInput 
        name={password} 
        value={this.state.password}
        style={styles.textinput} 
        /* onChangeText={(password) => _inputPassword = password} */
        onChange={this.handleChange}
        placeholder='Password'
        />
        
        <TextInput 
        name={email} 
        value={this.state.email}
        style={styles.textinput} 
        /* onChangeText={(email) => _inputEmail = email} */
        onChange={this.handleChange}
        placeholder='Email'
        />
          
        <Button onPress={ createUser() } 
        title="Create User"
        /> 
        </View> 
        
    )};
                
      </Mutation>
    )
  };
};

const styles = StyleSheet.create({
  container: {
    flex: 4,
    backgroundColor: '#Fffffd',
  },
  textinput: {
      padding: 5, width: 200, fontSize: 18
    },
});

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

