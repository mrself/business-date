var BD = require('../index');
var chai = require('chai');
var assert = chai.assert;
var expect = chai.expect;

it('BD is a function', function() {
	expect(BD).to.be.a('function');
});
beforeEach(function() {
	this.utilDate = new BD();
})
describe('#isBusinessDay', function() {
	
	it ('Sunday is not business day', function() {
		this.utilDate.setDateProp(new Date(2016, 5, 19));
		assert(!this.utilDate.isBusinessDay());
	});
	it ('Saturday is not business day', function() {
		this.utilDate.setDateProp(new Date(2016, 5, 18));
		assert(!this.utilDate.isBusinessDay());
	});

	it('Monday is a business day', function() {
		this.utilDate.setDateProp(new Date(2016, 5, 20));
		assert(this.utilDate.isBusinessDay());
	});

	it('2016 Labor Day is not a business', function() {
		this.utilDate.setDateProp(new Date(2016, 9, 5));
		assert(this.utilDate.isBusinessDay());
	});
});

describe('#isWeekend', function() {
	it ('Sunday is a weekend', function() {
		this.utilDate.setDateProp(new Date(2016, 5, 19));
		assert(this.utilDate.isWeekend());
	});

	it('Monday is not a weekend', function() {
		this.utilDate.setDateProp(new Date(2016, 5, 20));
		assert(!this.utilDate.isWeekend());
	});
});

describe('#isStaticHoliday', function() {
	it ('1st of January is a static holiday', function() {
		this.utilDate.setDateProp(new Date(2016, 0, 1));
		assert(this.utilDate.isStaticHoliday());
	});
	it ('1st of June is not a static holiday', function() {
		this.utilDate.setDateProp(new Date(2016, 5, 1));
		assert(!this.utilDate.isStaticHoliday());
	});
});

describe('#isMovedHoliday', function() {
	it ('2017 New Year holiday is on Monday', function() {
		this.utilDate.setDateProp(new Date(2017, 0, 2));
		assert(this.utilDate.isMovedHoliday());
	});

	it('2016 Christmas Day holiday is on Monday', function() {
		this.utilDate.setDateProp(new Date(2016, 11, 26));
		assert(this.utilDate.isMovedHoliday());
	});
});

describe('#isDynamicHoliday', function() {
	it ('Martic Luther King day is a dynamic holiday', function() {
		this.utilDate.setDateProp(new Date(2016, 0, 18));
		assert(this.utilDate.isDynamicHoliday());
	});
});

describe('#isDayByOrder', function() {
	it ('2d Wednesday in May is 11th', function() {
		this.utilDate.setDateProp(new Date(2016, 4, 11));
		assert(this.utilDate.isDayByOrder(3, 2));
	});
});

describe('#dateByDayOrder', function() {
	it ('3-d Wednesday of June is the 15th day', function() {
		this.utilDate.setDateProp(new Date(2016, 5, 5));
		var newDate = this.utilDate.dateByDayOrder(3, 3);
		assert(newDate.getDate() == 15);
	});

	it('2-d Monday of July is the 11th day', function() {
		this.utilDate.setDateProp(new Date(2016, 6, 13));
		var newDate = this.utilDate.dateByDayOrder(1, 2);
		assert(newDate.getDate() == 11);
	});
});