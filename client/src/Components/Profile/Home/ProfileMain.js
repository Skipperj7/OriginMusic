import Image from 'react-bootstrap/Image';
import React,{Component} from 'react';
import { useContext } from 'react';
import { AuthContext } from '../../../context.js';
import {forEach} from "react-bootstrap/ElementChildren";
import { useForm } from "react-hook-form";
import {Button, Container} from "react-bootstrap";
import "./profile.css";

const ProfileMain = () => {
    const [images, setImages] = React.useState("")
    const [username, setUser] = React.useState("")
    const [email, setUserEmail] = React.useState("")
    const [songsArr, setSongs] = React.useState([])
    let songNames=[]
    const { register, handleSubmit } = useForm();

    function makeid(length) {
        var result           = '';
        var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        var charactersLength = characters.length;
        for ( var i = 0; i < length; i++ ) {
            result += characters.charAt(Math.floor(Math.random() *
                charactersLength));
        }
        return result;
    }

    const onSubmit = async (data) => {
        const requestOptions3 = {
            credentials: 'include',
            method: 'GET',
        };
        const response3 = await fetch('http://localhost:4000/user/me', requestOptions3);
        const data3 = await response3.json();
        // Create an object of formData
        const formData = new FormData();
        let id=makeid(16)
        // Update the formData object
        formData.append("songName",id);
        formData.append("file", data.file[0]);

        // Details of the uploaded file
        // Request made to the backend api
        // Send formData object

        // POST request using fetch with async/await
        const requestOptions = {
            credentials: 'include',
            method: 'POST',
            body: formData
        };
        const response = await fetch('http://localhost:4000/images/', requestOptions);
        const data1 = await response.json();

        const requestOptions5 = {
            credentials: 'include',
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({profilePic:id})
        };
        const response5 = await fetch('http://localhost:4000/user/changePic', requestOptions5);
        const data5 = await response5.json();
        // Create an object of formData

        const requestOptions2 = {
            credentials: 'include',
            method: 'GET',
        };
        const response2 = await fetch('http://localhost:4000/images/image/'+data.profilePic+".png", requestOptions2).then ((res) => res.blob());
        console.log(response2)
        //imageArray.push(await getImage(data.profilePic))
        console.log(URL.createObjectURL(response2))
        setImages(URL.createObjectURL(response2))
        console.log(data5)
        window.location.reload(false);
    };

    React.useEffect(() => {
        async function getImages () {
            // POST request using fetch with async/await
            const requestOptions = {
                credentials: 'include',
                method: 'GET',
            };
            const response = await fetch('http://localhost:4000/user/me', requestOptions);
            const data = await response.json();
            console.log(data)
            const imageArray = []
            // POST request using fetch with async/await
            const requestOptions2 = {
                credentials: 'include',
                method: 'GET',

            };
            const response2 = await fetch('http://localhost:4000/images/image/'+data.profilePic+".png", requestOptions2).then ((res) => res.blob());
            console.log(response2)
            //imageArray.push(await getImage(data.profilePic))
            console.log(URL.createObjectURL(response2))
            setImages(URL.createObjectURL(response2))
            setUser(data.username)
            setUserEmail(data.email)
            let arr=data.uploadedSongs
            for (const element of arr) {
                const requestOptions = {
                    credentials: 'include',
                    method: 'POST',
                    headers: {'Content-Type': 'application/json'},
                    body: JSON.stringify({songID:element})
                };
                const response = await fetch('http://localhost:4000/upload/song', requestOptions);
                const data = await response.json();
                const requestOptions2 = {
                    credentials: 'include',
                    method: 'GET',

                };
                console.log(data._id)
                const response2 = await fetch('http://localhost:4000/images/image/'+data._id+".png", requestOptions2).then ((res) => res.blob());
                console.log(response2)
                let img= await  URL.createObjectURL(response2)
                //songsArr=songsArr.filter((value,index)=>data.indexOf(value)==index)
                if(!songNames.includes(element.toString())) {
                    setSongs(songsArr => [...songsArr, <div className="child" key={element}>
                        <Container>
                            <Button href={"/music/"+data._id}>
                                <Image width="200" height="200" src={img} fluid />
                            </Button>
                            <div>
                                <p className="Name">{data.metadata.songName}</p>
                            </div>
                        </Container>
                    </div>
                    ]);
                    console.log(element.toString())
                    songNames.push(element.toString())
                }
                //console.log(data)
                console.log(songNames)
            }
        }

        if (!images) {
            getImages()
        }
    }, )

    return  (
    <div>
        <div>
        <Image width="400" height="400"
               src={images}
               rounded={true}></Image>

            <form onSubmit={handleSubmit(onSubmit)}>
                <input type="file" {...register("file")} />

                <input type="submit" />
            </form>
        </div>
        <p className="usrn">{username}</p>
        <p className="email">{email}</p>
        <p className="mysongs">My Songs</p>
        <div className="wrapper">
        <div>{songsArr}</div>
        </div>
    </div>
)
}


export default ProfileMain;