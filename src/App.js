
import './App.css';
import NavBar from './components/NavBar';
import News from './components/News';

function App() {
  return (
    <div className="App">
      <NavBar/>
      <News pageSize={6} cat="sports"/>
    </div>
  );
}

export default App;
