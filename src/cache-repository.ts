import { IRedisTransaction } from '@adexchange/aeg-redis';
import { ICache } from './types';

export abstract class CacheRepository<T extends IRedisTransaction> {

	private _version: number;

	private _process: string;

	private _cache: ICache;

	constructor (version: number, process: string, cache: ICache) {

		this._version = version;
		this._process = process;
		this._cache = cache;

	}

	/**
	 * The version of the cache entry
	 */
	public get version (): number {

		return this._version;

	}

	/**
	 * The process that wrote the cache entry
	 */
	public get process (): string {

		return this._process;

	}

	/**
	 * Get the underlying redis cache
	 */
	public get cache (): ICache {

		return this._cache;

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
