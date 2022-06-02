import React from "react";
import { ReactComponent as Play } from "./assets/play.svg";
import { ReactComponent as Pause } from "./assets/pause.svg";
import { ReactComponent as Next } from "./assets/next.svg";
import { ReactComponent as Prev } from "./assets/prev.svg";
import {useState} from "react";

const AudioControls = ({
                           isPlaying,
                           onPlayPauseClick,
                           onPrevClick,
                           onNextClick,
    id
                       }) => {

    const [heart, setHeart] = React.useState(false)
    const [playlist, setPlaylist] = React.useState(false)
    const [got,setgot] = React.useState(false)
    async function getItems()
    {

        const requestOptions3 = {
            credentials: 'include',
            method: 'GET',

        };
        const response3 = await fetch('http://localhost:4000/user/me',requestOptions3);
        const data3=await response3.json();
        setHeart(data3.likes.includes(id))
        if(data3.playlistIDs.length!==0) {
            const requestOptions2 = {
                credentials: 'include',
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({playlistID: data3.playlistIDs[0]})
            };
            const response2 = await fetch('http://localhost:4000/collections/playlist/', requestOptions2);
            const data2 = await response2.json();
            setPlaylist(data2.songs.includes(id))
        }
    }
    if (!got) {
        getItems()
        setgot(true)
    }

    return(
        <div className="audio-controls">
            <button
                type="button"
                className={heart ? "prev red":"prev black"}
                aria-label="Previous"
                onClick={()=>{onPrevClick();setHeart(!heart);}}

            >
                <Prev />
            </button>
            {isPlaying ? (
                <button
                    type="button"
                    className="pause"
                    onClick={() => onPlayPauseClick(false)}
                    aria-label="Pause"
                >
                    <Pause />
                </button>
            ) : (
                <button
                    type="button"
                    className="play"
                    onClick={() => onPlayPauseClick(true)}
                    aria-label="Play"
                >
                    <Play />
                </button>
            )}
            <button
                type="button"
                className={playlist ? "next red":"next black"}
                aria-label="Next"
                onClick={()=>{onNextClick();setPlaylist(!playlist)}}
            >
                <Next />
            </button>
        </div>
    );
}

export default AudioControls;
