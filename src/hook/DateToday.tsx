import moment from "moment-timezone";
import { useTimeZone } from "./useTimeZone";


const DateToday: React.FC = () => {
  const timeZ=useTimeZone(); 
  const timeZoneString = timeZ.timeZone ? timeZ.timeZone.toString() : "";
  const currentDate = moment.tz(timeZoneString);
  const formattedDate = currentDate.format("DD.MM.YYYY");

    return (
        <>
      <div>
        Сегодня: {formattedDate}
      </div>
      </>
    );
  };

  export default DateToday