import moment from 'moment';

const convertDateArray = (arr) => {
  if (arr?.length > 0) {
    return arr?.map((item) => new Date(item));
  } else {
    return [];
  }
};

const lastUnavailbleDate = (arr) => {
  const maxDate = new Date(
    Math.max(
      ...arr?.map((element) => {
        return new Date(element);
      })
    )
  );

  return maxDate;
};

const minUnavailbleDate = (arr) => {
  const minDate = new Date(
    Math.min(
      ...arr?.map((element) => {
        return new Date(element);
      })
    )
  );

  return minDate;
};

const selectedDayObject = (selectedDate, los) => {
  const date = los?.filter(
    (item) => item.day === moment(selectedDate).format('YYYY-MM-DD')
  );
  const date_object =
    date?.length > 0
      ? date.reduce((ob) => {
          return { ...ob };
        })
      : { day: moment(selectedDate).format('YYYY-MM-DD'), LOS: 5 };
  return date_object;
};

const getInitialDate = (unavailable_days, los) => {
  const date_Object = selectedDayObject(new Date(), los);

  if (
    moment(minUnavailbleDate(unavailable_days))
      .subtract(date_Object.LOS, 'd')
      .format('YYYY-MM-DD') > date_Object.day
  ) {
    return new Date();
  } else {
    const newStartDate = moment(lastUnavailbleDate(unavailable_days))
      .add(1, 'd')
      .toISOString();
    return new Date(newStartDate);
  }
};

const maxOut = (selectedDate, los, unavailable_days) => {
  const date_Object = selectedDayObject(selectedDate, los);

  if (
    moment(minUnavailbleDate(unavailable_days)).format('YYYY-MM-DD') >
    date_Object.day
  ) {
    return lastUnavailbleDate(unavailable_days);
  }
};

export { getInitialDate, selectedDayObject, maxOut, convertDateArray };
