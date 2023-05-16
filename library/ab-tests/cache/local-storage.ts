import type {CacheHandler} from './types';

type LocalStorageCacheEntry = {
	value: unknown;
	createdAt: number;
	cacheId: number;
};

const isLocalStorageCacheEntry = (value: unknown): value is LocalStorageCacheEntry => {
	if (typeof value !== 'object' || value === null) {
		return false;
	}

	const {value: entryValue, cacheId, createdAt} = value as LocalStorageCacheEntry;

	return [
		entryValue !== null,
		typeof cacheId === 'number',
		typeof createdAt === 'number',
	].every(Boolean);
};

const localStorageCacheHandler: CacheHandler = {
	get: <T>(key: string, cacheId: number, cacheLifetime: number): T | undefined => {
		const cacheEntry = localStorage.getItem(`ab-test-${key}`);

		if (cacheEntry === null) {
			return undefined;
		}

		try {
			const decodedCacheEntry = Buffer.from(cacheEntry, 'base64').toString('utf8');
			const parsedCacheEntry = JSON.parse(decodedCacheEntry) as unknown;

			if (!isLocalStorageCacheEntry(parsedCacheEntry)) {
				return undefined;
			}

			if (parsedCacheEntry.cacheId !== cacheId) {
				return undefined;
			}

			if (Date.now() - parsedCacheEntry.createdAt > cacheLifetime * 1000 * 60 * 60 * 24) {
				return undefined;
			}

			return parsedCacheEntry.value as T;
		} catch {
			return undefined;
		}
	},
	set: <T>(key: string, value: T, cacheId: number): void => {
		const cacheEntry: LocalStorageCacheEntry = {
			value,
			cacheId,
			createdAt: Date.now(),
		};

		const encodedCacheEntry = Buffer.from(JSON.stringify(cacheEntry)).toString('base64');

		localStorage.setItem(`ab-test-${key}`, JSON.stringify(encodedCacheEntry));
	},
};

export {
	isLocalStorageCacheEntry,
	localStorageCacheHandler,
};

export type {
	LocalStorageCacheEntry,
};
