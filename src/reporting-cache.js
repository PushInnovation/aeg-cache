import Cache from './cache';

const OFFER_PAIR_KEY = 'op';
const VERTICAL_KEY = 'v';
const DEVICE_KEY = 'd';
const AFFILIATE_KEY = 'a';
const SUB_KEY = 's';

class ReportingCache extends Cache {

	// noinspection JSCheckFunctionSignatures
	/**
	 * Resolve the cache key
	 * @param {string} interval
	 * @param {{[moment]: moment, [affiliateId]: string, [sub]: string, [offerPair]: string, [vertical]: string, [device]: string}} [options]
	 * @return {string}
	 */
	resolveKey (interval, options) {

		let key = super.resolveKey(interval, options);

		if (options.affiliateId && options.affiliateId !== 'all') {

			key = [key, AFFILIATE_KEY, options.affiliateId].join(':');

		}

		if (options.sub && options.sub !== 'all') {

			key = [key, SUB_KEY, options.sub].join(':');

		}

		if (options.offerPair && options.offerPair !== 'all') {

			key = [key, OFFER_PAIR_KEY, options.offerPair.replace(':', '-')].join(':');

		}

		if (options.vertical && options.vertical !== 'all') {

			key = [key, VERTICAL_KEY, options.vertical].join(':');

		}

		if (options.device && options.device !== 'all') {

			key = [key, DEVICE_KEY, options.device].join(':');

		}

		return key;

	}

}

export default ReportingCache;
