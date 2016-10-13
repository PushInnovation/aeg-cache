import Redis from '@adexchange/aeg-redis';
import moment from 'moment-timezone';
import * as CacheKeys from './cache-keys';

// start of week is Monday
moment.updateLocale('en', {
	week: {
		dow: 1,
		doy: 4
	}
});

/**
 * Redis cache that resolves keys based on time frames
 */
export default class Cache extends Redis {

	/**
	 * Constructor
	 * @param {string} host
	 * @param {number} port
	 * @param {string} prefix
	 */
	constructor (host, port, prefix) {

		super({host, port, prefix: prefix + ':'});

	}

	/**
	 * Resolved a cache key based on time intervals
	 * @param {string} interval
	 * @param {{[moment]: moment}} [options]
	 * @return {string}
	 */
	resolveKey (interval, options) {

		const intervals = this._resolveIntervals(options);

		switch (interval) {
			case 'minutely':
				return `${CacheKeys.INTERVAL_KEY}:year:${intervals.yearLabel}:month:${intervals.monthLabel}:day:${intervals.dayLabel}:hour:${intervals.hourLabel}:minute:${intervals.minuteLabel}`;
			case 'hourly':
				return `${CacheKeys.INTERVAL_KEY}:year:${intervals.yearLabel}:month:${intervals.monthLabel}:day:${intervals.dayLabel}:hour:${intervals.hourLabel}`;
			case 'last-hour':
				return `${CacheKeys.INTERVAL_KEY}:year:${intervals.yearLabel}:month:${intervals.monthLabel}:day:${intervals.dayLabel}:hour:${intervals.lastHourLabel}`;
			case 'daily':
				return `${CacheKeys.INTERVAL_KEY}:year:${intervals.yearLabel}:month:${intervals.monthLabel}:day:${intervals.dayLabel}`;
			case 'yesterday':
				return `${CacheKeys.INTERVAL_KEY}:year:${intervals.yearLabel}:month:${intervals.monthLabel}:day:${intervals.yesterdayLabel}`;
			case 'weekly':
				return `${CacheKeys.INTERVAL_KEY}:year:${intervals.yearLabel}:week:${intervals.weekLabel}`;
			case 'last-week':
				return `${CacheKeys.INTERVAL_KEY}:year:${intervals.yearLabel}:week:${intervals.lastWeekLabel}`;
			case 'monthly':
				return `${CacheKeys.INTERVAL_KEY}:year:${intervals.yearLabel}:month:${intervals.monthLabel}`;
			case 'yearly':
				return `${CacheKeys.INTERVAL_KEY}:year:${intervals.yearLabel}`;
		}

	}

	/**
	 * Resolves the time interval values
	 * @param {Object} [options]
	 * @return {{minute: *, minuteLabel: (*|{compact}), hour: *, hourLabel: (*|{compact}), day: *, dayLabel: (*|{compact}), yesterday: *, yesterdayLabel: *, month: *, monthLabel: (*|{compact}), week: (*|{dow, doy}), weekLabel: (*|{compact}), lastWeek: *, lastWeekLabel: *, year: *, yearLabel: (*|{compact})}}
	 * @private
	 */
	_resolveIntervals (options) {

		let m;

		if (options && options.moment) {

			m = options.moment.tz('America/New_York');

		} else {

			m = moment.tz('America/New_York');

		}

		return {
			minute: m.minute(),
			minuteLabel: m.format('mm'),
			hour: m.hour(),
			hourLabel: m.format('HH'),
			lastHour: m.clone().subtract(1, 'hours').hour(),
			lastHourLabel: m.clone().subtract(1, 'hours').format('HH'),
			day: m.day(),
			dayLabel: m.format('DD'),
			yesterday: m.clone().subtract(1, 'days').day(),
			yesterdayLabel: m.clone().subtract(1, 'days').format('DD'),
			month: m.month(),
			monthLabel: m.format('MM'),
			week: m.week(),
			weekLabel: m.format('ww'),
			lastWeek: m.clone().subtract(1, 'week').week(),
			lastWeekLabel: m.clone().subtract(1, 'week').format('ww'),
			year: m.year(),
			yearLabel: m.format('YYYY')
		};

	}

}
