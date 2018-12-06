import React from 'react';
import { Text, View, StyleSheet, ScrollView, TextInput, Button } from 'react-native';
import GetUserByUserName from '../apollo/GetUserByUserName';

export default class EditUserScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
          userName: null,
        };
    
      };

    render() {
        let _input;

        return (
            <ScrollView>
                
                
                <View style={styles.title}>
                    <Text>Edit users.</Text>
                </View>

               
                <TextInput style={styles.textinput} onChangeText={(username) => _input = username}/>
                <Button onPress={ () => this.setState({userName: _input}) } title="Get a user by username"/> 
                
               
                {this.state.userName != null &&
                    <GetUserByUserName userName={this.state.userName}/>
                }
                
                
            </ScrollView>
        );
    };
};
// <TextInput style={styles.textinput} onChangeText={(username) => this.setState({ userName: username })} value={this.state.userName}  />
// <GetUserByUserName /> onPress={ render = { () => <GetUserByUserName />} }
// this.login(this.state.userName)
{/* <TextInput ref={node => { input = node; }} /> */}

const styles = StyleSheet.create({
    container: {
      flex: 4,
      backgroundColor: '#Fffffd',
    },
    textinput: {
        padding: 5, width: 200, fontSize: 18
      },
});
