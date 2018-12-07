import React from 'react';
import { Text, View, StyleSheet, ScrollView, TextInput, Button } from 'react-native';
import GetUserByUserName from '../apollo/GetUserByUserName';
import DeleteUser from '../apollo/DeleteUser';
import CreateUser from '../apollo/CreateUser';

export default class EditUserScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
          userName: null,
          id: null,
          user: {userName: null, firstName: null, lastName: null, password: null, email: null}
        };
    
      };

    render() {
        
        return (
            <ScrollView>
                
                <View style={styles.title}>
                    <Text>Working with Apollo and GraphQL</Text>
                    <Text>Get User By Username</Text>
                </View>

                {/* getUserByName input and button. */}
                <TextInput style={styles.textinput} onChangeText={(username) => _inputName = username}/>
                <Button onPress={ () => this.setState({userName: _inputName}) } title="Get a user by username"/> 
                
                {/* Show the result of GetUserByName component. */}
                {this.state.userName != null &&
                    <GetUserByUserName userName={this.state.userName}/>
                }
                
                {/* Delete user input and button. */}
                <Text>Delete User</Text>
                <TextInput style={styles.textinput} onChangeText={(id) => _inputId = id}/>
                <Button onPress={ () => this.setState({id: _inputId}) } title="Delete a user"/> 
                
                {/* Show the result of GetUserByName component. */}
                {this.state.id != null &&
                    <DeleteUser id={this.state.id}/>
                }

                {/* Create user input and button. */}
                <Text>Create User</Text>
                <TextInput 
                style={styles.textinput} 
                onChangeText={(username) => _inputUsername = username}
                placeholder='Enter user name'
                />
                
                <TextInput 
                style={styles.textinput} 
                onChangeText={(firstname) => _inputFirstname = firstname}
                placeholder='Enter first name'
                />

                <TextInput 
                style={styles.textinput} 
                onChangeText={(lastname) => _inputLastname = lastname}
                placeholder='Enter last name'
                />

                <TextInput 
                style={styles.textinput} 
                onChangeText={(password) => _inputPassword = password}
                placeholder='Password'
                />

                <TextInput 
                style={styles.textinput} 
                onChangeText={(email) => _inputEmail = email}
                placeholder='Email'
                />

                <Button onPress={ () => this.setState({
                    user: {
                        userName: _inputUsername, 
                        firstName: _inputFirstname,
                        lastName: _inputLastname,
                        password: _inputPassword,
                        email: _inputEmail }
                })} 
                title="Create User"
                /> 
                
             {/*     Show the result of CreateUser component. */}
                {this.state.user.email != null &&
                    <CreateUser user={ this.state.user }/>
                } 
                
            </ScrollView>
        );
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