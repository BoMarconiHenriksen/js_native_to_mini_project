import React, { Component } from "react"
import { Constants, Location, Permissions ,MapView,Marker} from 'expo';



const URL = 'https://miniprojectfsjsbebop.herokuapp.com/api/';

class loginFacade extends Component {

    login =async (username, password, latitude, longitude, distance) => {
       await fetch(URL + "login", {
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
               console.log(responseJson.friends)
                return responseJson.friends;
            })
            .catch((error) => {
                console.error(error);
            });

        
        
           
    }


     
 _getLocationAsync = async () => {

    let { status } = await Permissions.askAsync(Permissions.LOCATION);
    if (status !== 'granted') {
  return   'Permission to access location was denied'
      }

 return await Location.getCurrentPositionAsync({});
 
}}



const loginfacade = new loginFacade();

export default loginfacade