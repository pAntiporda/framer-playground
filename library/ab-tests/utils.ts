import {useEffect, useState} from 'react';
import {isFailure, isPending, pending, success} from '@growthops/ext-ts';
import type {Result} from '@growthops/ext-ts';
import type {ABTestDTO} from '@app/data/ab-test';
import {nullCacheHandler as noop} from '@app/library/ab-tests/cache/null';
import {localStorageCacheHandler as local} from '@app/library/ab-tests/cache/local-storage';
import type {CacheHandler} from '@app/library/ab-tests/cache/types';

type ValueGuardCallback<T> = (value: unknown) => value is T;

const getABTest = <T>(
	test: Result<ABTestDTO>, fallback: T, guardCallback: ValueGuardCallback<T>, cacheHandler: CacheHandler = noop,
): T => {
	if (isFailure(test)) {
		console.error(test.message, test.data);

		return fallback;
	}

	if (isPending(test)) {
		return fallback;
	}

	const cachedValue = cacheHandler.get<T>(test.data.key, test.data.cacheId, test.data.cacheLifetime);

	if (guardCallback(cachedValue)) {
		return cachedValue;
	}

	if (!guardCallback(test.data.valueA) || !guardCallback(test.data.valueB)) {
		console.error('The remote AB test configuration is malformed', test.data);

		return fallback;
	}

	const enviroment = process.env.VERCEL_ENV ?? 'development';

	const targetEnvironment = test.data.environmentProbabilities.find(
		environmentProbability => environmentProbability.environment === enviroment,
	);

	if (targetEnvironment === undefined) {
		return fallback;
	}

	const randomChance = Math.random() * 100;
	const value = randomChance > targetEnvironment.probability ? test.data.valueA : test.data.valueB;

	cacheHandler.set(test.data.key, value, test.data.cacheId, test.data.cacheLifetime);

	return value;
};

const useABTest = <T>(
	test: Result<ABTestDTO>, fallback: T, guardCallback: ValueGuardCallback<T>, cacheHandler: CacheHandler = local,
): Result<T> => {
	const [value, setValue] = useState<Result<T>>(pending());

	useEffect(() => {
		const value = getABTest<T>(test, fallback, guardCallback, cacheHandler);
		setValue(success(value));
	}, []);

	return value;
};

export {
	getABTest,
	useABTest,
};
