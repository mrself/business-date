## Description
Script for checking if a date is USA holiday.

## Usage

```
var holidayChecker = require('usa-holiday');
var date = new Date();
var holidayObj = holidayChecker.make(date);
var isHoliday = !holidayObj.isBusinessDay();
```
