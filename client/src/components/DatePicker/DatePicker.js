import { addDays, parseISO } from 'date-fns';
import moment from 'moment';
import React, { useState } from 'react';
import { DateRangePicker } from 'react-date-range';
import 'react-date-range/dist/styles.css'; // main style file
import 'react-date-range/dist/theme/default.css'; // theme css fil
import './DatePicker.css';
import {
  getInitialDate,
  selectedDayObject,
  maxOut,
  convertDateArray,
} from './DatePickerUtils';
import _ from 'lodash';

const DatePicker = ({ data, onSelectedValue }) => {
  console.log(data);
  // console.log(apiData);
  const [apiData, setData] = useState(data);

  const unavailableDates = convertDateArray(apiData?.unavailableDates);
  console.log(unavailableDates);
  const newDate = !_.isEmpty(data)
    ? getInitialDate(unavailableDates, apiData?.losRules)
    : new Date();

  // console.log(startDate);
  const [state, setState] = useState([
    {
      startDate: newDate,
      endDate: newDate,
      key: 'selection',
    },
  ]);
  const [limit, setLimit] = useState({ min: new Date(), max: '' });
  const [losLabel, setLosLabel] = useState({ showLabel: false, LOS: 0 });
  // const [selectedValue, onSelectedValue] = useState();

  const handleChange = ({ selection }) => {
    if (data?.length > 0) {
      var date_Object = selectedDayObject(
        selection.startDate,
        apiData?.losRules
      );

      console.log('Date Object', date_Object);

      setLosLabel({ showLabel: true, LOS: date_Object.LOS });

      var diff = moment(selection.endDate).diff(
        moment(selection.startDate),
        'days'
      );

      if (diff >= date_Object.LOS || diff === 0) {
        setState([selection]);
        setLimit({
          min: selection.startDate,
          max: maxOut(selection.startDate, apiData?.losRules, unavailableDates),
        });
        onSelectedValue(selection);
      }
    } else {
      setState([selection]);
      setLimit((current) => ({
        ...current,
        min: selection.startDate,
      }));
      onSelectedValue(selection);
    }
  };

  return (
    <>
      <DateRangePicker
        onChange={handleChange}
        showSelectionPreview={true}
        moveRangeOnFirstSelection={false}
        months={2}
        ranges={state}
        direction="horizontal"
        staticRanges={[]}
        inputRanges={[]}
        minDate={limit.min}
        maxDate={limit.max}
        disabledDates={unavailableDates}
      />
      {losLabel.showLabel && (
        <h4 className="label"> {losLabel.LOS}-Nights Minimum</h4>
      )}
    </>
  );
};
export default DatePicker;
