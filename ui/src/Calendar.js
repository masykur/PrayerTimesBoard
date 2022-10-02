import React from 'react';
import { format, add } from 'date-fns'
import { id } from 'date-fns/locale'
import { Coordinates, CalculationMethod, PrayerTimes } from 'adhan';
import './Calendar.css'

class Calendar extends React.Component {
    constructor(props) {
      super(props);
        this.state = {now: new Date(), nextPrayer: 'none', nextPrayerTime: new Date(), javaDate: { day: 1, month: 1, year: 1, monthName: ""}};
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
        var jd = this.javaDate(now)
        this.setState({
          now: now,
          nextPrayer: next,
          nextPrayerTime: nextPrayerTime,
          javaDate: jd
        });
    }

    formatDistance(date, baseDate) {
        var distance = (date - baseDate);
        var hours = Math.floor(distance / 1000 / 60 / 60);
        var minutes = Math.abs(Math.floor(distance / 1000 / 60 % 60));
        var seconds = Math.abs(Math.floor(distance / 1000 % 60));
        return ("" + hours).padStart(2, "0") + ":" + ("" + minutes).padStart(2, "0")+ ":" + ("" + seconds).padStart(2, "0");
    }
    localizePrayerName(date, name) {
      if (date.getDay()===5) {
        return { fajr: "Subuh", sunrise: "Suruq", dhuhr: "Jumu'ah", asr: "Asr", maghrib: "Maghrib", isha: "Isha" }[name];
      }
      return { fajr: "Subuh", sunrise: "Suruq", dhuhr: "Dhuhur", asr: "Asr", maghrib: "Maghrib", isha: "Isha" }[name];
    }
    javaDayOfWeek(date) {
      var index = Math.floor((date.getTime()) / 86400000) % 5;
      return [ "Wage", "Kliwon", "Legi", "Pahing", "Pon"][index];
    }
    javaDate(date) {      
      const monthNames = ["Suro", "Sapar", "Mulud", "Bakda Mulud", "Jumadil Awal", "Jumadil Akhir", "Rejeb", "Ruwah", "Poso", "Sawal", "Sela", "Besar"];
      const javaDayNames = [ "Kliwon", "Legi", "Pahing", "Pon", "Wage"];
      const dayNames = [ "Ahad", "Senin", "Selasa", "Rabu", "Kamis", "Jumu'ah", "Sabtu"];
      const firstSuro = [ 
        { Day : "Selasa", JavaDay : "Pon" },
        { Day : "Sabtu", JavaDay : "Pahing" },
        { Day : "Kamis", JavaDay : "Paing" },
        { Day : "Senin", JavaDay : "Legi" },
        { Day : "Jumu'ah", JavaDay : "Kliwon" },
        { Day : "Rabu", JavaDay : "Kliwon" },
        { Day : "Ahad", JavaDay : "Wage" },
        { Day : "Kamis", JavaDay : "Pon" },
      ];
      const daysAge =  
      [
        [0, 29, 30, 29, 30, 29, 30, 29, 30, 29, 30, 29], // alip
        [30, 29, 30, 29, 30, 29, 30, 29, 30, 29, 30, 30], // ehe (kabisat)
        [30, 29, 30, 29, 30, 29, 30, 29, 30, 29, 30, 29], // jumawal
        [30, 29, 30, 29, 30, 29, 30, 29, 30, 29, 30, 30], // je (kabisat)
        [30, 30, 30, 29, 29, 29, 30, 29, 30, 29, 30, 29], // dal
        [30, 29, 30, 29, 30, 29, 30, 29, 30, 29, 30, 29], // be
        [30, 29, 30, 29, 30, 29, 30, 29, 30, 29, 30, 29], // wawu
        [30, 29, 30, 29, 30, 29, 30, 29, 30, 29, 30, 30]  // jimakir (kabisat)
      ];
      var days = 122903 + Math.floor(date.getTime() / 86400000);
      var year = Math.floor(days / 354.375);
      var windu = year % 8;
      var deltaDay = Math.floor(days - (year * 354.375));
      var firstSuroDay = Math.floor(date.getTime() / 86400000) + (-1 * deltaDay);
      var dayOfFirstSuro = firstSuro[windu];
      var firstSuroDayAdjustment = firstSuroDay;
      var i=0;
      while(dayNames[(firstSuroDayAdjustment + 5) % 7] !== dayOfFirstSuro.Day && javaDayNames[(firstSuroDayAdjustment + 5) % 5] !== dayOfFirstSuro.JavaDay) {
        i++;
        firstSuroDayAdjustment = firstSuroDay - i;
        if (dayNames[(firstSuroDayAdjustment + 5) % 7] === dayOfFirstSuro.Day && javaDayNames[(firstSuroDayAdjustment + 5) % 5] === dayOfFirstSuro.JavaDay) {
          break;
        }
        firstSuroDayAdjustment = firstSuroDay + i;
      }
      var newYear = firstSuroDayAdjustment;
      var daysLeft = (Math.floor(date.getTime() / 86400000) - newYear) + 1;
      var month = 0;
      while (daysLeft > daysAge[windu][month])
      {
        daysLeft -= daysAge[windu][month];
        month++;
      }
      console.info("days", new Date((days-122903) * 86400000));
      return { 
        year: year + 1555, 
        month: month + 1, 
        monthName: monthNames[month], 
        day : daysLeft,
        dayOfWeek: ((days-122903)+4) % 7,
        dayOfWeekName: dayNames[((days-122903)+4) % 7],
        javaDayOfWeek: ((days-122903)+4) % 5,
        javaDayOfWeekName: javaDayNames[((days-122903)+4) % 5]
       };
    }

    render() {
      return (
        <div className="calendar">
          <div>
          <div>{this.state.javaDate.dayOfWeekName}</div>
          <div>{this.state.javaDate.javaDayOfWeekName}</div>
          </div>
          <div>
            <div>{format(this.state.now, "d MMMM yyyy")}</div>
            <div>{this.state.javaDate.day} {this.state.javaDate.monthName} {this.state.javaDate.year}</div>
          </div>
          <div className="clock">
              <h2>{format(this.state.now, "HH:mm:ss")}</h2>
              <div>⏰ {this.localizePrayerName(this.state.now, this.state.nextPrayer)} { this.formatDistance(this.state.now, this.state.nextPrayerTime, { locale: id, addSuffix: true }) }</div>
          </div>
        </div>
      );
    }
  }
  export default Calendar;