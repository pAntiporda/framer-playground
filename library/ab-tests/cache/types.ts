type CacheHandler = {
	get: <T>(key: string, cacheId: number, cacheLifetime: number) => T | undefined;
	set: <T>(key: string, value: T, cacheId: number, cacheLifetime: number) => void;
};

export type {
	CacheHandler,
};
