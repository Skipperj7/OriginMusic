import 'bootstrap/dist/css/bootstrap.min.css';
import './Components/NavBar/MainNavbar.js';
import { createContext, useReducer } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainNavbar from './Components/NavBar/MainNavbar.js';
import Home from './Components/Home/Home.js'
import ProfileHome from './Components/Profile/Home/ProfileMain.js';
import Library from './Components/Library/Library.js';
import Login from './Components/Login/Login.js';

export const AuthContext = createContext();
const initialState = {
  isAuthenticated: false,
  user: null,
  token: null
};

const reducer = (state, action) => {
  console.log("Reducer called!!!"); // debug
  // cannot modify existing state, only make a newState and return it
  let newState = {...state};
  switch(action.type){
    case "LOGIN":
      // update local storage
      // update newState
      break;
    case "LOGOUT":
      // clear local storage
      // update newState
      break;
    default:
      // nothing
  }
  return newState;
};

function App() {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <AuthContext.Provider value=
    {{
      state,
      dispatch
    }}>
    <div className="MainApp">{!state.isAuthenticated ? <Login /> :
    <div>
    {/* example NavBar */}
    <MainNavbar/>
    <BrowserRouter>
            {/* used to be called Switch - see https://stackoverflow.com/questions/63124161/attempted-import-error-switch-is-not-exported-from-react-router-dom */}
            <Routes>
              <Route path='/' element={<Home/>} />
              <Route path='/library' element={<Library/>}/>
              <Route path='/profile/home' element={<ProfileHome/>}/>
                {/* <Route path='/about' component={Contact}/> */}
            </Routes>
        </BrowserRouter>
        </div>
    }
    </div>
    </AuthContext.Provider>
  );
}

export default App;
