import { Container, Button, ButtonGroup } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Likes.css'
import Image from 'react-bootstrap/Image';
import React,{Component} from 'react';



const Likes = () => {
    const [songsArr, setSongs] = React.useState([])
    const [set, setT] = React.useState(false)
    let songNames=[]
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

            let arr=data.likes
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
                    setSongs(songsArr => [...songsArr, <div className="SmallMusicBox" key={element}>
                            <Container>
                                <Button href={"/music/"+data._id}>
                                    <Image width="200" height="200" src={img} fluid />
                                </Button>

                                <p>{data.metadata.songName}</p>
                                <p>{data.metadata.artist}</p>
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

        if (!set) {
            getImages()
            setT(true)
        }
    }, )

    return  (
    <div className="Library">
        <Container fluid>
            <div className="libraryButtonGroup">
                <ButtonGroup>
                    <div className="libraryButton">
                        <Button className="bg-transparent " href="/library/overview" variant="link">Overview</Button>
                    </div>

                    <div className="libraryButtonSelected">
                        <Button className="bg-transparent " href="/library/likes" variant="link">Likes</Button>
                    </div>
                    <div className="libraryButton">
                        <Button className="bg-transparent " href="/library/playlists" variant="link">Playlists</Button>
                        <Button className="bg-transparent " href="/library/following" variant="link">Following</Button>
                    </div>
                </ButtonGroup>
            </div>
        </Container>
        <hr style={{ width: "100%"}} />
        <div>{songsArr}</div>
    </div>
    )
}

export default Likes;