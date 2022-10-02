import { format } from 'date-fns'
import './Schedule.css';

function dhuhrName(date) {
    var days = Math.floor(date.getTime() / 86400000);
    var dayOfWeek = (days+4) % 7;
    if (dayOfWeek === 5) {
        return "Jumu'ah";
    }
    return "Dhuhur";
}
function Schedule(props) {
    return (
    <div className="schedule">
        <div className={`schedule-item ${props.prayerTimes.currentPrayer() === 'fajr' ? 'active' : ''}`}>
            <div>Subuh</div>
            <div>{format(props.prayerTimes.fajr, "HH:mm")}</div>
        </div>
        <div className={`schedule-item ${props.prayerTimes.currentPrayer() === 'sunrise' ? 'active' : ''}`}>
            <div>Shuruq</div>
            <div>{format(props.prayerTimes.sunrise, "HH:mm")}</div>
        </div>
        <div className={`schedule-item ${props.prayerTimes.currentPrayer() === 'dhuhr' ? 'active' : ''}`}>
            <div>{dhuhrName(props.prayerTimes.date)}</div>
            <div>{format(props.prayerTimes.dhuhr, "HH:mm")}</div>
        </div>
        <div className={`schedule-item ${props.prayerTimes.currentPrayer() === 'asr' ? 'active' : ''}`}>
            <div>Asr</div>
            <div>{format(props.prayerTimes.asr, "HH:mm")}</div>
        </div>
        <div className={`schedule-item ${props.prayerTimes.currentPrayer() === 'maghrib' ? 'active' : ''}`}>
            <div>Maghrib</div>
            <div>{format(props.prayerTimes.maghrib, "HH:mm")}</div>
        </div>
        <div className={`schedule-item ${props.prayerTimes.currentPrayer() === 'isha' ? 'active' : ''}`}>
            <div>Isha</div>
            <div>{format(props.prayerTimes.isha, "HH:mm")}</div>
        </div>
    </div>
    )
}

export default Schedule;
