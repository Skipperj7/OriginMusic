import React, { useState, useEffect, useRef } from "react";
import AudioControls from "./AudioControls";
import Comments from "./Comments";
import "./styles.css";
import {useParams} from "react-router-dom";

/*
 * Read the blog post here:
 * https://letsbuildui.dev/articles/building-an-audio-player-with-react-hooks
 */
const AudioPlayer = () => {
    // State
    const [trackIndex, setTrackIndex] = useState(0);
    const [trackProgress, setTrackProgress] = useState(0);
    const [isPlaying, setIsPlaying] = useState(false);
    const {id} = useParams()

    // Destructure for conciseness
    //const { title, artist, color, image, audioSrc } = tracks[trackIndex];

    // Refs
    const audioRef = useRef(new Audio("http://localhost:4000/upload/audio/" + id + ".mp3"));//audiosrc is a url to the mp3 file
    const intervalRef = useRef();
    const isReady = useRef(false);

    // Destructure for conciseness
    const {duration} = audioRef.current;

    const currentPercentage = duration
        ? `${(trackProgress / duration) * 100}%`
        : "0%";
    const trackStyling = `
    -webkit-gradient(linear, 0% 0%, 100% 0%, color-stop(${currentPercentage}, #fff), color-stop(${currentPercentage}, #777))
  `;

    const startTimer = () => {
        // Clear any timers already running
        clearInterval(intervalRef.current);

        intervalRef.current = setInterval(() => {
            if (audioRef.current.ended) {

            } else {
                setTrackProgress(audioRef.current.currentTime);
            }
        }, [1000]);
    };

    const onScrub = (value) => {
        // Clear any timers already running
        clearInterval(intervalRef.current);
        audioRef.current.currentTime = value;
        setTrackProgress(audioRef.current.currentTime);
    };

    const onScrubEnd = () => {
        // If not already playing, start


    };

    const toPrevTrack = async () => {
        // POST request using fetch with async/await
        const requestOptions = {
            credentials: 'include',
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({songID: id})
        };
        const response = await fetch('http://localhost:4000/collections/like', requestOptions);
        const data = await response.json();
        console.log(data)
    };

    const toNextTrack = async () => {
        const requestOptions = {
            credentials: 'include',
            method: 'GET',
        };
        const response = await fetch('http://localhost:4000/user/me', requestOptions);
        const data = await response.json();
        console.log(data)
        let PID
        if(data.playlistIDs.length == 0){
            const requestOptions2 = {
                credentials: 'include',
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({title: "My playlist"})
            };
            const response2 = await fetch('http://localhost:4000/collections/createPlaylist', requestOptions2);
             const data2 = await response2.json();
             PID=data2.pID
            console.log(data)
        }
        else{
            PID=data.playlistIDs[0]
        }

// POST request using fetch with async/await
        const requestOptions2 = {
            credentials: 'include',
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({songID: id, playlistID:PID})
        };
        const response2 = await fetch('http://localhost:4000/collections/playlist/addsong', requestOptions2);
        const data2 = await response2.json();
        console.log(data2)
    };

     async function follow() {
// POST request using fetch with async/await
        const requestOptions = {
            credentials: 'include',
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({artistName: artist})
        };
        const response = await fetch('http://localhost:4000/collections/follow', requestOptions);
        const data = await response.json();
        console.log(data)
         setFollowing(!following)
    }

    useEffect(() => {
        if (isPlaying && audioRef.current.paused) {
            setTimeout(async function () {
                audioRef.current.play();
                startTimer();
            }, 50);
        } else {
            audioRef.current.pause();
        }
    }, [isPlaying]);

    // Handles cleanup and setup when changing tracks
    useEffect(() => {
        audioRef.current.pause();
        audioRef.current = new Audio("http://localhost:4000/upload/audio/" + id + ".mp3");
        setTrackProgress(audioRef.current.currentTime);

        isReady.current = true;

    }, [trackIndex]);

    useEffect(() => {
        // Pause and clean up on unmount
        return () => {
            audioRef.current.pause();
            clearInterval(intervalRef.current);
        };
    }, []);


    const [images, setImages] = React.useState("")
    const [songname, setsong] = React.useState("")
    const [artist, setartist] = React.useState("")
    const [following, setFollowing] = React.useState(false)
    const [got,setgot] = React.useState(false)

    async function getItems()
    {
        const requestOptions = {
            credentials: 'include',
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({songID: id})
        };
        const response = await fetch('http://localhost:4000/upload/song', requestOptions);
         let data = await response.json();
         setsong(data.metadata.songName)
        setartist(data.metadata.artist)

        const requestOptions2 = {
            credentials: 'include',
            method: 'GET',

        };
        const response2 = await fetch('http://localhost:4000/images/image/' + id + ".png", requestOptions2).then((res) => res.blob());
         let img = await URL.createObjectURL(response2)
        setImages(img)
        console.log(data) //checky way to force render

        const requestOptions3 = {
            credentials: 'include',
            method: 'GET',

        };
        const response3 = await fetch('http://localhost:4000/user/me',requestOptions3);
        const data3=await response3.json();
        setFollowing(data3.following.includes(data.metadata.artist))

    }
    if (!got) {
        getItems()
        setgot(true)
    }

    return (
        <div>
        <div className="audio-player">
            <div className="track-info">
                <img
                    className="artwork"
                    src={images}
                />
                <h2 className="title">{songname}</h2>
                <h3 className="artist" >{artist}</h3>
                <AudioControls
                    isPlaying={isPlaying}
                    onPrevClick={toPrevTrack}
                    onNextClick={toNextTrack}
                    onPlayPauseClick={setIsPlaying}
                    id={id}
                />
                <input
                    type="range"
                    value={trackProgress}
                    step="1"
                    min="0"
                    max={duration ? duration : `${duration}`}
                    className="progress"
                    onChange={(e) => onScrub(e.target.value)}
                    onMouseUp={onScrubEnd}
                    onKeyUp={onScrubEnd}
                    style={{background: trackStyling}}
                />
            </div>
            <div>
                <button onClick={follow}>{following?"Following":"Follow"} {artist}</button>
            </div>
        </div>

    <div>
        <Comments
        id={id}
        />
    </div>
        </div>
    );
};

export default AudioPlayer;
