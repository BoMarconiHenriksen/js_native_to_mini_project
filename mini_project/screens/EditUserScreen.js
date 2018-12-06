import React from 'react';
import { Text, View, StyleSheet, ScrollView, TextInput, Button } from 'react-native';
import GetUserByUserName from '../apollo/GetUserByUserName';
import DeleteUser from '../apollo/DeleteUser';

export default class EditUserScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
          userName: null,
          id: null,
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
                <TextInput style={styles.textinput} onChangeText={(username) => _input = username}/>
                <Button onPress={ () => this.setState({userName: _input}) } title="Get a user by username"/> 
                
                {/* Show the result of GetUserByName component. */}
                {this.state.userName != null &&
                    <GetUserByUserName userName={this.state.userName}/>
                }
                
                {/* Delete user input and button. */}
                <Text>Delete User</Text>
                <TextInput style={styles.textinput} onChangeText={(id) => _input = id}/>
                <Button onPress={ () => this.setState({id: _input}) } title="Delete a user"/> 
                
                {/* Show the result of GetUserByName component. */}
                {this.state.id != null &&
                    <DeleteUser id={this.state.id}/>
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
