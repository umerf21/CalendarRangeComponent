import moment from 'moment';
import React, { useEffect, useState } from 'react';
import DatePicker from '../DatePicker/DatePicker';
import './styles.css';
const CalendarRange = () => {
  const [apiData, setApiData] = useState({});

  const [toggle, setToggle] = useState(false);
  const [value, setValue] = useState('Select Dates');

  useEffect(() => {
    fetch('/api/los-rules')
      .then((response) => response.json())
      .then((data) =>
        setApiData((current) => ({ ...current, losRules: data }))
      );

    fetch('/api/unavailable-dates')
      .then((response) => response.json())
      .then((data) =>
        setApiData((current) => ({ ...current, unavailableDates: data }))
      );
  }, []);

  const handleSelectedValue = (value) => {
    setValue(
      `${moment(value.startDate).format('DD/MM/YYYY')}  -  
      ${moment(value.endDate).format('DD/MM/YYYY')}`
    );
  };

  return (
    <>
      <div className="date-container">
        <div className="date" onClick={() => setToggle(!toggle)}>
          {value}
        </div>
      </div>
      {toggle && (
        <DatePicker data={apiData} onSelectedValue={handleSelectedValue} />
      )}
    </>
  );
};
export default CalendarRange;
