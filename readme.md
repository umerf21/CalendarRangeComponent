# Calendar Component

#### Create two dummy APIs, one for unavailable days & one for LOS rules.
* Done - Main index File.


#### Create a calendar component that utilizes the two APIs & its internal logic to build the described feature.
*  Done - client/src/CalendarRange


#### The component must be flexible, so it's possible to pass a parameter to switch off the validation (in which case no API calls would be made), for instance, we may call the component to display a general date range picker (without validation, blocked days or LOS rules, and all days are available) when searching for all units to book, and then for a specific unit, the component is used with the range validation, based on the two API calls.
* Done - client/src/DatePicker (Custom prop = data on DatePicker Component)


1. Clone
2. Yarn install
3. run
