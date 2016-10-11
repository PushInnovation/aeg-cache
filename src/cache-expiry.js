// 2 years
export const YEARLY = 63113904;

// 2 months
export const MONTHLY = 5184000;

// 3 weeks
export const WEEKLY = 1814400;

// 3 days
export const DAILY = 259200;

// 2 days
export const HOURLY = 172800;

// 5 minutes
export const MINUTELY = 300;

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
