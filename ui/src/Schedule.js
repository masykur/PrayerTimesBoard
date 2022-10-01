import { format } from 'date-fns'
import './Schedule.css';
 
function Schedule(props) {
    return (
    <div className="schedule">
        <div className="schedule-item">
            <div>Subuh</div>
            <div>{format(props.prayerTimes.fajr, "HH:mm")}</div>
        </div>
        <div className="schedule-item">
            <div>Shuruq</div>
            <div>{format(props.prayerTimes.sunrise, "HH:mm")}</div>
        </div>
        <div className="schedule-item">
            <div>Jumu'ah</div>
            <div>{format(props.prayerTimes.dhuhr, "HH:mm")}</div>
        </div>
        <div className="schedule-item">
            <div>Asr</div>
            <div>{format(props.prayerTimes.asr, "HH:mm")}</div>
        </div>
        <div className="schedule-item">
            <div>Maghrib</div>
            <div>{format(props.prayerTimes.maghrib, "HH:mm")}</div>
        </div>
        <div className="schedule-item">
            <div>Isha</div>
            <div>{format(props.prayerTimes.isha, "HH:mm")}</div>
        </div>
    </div>
    )
}

export default Schedule;
