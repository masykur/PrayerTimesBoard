import React from 'react';
import { format, add, formatDistanceStrict } from 'date-fns'
import { id } from 'date-fns/locale'
import { Coordinates, CalculationMethod, PrayerTimes } from 'adhan';
import './Calendar.css'

class Calendar extends React.Component {
    constructor(props) {
      super(props);
        this.state = {now: new Date(), nextPrayer: 'none', nextPrayerTime: new Date()};
    }
    
    componentDidMount() {
        this.timerID = setInterval(
            () => this.tick(),
            1000
        );
    }
    
    componentWillUnmount() {
        clearInterval(this.timerID);
    }

    tick() {
        const now = new Date();
        const coordinates = new Coordinates(-6.211498, 107.021309);
        const params = CalculationMethod.MoonsightingCommittee();    
          var prayerTimes = new PrayerTimes(coordinates, now, params);
        var next = prayerTimes.nextPrayer();
        var nextPrayerTime;
        if (next === 'none') {
          var nextPrayerTimes = new PrayerTimes(coordinates, add(now, { days: 1}), params);
          next = nextPrayerTimes.nextPrayer();
          nextPrayerTime = nextPrayerTimes.timeForPrayer(next);
        } else {
            var nextPrayerTime = prayerTimes.timeForPrayer(next);
        }
        this.setState({
          now: new Date(),
          nextPrayer: next,
          nextPrayerTime: nextPrayerTime
        });
    }

    formatDistance(date, baseDate) {
        var distance = (date - baseDate);
        var hours = Math.floor(distance / 1000 / 60 / 60);
        var minutes = Math.abs(Math.floor(distance / 1000 / 60 % 60));
        return ("" + hours).padStart(2, "0") + ":" + ("" + minutes).padStart(2, "0");
    }
    localizePrayerName(date, name) {
      if (date.getDay()===5) {
        return { fajr: "Subuh", sunrise: "Suruq", dhuhr: "Jumu'ah", asr: "Asr", maghrib: "Maghrib", isha: "Isha" }[name];
      }
      return { fajr: "Subuh", sunrise: "Suruq", dhuhr: "Dhuhur", asr: "Asr", maghrib: "Maghrib", isha: "Isha" }[name];
    }
    pasaran(date) {
      var index = Math.floor((date.getTime()) / 86400000) % 5;
      //var index = Math.floor((dateOnly - new Date(1970, 1, 1)) / 1000 / 60 / 60 / 24) % 5;
      return [ "Wage", "Kliwon", "Legi", "Pahing", "Pon"][index];
    }
    render() {
      return (
        <div className="calendar">
          <div>
          <div>{format(this.state.now, "EEEE", { locale: id })}</div>
          <div>{this.pasaran(this.state.now)}</div>
          </div>
          <div>
            <div>{format(this.state.now, "d MMMM yyyy")}</div>
            <div></div>
          </div>
          <div className="clock">
              <h2>{format(this.state.now, "HH:mm")}</h2>
              <div>⏰ {this.localizePrayerName(this.state.now, this.state.nextPrayer)} { this.formatDistance(this.state.now, this.state.nextPrayerTime, { locale: id, addSuffix: true }) }</div>
          </div>
        </div>
      );
    }
  }
  export default Calendar;