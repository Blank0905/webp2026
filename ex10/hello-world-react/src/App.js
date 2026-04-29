import logo from './logo.svg';
import './App.css';

const styleA = {fontSize:'100px', color:'red'};

function App() {
  return (
    <div className="App">
      <h1 style = {styleA} onClick = {changeText}>hello CGU!!</h1>
    </div>
  );
}

const changeText=(event) =>{
  console.log(event.target);
  event.target.innerText = event.target.innerText + "被點了";

}

export default App;
