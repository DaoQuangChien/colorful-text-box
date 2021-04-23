import logo from "./logo.svg";
import "./App.css";
import ColorfulTextBox from "./colorful-text-box";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <h1 className="title">Colorful Textbox</h1>
        <ColorfulTextBox />
      </header>
    </div>
  );
}

export default App;
