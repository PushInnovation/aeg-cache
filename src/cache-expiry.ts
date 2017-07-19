export const YEARLY = 31540000;

export const MONTHLY = 2628000;

export const WEEKLY = 604800;

export const DAILY = 86400;

export const HOURLY = 3600;

export const MINUTELY = 60;

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
