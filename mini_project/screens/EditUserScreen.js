import React from 'react';
import { Text, View, StyleSheet, ScrollView, TextInput, Button, Picker } from 'react-native';
import GetUserByUserName from '../apollo/GetUserByUserName';
import DeleteUser from '../apollo/DeleteUser';
import CreateUser from '../apollo/CreateUser';
import UpdateUser from '../apollo/UpdateUser';

export default class EditUserScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            userName: null,
            id: null,
            userToUpdate: null,
            user: { userName: null, firstName: null, lastName: null, password: null, email: null, job: { type: null, company: null, companyUrl: null } },
            userupd: { userName: null, firstName: null, lastName: null, password: null, email: null, job: { type: null, company: null, companyUrl: null } },
            updatekey: null,
            updateBoo: false
        };

    };


 
    render() {

        return  (
            <ScrollView>

                <View style={styles.title}>
                    <Text>Working with Apollo and GraphQL</Text>
                    <Text>Get User By Username</Text>
                </View>

                {/* getUserByName input and button. */}
                <TextInput style={styles.textinput} onChangeText={(username) => _inputName = username} />
                <Button onPress={() => this.setState({ userName: _inputName })} title="Get a user by username" />

                {/* Show the result of GetUserByName component. */}
                {this.state.userName != null &&
                    <GetUserByUserName userName={this.state.userName} />
                }

                {/* Delete user input and button. */}
                <Text>Delete User</Text>
                <TextInput style={styles.textinput} onChangeText={(id) => _inputId = id} />
                <Button onPress={() => this.setState({ id: _inputId })} title="Delete a user" />

                {/* Show the result of GetUserByName component. */}
                {this.state.id != null &&
                    <DeleteUser id={this.state.id} user={this.state._inputValue} />
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

                <Button onPress={() => this.setState({
                    user: {
                        userName: _inputUsername,
                        firstName: _inputFirstname,
                        lastName: _inputLastname,
                        password: _inputPassword,
                        email: _inputEmail
                    }
                })}
                    title="Create User"
                />

                {/*     Show the result of CreateUser component. */}
                {this.state.user.email != null &&
                    <CreateUser user={this.state.user} />
                }
                {/* Create user input and button. */}
                <Text>update User</Text>
                <TextInput
                    style={styles.textinput}
                    onChangeText={(id) => _inputUserUpdate =id}
                    placeholder="id (id sucks)"
                />

                <Picker
                    selectedValue={this.state.updatekey}
                    style={{ height: 50, width: 300 }}
                    onValueChange={(itemValue, itemIndex) =>{ this.setState({ updatekey: itemValue })}}>
                       <Picker.Item label="pick what you want to update from scroll down" value="" />
                    <Picker.Item label="username" value="userName" />
                    <Picker.Item label="firstname" value="firstName" />
                    <Picker.Item label="lastname" value="lastName" />
                    <Picker.Item label="password" value="password" />
                    <Picker.Item label="email" value="email" />
                    <Picker.Item label="job - type" value="type" />
                    <Picker.Item label="job - company" value="company" />
                    <Picker.Item label="job - companyUrl" value="companyUrl" />

                </Picker>

                <TextInput
                    style={styles.textinput}
                
                    onChangeText={(input) => { _inputUpdate = input }}
                    placeholder='Enter update'
                />
                <Button onPress={() => {
                    this.setState({
                        userToUpdate: _inputUserUpdate,
                        userupd: { [this.state.updatekey]: _inputUpdate },
                        updateBoo: true
                    })
                }}
                    title="Update User"
                />

                {/*     Show the result of UpdateUser component. */}
                {this.state.updateBoo ==true &&
                    <UpdateUser id={this.state.userToUpdate} user={this.state.userupd} /> 
             
                }
  <Button onPress={() => {
                    this.setState({
                        updateBoo: false,
                        _inputUpdate : null,
                        userName: null,
                        id: null,
                        userToUpdate: null,
                        user: { userName: null, firstName: null, lastName: null, password: null, email: null, job: { type: null, company: null, companyUrl: null } },
                        userupd: { userName: null, firstName: null, lastName: null, password: null, email: null, job: { type: null, company: null, companyUrl: null } },
                        updatekey: null
                      
                    })
                }}
                    title="Refresh"
                />
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