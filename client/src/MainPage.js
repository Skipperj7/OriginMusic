import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ProfileHome from './Components/Profile/Home/ProfileMain.js';
import MainNavbar from './Components/NavBar/MainNavbar.js';
import Home from './Components/Home/Home.js'
import Likes from './Components/Library/Likes/Likes';
import Playlists from './Components/Library/Playlists/Playlists';
import Following from './Components/Library/Following/Following';
import Login from './Components/Login/Login.js';
import Upload from './Components/Upload/Upload';
import AudioPlayer from "./Components/Music Player/AudioPlayer";
import Search from "./Components/Search/Search";
import SearchByAudio from "./Components/Search/SearchByAudio";

function MainPage() {
    return (
    <div>
        {/* example NavBar */}
        <MainNavbar/>
        <BrowserRouter>
            {/* used to be called Switch - see https://stackoverflow.com/questions/63124161/attempted-import-error-switch-is-not-exported-from-react-router-dom */}
            <Routes>
                <Route path='/' element={<Home/>} />
                <Route path='/upload' element={<Upload/>} />
                <Route path='/library/likes' element={<Likes/>}/>
                <Route path='/library/playlists' element={<Playlists/>}/>
                <Route path='/library/following' element={<Following/>}/>
                <Route path='/profile/home' element={<ProfileHome/>}/>
                <Route path='/music/:id' element={<AudioPlayer/>}/>
                <Route path='/search/:name' element={<Search/>}/>
                <Route path='/searchByAudio' element={<SearchByAudio/>}/>
                {/* <Route path='/about' component={Contact}/> */}
            </Routes>
        </BrowserRouter>
            </div>
);
}
export default MainPage;