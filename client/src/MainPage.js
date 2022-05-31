import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ProfileHome from './Components/Profile/Home/ProfileMain.js';
import Library from './Components/Library/Library.js';
import MainNavbar from './Components/NavBar/MainNavbar.js';
import Home from './Components/Home/Home.js'
import Likes from './Components/Library/Likes/Likes';
import Playlists from './Components/Library/Playlists/Playlists';
import Following from './Components/Library/Following/Following';
import Login from './Components/Login/Login.js';
import Upload from './Components/Upload/Upload';
import AudioPlayer from "./Components/Music Player/AudioPlayer";

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
                <Route path='/library/overview' element={<Library/>}/>
                <Route path='/library/likes' element={<Likes/>}/>
                <Route path='/library/playlists' element={<Playlists/>}/>
                <Route path='/library/following' element={<Following/>}/>
                <Route path='/profile/home' element={<ProfileHome/>}/>
                <Route path='/music' element={<AudioPlayer tracks={ [{
                    title: "Cali",
                    artist: "Wataboi",
                    audioSrc: "http://localhost:4000/upload/audio/a60fe3efdf786fcd9cce3c8a30d07da0.mp3",
                    image: "http://localhost:4000/images/image/a60fe3efdf786fcd9cce3c8a30d07da0.png",
                    color: "#00aeb0"
                }]} />}/>
                {/* <Route path='/about' component={Contact}/> */}
            </Routes>
        </BrowserRouter>
            </div>
);
}
export default MainPage;