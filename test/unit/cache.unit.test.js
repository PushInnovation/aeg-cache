import Cache from '../../src/cache';
import moment from 'moment-timezone';

describe('cache', async () => {

	it('should return without error', async () => {

		const m = moment.tz('2017-01-17 05:00:00', 'YYYY-MM-DD HH:mm:ss', 'UTC');
		const cache = new Cache('192.168.99.100', 32769, 'test');

		const minutely = cache.resolveKey('minutely', {moment: m});
		minutely.should.be.equal('i:year:2017:month:01:day:17:hour:00:minute:00');

		const hourly = cache.resolveKey('hourly', {moment: m});
		hourly.should.be.equal('i:year:2017:month:01:day:17:hour:00');

		const yesterday = cache.resolveKey('yesterday', {moment: m});
		yesterday.should.be.equal('i:year:2017:month:01:day:16');

		const daily = cache.resolveKey('daily', {moment: m});
		daily.should.be.equal('i:year:2017:month:01:day:17');

		const weekly = cache.resolveKey('weekly', {moment: m});
		weekly.should.be.equal('i:year:2017:week:03');

		const lastWeek = cache.resolveKey('last-week', {moment: m});
		lastWeek.should.be.equal('i:year:2017:week:02');

		const monthly = cache.resolveKey('monthly', {moment: m});
		monthly.should.be.equal('i:year:2017:month:01');

		const yearly = cache.resolveKey('yearly', {moment: m});
		yearly.should.be.equal('i:year:2017');

	});

});
