import logo from './logo.svg';
import './App.css';
//import car from '..//images/car.jpg'; // gives image path

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <div className="title">
          <div className="logo">
            <img src={process.env.PUBLIC_URL + "/logo.png"} alt="logo" />
          </div>
          <div>
            <div>Aplikasi Jadwal Salat oleh Aufi dan Jihan</div>
            <h2>Masjid SMAI Al-Azhar 8</h2>
            <h2>Kota Bekasi</h2>
            <p>Jl. Bulevar Utara Blok L Summarecon Bekasi, Kota Bekasi 17142</p>
          </div>
        </div>
        <div className="calendar">

        </div>
        {/* <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a> */}
      </header>
      <div className="content">
        <div>

        </div>
        <div className="schedule">123</div>
      </div>
      <footer>
      Matikan handphone atau ubah ke mode hening ketika berada di dalam masjid
      </footer>
    </div>
  );
}

export default App;
