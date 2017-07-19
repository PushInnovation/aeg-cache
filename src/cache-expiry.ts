export const MINUTELY = 60;

export const HOURLY = MINUTELY * 60;

export const DAILY = HOURLY * 24;

export const WEEKLY = DAILY * 7;

export const MONTHLY = DAILY * 31;

// leap year
export const YEARLY = DAILY * 366;

export function expiryForInterval (interval) {

	switch (interval) {

		case 'yearly':
			return YEARLY;
		case 'monthly':
			return MONTHLY;
		case 'weekly':
			return WEEKLY;
		case 'last-week':
			return WEEKLY;
		case 'daily':
			return DAILY;
		case 'yesterday':
			return DAILY;
		case 'hourly':
			return HOURLY;
		case 'last-hour':
			return HOURLY;
		case 'minutely':
			return MINUTELY;
		default:
			throw new Error(`Redis expiry interval not valid: ${interval}`);

	}

}
