import { Transaction } from '@push_innovation/aeg-redis';
import { Base } from '@push_innovation/aeg-common';

export abstract class CacheRepositoryTransaction extends Base {

	protected _version: number;

	protected _process: string;

	protected _transaction: Transaction;

	constructor (version: number, process: string, transaction: Transaction) {

		super();

		this._version = version;
		this._process = process;
		this._transaction = transaction;

	}

	public async commit (): Promise<void> {

		await this._transaction.commit();

	}

	public rollback (): void {

		this._transaction.rollback();

	}

	get disposed (): boolean {

		return this._transaction.disposed;

	}

}
