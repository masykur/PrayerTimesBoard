import logo from './logo.svg';
import './App.css';
import Schedule from './Schedule';
import Calendar from './Calendar';
import { Coordinates, CalculationMethod, PrayerTimes } from 'adhan';
import { format, add, formatDistanceToNow } from 'date-fns'
import { id } from 'date-fns/locale'
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
        <Calendar className="calendar"></Calendar>
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
        <Schedule className="schedule" prayerTimes={prayerTimes}>
        </Schedule>
      </div>
      <footer className='marquee'>
        <p>Matikan handphone atau ubah ke mode hening ketika berada di dalam masjid</p>
      </footer>
    </div>
  );
}
const schedule = {
    date: new Date(),
    params: CalculationMethod.MoonsightingCommittee(),
    coordinates: new Coordinates(-6.211498, 107.021309),
    now: new Date(),
    nextPrayer: null,
    nextPrayerTime: new Date()
};
const prayerTimes = new PrayerTimes(schedule.coordinates, schedule.date, schedule.params);
console.info(prayerTimes);
export default App;
