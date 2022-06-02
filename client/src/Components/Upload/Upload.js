import React,{Component,useState} from 'react';
import "./Upload.css";
class Upload extends Component {

    state = {

        // Initially, no file is selected
        selectedFile: null,
        name: '',
        image:null,
        imageURL:null
    };



    onImageChange = (event) => {
        if (event.target.files && event.target.files[0]) {
            let reader = new FileReader();
            console.log(event.target.files[0])
            reader.onload = (e) => {
                this.setState({image: e.target.result});
            };
            this.setState({imageURL: event.target.files[0]});
            reader.readAsDataURL(event.target.files[0]);
        }
    }

    // On file select (from the pop up)
    onFileChange = event => {

        // Update the state
        this.setState({ selectedFile: event.target.files[0] });

    };
    onTextChange = event => {

        // Update the state
        this.setState({ name: event.target.value });

    };

    // On file upload (click the upload button)
    onFileUpload = async () => {

        // Create an object of formData
        const formData = new FormData();

        // Update the formData object
        formData.append("songName",this.state.name);
        formData.append("file",this.state.selectedFile);

        // Details of the uploaded file
        // Request made to the backend api
        // Send formData object

        // POST request using fetch with async/await
        const requestOptions = {
            credentials: 'include',
            method: 'POST',
            body: formData
        };
        const response = await fetch('http://localhost:4000/upload/', requestOptions);
        const data = await response.json();


        // Create an object of formData
        const formData2 = new FormData();

        // Update the formData object
        formData2.append("songName",data.file.id);
        formData2.append("file",this.state.imageURL);

        // Details of the uploaded file
        // Request made to the backend api
        // Send formData object

        // POST request using fetch with async/await
        const requestOptions2 = {
            credentials: 'include',
            method: 'POST',
            body: formData2
        };
        const response2 = await fetch('http://localhost:4000/images/', requestOptions2);
        const data2 = await response2.json();
        console.log(data)
        console.log(data2)
        window.location.href='/music/'+data.file.id
    };


    // File content to be displayed after
    // file upload is complete
    fileData = () => {

        if (this.state.selectedFile) {

            return (
                <div>
                    <h2>File Details:</h2>

                    <p>File Name: {this.state.selectedFile.name}</p>


                    <p>File Type: {this.state.selectedFile.type}</p>


                    <p>
                        Last Modified:{" "}
                        {this.state.selectedFile.lastModifiedDate.toDateString()}
                    </p>

                </div>
            );
        } else {
            return (
                <div>
                    <br />
                    <h4>Choose before Pressing the Upload button</h4>
                </div>
            );
        }
    };

    render() {

        return (
            <div>
                <h1>
                    Upload
                </h1>

                <div>
                    <h4>Select mp3 audio file</h4>
                    <input className="pad" type="file"  onChange={this.onFileChange} />

                    <div className="pad">
                        <input type="file" onChange={this.onImageChange} />
                        <h4>Select png image file</h4>
                        <img width="200" height="200" src={this.state.image}/>
                    </div>
                    <h4>Song Name</h4>
                    <input type="text" value={this.state.name} onChange={this.onTextChange} />
                    <button className="sbt" onClick={this.onFileUpload}>
                        Upload!
                    </button>
                </div>
                {this.fileData()}
            </div>
        );
    }
}

export default Upload;
