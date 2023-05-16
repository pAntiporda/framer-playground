import {useMemo} from 'react';
import type {Result} from '@growthops/ext-ts';
import {isFailure, isPending} from '@growthops/ext-ts';
import type {FeatureFlagDTO} from '@app/data/feature-flag';
import localFlags from '@app/flags.json';

type ValueGuardCallback<T> = (value: unknown) => value is T;

type LocalFlag = keyof typeof localFlags;

const getFlag = <T>(flag: Result<FeatureFlagDTO>, fallback: T, guardCallback: ValueGuardCallback<T>): T => {
	if (isFailure(flag)) {
		console.error(flag.message, flag.data);

		return fallback;
	}

	if (isPending(flag)) {
		return fallback;
	}

	const localFlag = localFlags[flag.data.key as LocalFlag];

	if (guardCallback(localFlag)) {
		return localFlag;
	}

	const enviroment = process.env.VERCEL_ENV ?? 'development';

	const allEnvironmentValuesAreValid = flag.data.environmentValues.every(
		environmentValue => guardCallback(environmentValue.value),
	);

	if (!allEnvironmentValuesAreValid) {
		console.error('The remote feature flag configuration is malformed', flag.data);

		return fallback;
	}

	const targetEnvironment = flag.data.environmentValues.find(
		environmentValue => environmentValue.environment === enviroment,
	);

	if (targetEnvironment === undefined) {
		return fallback;
	}

	return targetEnvironment.value as T;
};

const useFlag = <T>(flag: Result<FeatureFlagDTO>, fallback: T, guardCallback: ValueGuardCallback<T>): T => useMemo(
	() => getFlag<T>(flag, fallback, guardCallback),
	[flag, fallback],
);

export {
	getFlag,
	useFlag,
};
