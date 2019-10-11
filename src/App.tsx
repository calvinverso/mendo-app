import React from 'react';
import logo from './logo.svg';
import './App.css';
//import axios from 'axios';
//import { Link, BrowserRouter } from 'react-router-dom'


const App: React.FC = () => {

  /*
  const [user, setUser] = React.useState(null);
  React.useEffect(() => {
    axios.get('/api')
      .then(response => {
        setUser(response.data)
      })
  }, [])

  function handleLogin() {
    axios.get('/login').then(res => console.log("did it do something?"))
  }
*/
function handleLogin() {
  if (process.env.NODE_ENV === "production" ) {
    window.location.href = "http://mendo-server.herokuapp.com/login"
  } else { 
    window.location.href = "http://localhost:8888/login"
  }
}

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          hey, user
        </p>

        <button type="button" className="btn btn-info" onClick={handleLogin}>Login</button>

        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
