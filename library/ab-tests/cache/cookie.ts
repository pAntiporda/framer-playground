import type {CacheHandler} from './types';

type CookieCacheEntry = {
	value: unknown;
	cacheId: number;
};

type GenericRequest = {
	cookies: Partial<{
		[key: string]: string;
	}>;
};

type GenericResponse = {
	setHeader: (key: string, value: string) => void;
};

const isCookieCacheEntry = (value: unknown): value is CookieCacheEntry => {
	if (typeof value !== 'object' || value === null) {
		return false;
	}

	const {value: entryValue, cacheId} = value as CookieCacheEntry;

	return [
		entryValue !== null,
		typeof cacheId === 'number',
	].every(Boolean);
};

const createCookieCacheHandler = (request: GenericRequest, response: GenericResponse): CacheHandler => ({
	get: <T>(key: string, cacheId: number): T | undefined => {
		const cacheEntry = request.cookies[`ab-test-${key}`];

		if (cacheEntry === undefined) {
			return undefined;
		}

		try {
			const decodedCacheEntry = Buffer.from(cacheEntry, 'base64').toString('utf8');
			const parsedCacheEntry = JSON.parse(decodedCacheEntry) as unknown;

			if (!isCookieCacheEntry(parsedCacheEntry)) {
				return undefined;
			}

			if (parsedCacheEntry.cacheId !== cacheId) {
				return undefined;
			}

			return parsedCacheEntry.value as T;
		} catch {
			return undefined;
		}
	},
	set: <T>(key: string, value: T, cacheId: number, cacheLifetime: number): void => {
		const cacheEntry: CookieCacheEntry = {
			value,
			cacheId,
		};

		const encodedCacheEntry = Buffer.from(JSON.stringify(cacheEntry)).toString('base64');

		response.setHeader('Set-Cookie', `ab-test-${key}=${encodedCacheEntry}; Max-Age=${cacheLifetime * 60 * 60 * 24}; Path=/`);
	},
});

export {
	createCookieCacheHandler,
};
