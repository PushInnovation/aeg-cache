import { ICache } from './types';
import { CacheRepositoryTransaction } from './cache-repository-transaction';
import { Base } from '@adexchange/aeg-common';

export abstract class CacheRepository<T extends CacheRepositoryTransaction> extends Base {

	protected _version: number;

	protected _process: string;

	protected _cache: ICache;

	constructor (version: number, process: string, cache: ICache) {

		super();

		this._version = version;
		this._process = process;
		this._cache = cache;

	}

	/**
	 * Return a transaction
	 */
	public abstract transaction (): T;

	/**
	 * Watch a key
	 */
	public async watch (key: string): Promise<void> {

		await this._cache.watch(key);

	}

	/**
	 * Dispose the cache
	 */
	public async dispose (): Promise<void> {

		await this._cache.dispose();

	}

}
