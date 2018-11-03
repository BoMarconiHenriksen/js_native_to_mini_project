import React, { Component } from "react"




const URL = 'https://miniprojectfsjsbebop.herokuapp.com/api/';

class loginFacade extends Component {

    login = (username, password, latitude, longitude, distance) => {
        fetch(URL + "login", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            }, body: JSON.stringify({
                userName: username,
                password: password,
                latitude: latitude,
                longitude: longitude,
                distance: distance
            }),
        }).then((response) => response.json())
            .then((responseJson) => {
                console.log(responseJson)
                return responseJson;
            })
            .catch((error) => {
                console.error(error);
            });

        
        
           
    }
}



const loginfacade = new loginFacade();

export default loginfacade