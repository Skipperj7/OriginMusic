import Image from 'react-bootstrap/Image';
import { useContext } from 'react';
import { AuthContext } from '../../../context.js';


function ProfileMain() {
    const authContextValue = useContext(AuthContext);

    // gather variables from authContextValue - this is a little scuffed
    const isAuthenticated = authContextValue.state.isAuthenticated;
    const dispatch = authContextValue.dispatch;

    return (
        <div>
        <p>Profile pic goes here</p>
        <Image width="300" height="300" src="data:image/jpeg;base64,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" rounded={true}></Image>
        <p>Username goes here</p>
        <p>Other information here</p>
        </div>
    );

}


export default ProfileMain;