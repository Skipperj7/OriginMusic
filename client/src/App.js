import 'bootstrap/dist/css/bootstrap.min.css';
import './Components/NavBar/MainNavbar.js';
import React, { useReducer } from 'react';
import MainNavbar from './Components/NavBar/MainNavbar.js';
import Home from './Components/Home/Home.js'
import ProfileHome from './Components/Profile/Home/ProfileMain.js';
import Library from './Components/Library/Library.js';
import Likes from './Components/Library/Likes/Likes';
import Playlists from './Components/Library/Playlists/Playlists';
import Following from './Components/Library/Following/Following';
import Login from './Components/Login/Login.js';
import MainPage from './MainPage.js';

import { AuthContext } from './context.js';

const initialState = {
  isAuthenticated: false,
  user: null,
  token: null
};

const reducer = (state, action) => {
  console.log("Reducer called!!!"); // debug
  // cannot modify existing state, only make a newState and return it
  let newState = {...state};
  newState.token = localStorage.getItem('token');
  newState.isAuthenticated = !!localStorage.getItem('token');
  switch(action.type){
    case "LOGIN":
      // update local storage with tokens originally from fetch
      localStorage.setItem("token", JSON.stringify(action.payload.token));
      localStorage.setItem("email", JSON.stringify(action.payload.email));

      // update newState
      newState = {
        isAuthenticated: true,
        token: action.payload.token
      };
      break;
    case "LOGOUT":
      localStorage.clear();
      // clear local storage
      // update newState
      newState = {

      }
      break;
    default:
      // nothing
  }
  return newState;
};

function App() {
  const [state, dispatch] = useReducer(reducer, initialState);

  // If we have a token, then the user must be authenticated
  // im sure this is a scuffed solution to a basic problem
  // but without this the, any link change redirects to login
  state.isAuthenticated = !!localStorage.getItem('token');

  console.log(state.user);

  return (
    <AuthContext.Provider value=
    {{
      state,
      dispatch
    }}>
    <div className="MainApp">{!state.isAuthenticated ? <Login /> : <MainPage/>} </div>
    </AuthContext.Provider>
  );
}

export default App;
