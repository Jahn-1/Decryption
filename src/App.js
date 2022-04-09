import './App.css';
import Game from './Components/Game/Game';
import Header from './Components/Header/Header';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import Home from './Components/Home/Home';
import { initializeApp } from "firebase/app";
import { firebaseConfig } from './firebase';
import AddToGame from './Components/AddToGame/AddToGame';
import Decode from './Components/Decode/Decode';


function App() {
  initializeApp(firebaseConfig)
  return (
    <Router>
      <Header />
      <Routes>
        <Route path='/decode' element={ <Decode />} />
        <Route path='/game/play' element={ <Game />} />
        <Route path='/game/add' element={ <AddToGame />} />
        <Route exact path='/' element={ <Home />} />
      </Routes>
    </Router>
  );
}

export default App;
