import { Container, Button, ButtonGroup } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import Image from 'react-bootstrap/Image';
import React,{Component} from 'react';
import './Search.css';
import { useForm } from "react-hook-form";

const SearchByAudio = () => {
    const [songsArr, setSongs] = React.useState([])
    const [set, setT] = React.useState(false)
    let songNames=[]
    const { register, handleSubmit } = useForm();

    const onSubmit = async (data) => {
        const formData = new FormData();
        // Update the formData object
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
        const response = await fetch('http://localhost:4000/search/findByAudio', requestOptions);
        const data1 = await response.json();
        let a=data1
        let arr=[]
        for (const e of a){
            console.log(e._id)
            arr.push(e._id)
        }
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

                        <p className="Name">{data.metadata.songName}</p>
                        <p className="Artist">{data.metadata.artist}</p>
                    </Container>
                </div>
                ]);
                console.log(element.toString())
                songNames.push(element.toString())
            }
            //console.log(data)
            console.log(songNames)
        }

    };

    return  (
        <div className="Library">
            <Container fluid>
                <div className="libraryButtonGroup">
                    <ButtonGroup>
                        <div className="">
                            <Button className="bg-transparent " href="/library/likes" variant="link">Likes</Button>
                            <Button className="bg-transparent " href="/library/playlists" variant="link">Playlists</Button>
                            <Button className="bg-transparent " href="/library/following" variant="link">Following</Button>
                        </div>
                    </ButtonGroup>
                </div>
            </Container>
            <hr style={{ width: "100%"}} />
            <div>
                <h3>Select File to Search From</h3>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <input type="file" {...register("file")} />

                    <input type="submit" />
                </form>
            </div>
            <div>{songsArr}</div>
        </div>
    )
}

export default SearchByAudio;