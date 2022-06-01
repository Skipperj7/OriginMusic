import logo from '../../logo.svg';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../../App.css';
import { ReactComponent as Logo } from "./assets/logo2.svg";

// example Home for now
function Home() {
    return (
      <div className="App">
        <header className="App-header">
            <Logo/>
          <h1>Welcome to Origin Music</h1>
        </header>
      </div>
    );
  }
  
  export default Home;