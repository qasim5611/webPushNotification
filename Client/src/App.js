import logo from './logo.svg';
import './App.css';
import { send } from "./utils/Push";


function App() {
  return (
    <div className="App">
      <header className="App-header">
      <h3 className="txt">Check Web Push Notification Now By React NodeJs App</h3>
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <button onClick={send} className="btn">Show Now</button>
      </header>
    </div>
  );
}

export default App;
