import * as moment from 'moment-timezone';
import Redis from '@adexchange/aeg-redis';

export interface ICacheResolveKeyOptions {
	moment?: moment.Moment;
}

export interface ICache extends Redis {

	resolveKey<T> (interval: string, options: T);

}
