import React, {
  Component,
  createContext
} from "react";
import {
  Constants,
  Location,
  Permissions,
  MapView,
  Marker
} from "expo";

// https://www.youtube.com/watch?v=XLJN4JfniH4&t=194s

const URL = "https://miniprojectfsjsbebop.herokuapp.com/api/";

class loginFacade { // extends Component
  /* constructor(props) {
    super(props);
    this.state = {
      // userName, password and distance stores the text input.
      // userName: "",
      // password: "",
      message: "",
      distance: null,
      // Is used for get location.
      latitude: null,
      longitude: null,
      location: [],
      // Is used to show the user on a map.
      markers: [{ username: "as", latitude: 57, longitude: 12 }],
      region: []
    };
  } */

  login = async (username, password, latitude, longitude, distance) => {
    try {
      await fetch(URL + "login", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userName: username,
          password: password,
          latitude: latitude,
          longitude: longitude,
          distance: distance
        }),
      });
      let responseJson = await response.json();
      console.log(responseJson)
      this.setState({
        markers: responseJson.friends,
        loggedIn: true
      });
      return responseJson.friends;
    } catch (error) {
      console.log(error);
    };

    /* .then(this.checkStatus)
      .then((response) => response.json())
      .then((responseJson) => {
        console.log(responseJson)
        this.setState({ markers: responseJson.friends })
        this.setState({ loggedIn: true });
        return responseJson.friends;
      })
      .catch((error) => {
        console.error(error);
      });
  }; */

    // Check the response for error and show message.
    /* checkStatus(response) {
      if (response.ok) {
        return response;
      }

      let error = new Error(response.StatusText);
      error.response = response;
      return Promise.reject(error);
    }; */

    _getLocationAsync = async () => {
      let {
        status
      } = await Permissions.askAsync(Permissions.LOCATION);
      if (status !== "granted") {
        return "Permission to access location was denied";
      }

      return await Location.getCurrentPositionAsync({});
    };
  }

  /* findFriendsOnMap = (userName, password, latitude,
      longitude, distance) => {
      let friends = loginfacade.login(userName, password, latitude,
        longitude, distance);
      console.log('FRIENDS ' + friends);
      return friends;
    } */

  /*   if (responseJson.error) { // ???
      return this.setState({message: response.status});
  } else {
      //console.log(responseJson.friends)
      return responseJson.friends;
  } */

  const loginfacade = new loginFacade();

  export default loginfacade;