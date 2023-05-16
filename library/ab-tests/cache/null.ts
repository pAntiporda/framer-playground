import type {CacheHandler} from './types';

const nullCacheHandler: CacheHandler = {
	get: (): undefined => undefined,
	set: (): void => undefined,
};

export {
	nullCacheHandler,
};
