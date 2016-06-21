var moment = require('moment');

function UtilDate () {

}

UtilDate.holiday = {
	statics: [
		{
			// New Year
			month: 0,
			date: 1
		},
		{	
			// Independence day
			month:6,
			date:4
		},
		{
			// Veterans’ Day
			month:10,
			date:11
		},
		{
			// Christmas day
			month:11,
			date:25
		}
	],

	dynamics: [
		{ // Martin Luther King Day
			month: 0,
			day: 1,
			dayOrder: 3
		},
		{ // President's Day
			month: 1,
			day: 1,
			dayOrder: 3
		},
		{ // Labour Day
			month: 8,
			day: 1,
			dayOrder: 1
		},
		{ // Columbus Day
			month: 9,
			day: 1,
			dayOrder: 2
		},
		{ // Thanksgiving Day
			month: 10,
			day: 4,
			dayOrder: 4
		},
	]
};

UtilDate.prototype = {
	constructor: UtilDate,

	/**
	 * Is current date a business (working) day?
	 * @return {Boolean}
	 */
	isBusinessDay: function() {
		return !this.isWeekend() && !this.isHoliday() && !this.isMovedHoliday();
	},

	/**
	 * Is current day Saturday or Sunday?
	 * @return {Boolean}
	 */
	isWeekend: function() {
		var day = this.date.getDay();
		return day === 6 || day === 0;
	},

	/**
	 * Is current date a federal holiday
	 * @return {Boolean}
	 */
	isHoliday: function() {
		return this.isStaticHoliday() || this.isDynamicHoliday();
	},

	/**
	 * Is current date a static holiday (that does not change every year)
	 * @return {Boolean}
	 */
	isStaticHoliday: function() {
		var date = this.date.getDate();
		var month = this.date.getMonth();
		return UtilDate.holiday.statics.some(function(dateOption) {
			return dateOption.month === month && dateOption.date === date;
		});
	},

	/**
	 * Is today a moved holiday from a weekend?
	 *
	 * If a legal holiday falls on Saturday, Friday is a moved holiday
	 * If a legal holiday falls on Sunday, Monday is a moved holiday
	 * 
	 * @return {Boolean}
	 */
	isMovedHoliday: function() {
		switch (this.date.getDay()) {
			case 1:
				return this.isSundayHoliday();
			case 5:
				return this.isSaturdatyHoliday();
		}
		return false;
	},

	/**
	 * Is holiday falls on Sunday
	 * @return {Boolean}
	 */
	isSundayHoliday: function() {
		var newDate = new Date(this.date.getTime());
		newDate.setDate(this.date.getDate() - 1);
		return UtilDate.make(newDate).isHoliday();
	},

	/**
	 * Is holiday falls on Saturday
	 * @return {Boolean}
	 */
	isSaturdatyHoliday: function() {
		var newDate = new Date(this.date.getTime());
		newDate.setDate(this.date.getDate() + 1);
		return UtilDate.make(newDate).isHoliday();
	},

	/**
	 * Is current date a dynamic holiday (that changes every year)
	 * @return {Boolean} [description]
	 */
	isDynamicHoliday: function() {
		var self = this;
		return UtilDate.holiday.dynamics.some(function(dateOption) {
			if (dateOption.month != self.date.getMonth()) return false;
			return self.isDayByOrder(dateOption.day, dateOption.dayOrder);
		});
	},

	/**
	 * Set current date
	 * @param {Date} date
	 */
	setDateProp: function(date) {
		this.date = date;
	},

	isDayByOrder: function(day, order) {
		var date = this.dateByDayOrder(day, order);
		return this.date.getFullYear() === date.getFullYear() &&
			this.date.getMonth() === date.getMonth() &&
			this.date.getDate() === date.getDate();
	},

	/**
	 * Get date by order of specific day
	 * @param  {Number} day   Day number
	 * @param  {Number} order Order of a day
	 * @return {Date}
	 */
	dateByDayOrder: function(day, order) {
		var startMonthDate = moment(this.date.getTime()).startOf('month');
		if (startMonthDate.day() <= day)
			order--;
		return startMonthDate.day(7 * order + day).toDate();
	},
};

UtilDate.make = function(date) {
	var inst = new this;
	inst.setDateProp(date);
	return inst;
};

module.exports = UtilDate;