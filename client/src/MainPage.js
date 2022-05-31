import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainNavbar from './Components/NavBar/MainNavbar.js';
import Home from './Components/Home/Home.js'
import ProfileHome from './Components/Profile/Home/ProfileMain.js';
import Library from './Components/Library/Library.js';

function MainPage() {
    return (
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
);
}
export default MainPage;