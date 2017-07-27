import Redis from '@adexchange/aeg-redis';
import * as moment from 'moment-timezone';
import * as CacheKeys from './cache-keys';
import { ICache, ICacheResolveKeyOptions } from './types';

export interface IIntervalLabels {
	minute: number;
	minuteLabel: string;
	hour: number;
	hourLabel: string;
	day: number;
	dayLabel: string;
	month: number;
	monthLabel: string;
	week: number;
	weekLabel: string;
	year: number;
	yearLabel: string;
}

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
export default class Cache extends Redis implements ICache {

	/**
	 * Constructor
	 */
	constructor (host: string, port: number, prefix: string) {

		super({host, port, prefix: prefix + ':'});

	}

	/**
	 * Resolved a cache key based on time intervals
	 */
	public resolveKey (interval: string, options: ICacheResolveKeyOptions): string {

		const m = (options && options.moment) ? options.moment.clone().tz('America/New_York') : moment.tz('America/New_York');

		switch (interval) {

			case 'last-hour':
				m.subtract(1, 'hours');
				break;
			case 'yesterday':
				m.subtract(1, 'days');
				break;
			case 'last-week':
				m.subtract(1, 'week');
				break;
			default:
				break;

		}

		const intervals = this._intervalLabels(m);

		switch (interval) {

			case 'minutely':
				return `${CacheKeys.INTERVAL_KEY}:year:${intervals.yearLabel}:month:${intervals.monthLabel}:day:${intervals.dayLabel}:hour:${intervals.hourLabel}:minute:${intervals.minuteLabel}`;
			case 'hourly':
				return `${CacheKeys.INTERVAL_KEY}:year:${intervals.yearLabel}:month:${intervals.monthLabel}:day:${intervals.dayLabel}:hour:${intervals.hourLabel}`;
			case 'last-hour':
				return `${CacheKeys.INTERVAL_KEY}:year:${intervals.yearLabel}:month:${intervals.monthLabel}:day:${intervals.dayLabel}:hour:${intervals.hourLabel}`;
			case 'daily':
				return `${CacheKeys.INTERVAL_KEY}:year:${intervals.yearLabel}:month:${intervals.monthLabel}:day:${intervals.dayLabel}`;
			case 'yesterday':
				return `${CacheKeys.INTERVAL_KEY}:year:${intervals.yearLabel}:month:${intervals.monthLabel}:day:${intervals.dayLabel}`;
			case 'weekly':
				return `${CacheKeys.INTERVAL_KEY}:year:${intervals.yearLabel}:week:${intervals.weekLabel}`;
			case 'last-week':
				return `${CacheKeys.INTERVAL_KEY}:year:${intervals.yearLabel}:week:${intervals.weekLabel}`;
			case 'monthly':
				return `${CacheKeys.INTERVAL_KEY}:year:${intervals.yearLabel}:month:${intervals.monthLabel}`;
			case 'yearly':
				return `${CacheKeys.INTERVAL_KEY}:year:${intervals.yearLabel}`;
			default:
				throw new Error('cache interval not valid');

		}

	}

	/**
	 * Resolve the cache labels for an interval
	 */
	private _intervalLabels (m: moment.Moment): IIntervalLabels {

		return {
			minute: m.minute(),
			minuteLabel: m.format('mm'),
			hour: m.hour(),
			hourLabel: m.format('HH'),
			day: m.day(),
			dayLabel: m.format('DD'),
			month: m.month(),
			monthLabel: m.format('MM'),
			week: m.week(),
			weekLabel: m.format('ww'),
			year: m.year(),
			yearLabel: m.format('YYYY')
		};

	}

}
