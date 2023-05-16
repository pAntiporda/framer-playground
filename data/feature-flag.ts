import {v4 as uuidv4} from 'uuid';
import type {Result} from '@growthops/ext-ts';
import {failure, success} from '@growthops/ext-ts';
import request from '@app/integrations/dato';
import type {DTO} from './dto';

type EnvironmentValue = {
	environment: string;
	value: unknown;
};

type FeatureFlagDTO = DTO & {
	name: string;
	key: string;
	environmentValues: EnvironmentValue[];
};

type EnvironmentValueQuery = {
	environment: string;
	value: unknown;
};

type FeatureFlagQuery = {
	name: string;
	key: string;
	environmentValues: EnvironmentValueQuery[];
};

type Query = {
	featureFlag: FeatureFlagQuery | null;
};

const fields = `
	name
	key
	environmentValues {
		environment
		value
	}
`;

const query = `
	query($key: String!) {
		featureFlag(filter: {key: {eq: $key}}) {
			${fields}
		}
	}
`;

const formatEnvironmentValue = (data: EnvironmentValueQuery): EnvironmentValue => ({
	environment: data.environment,
	value: data.value,
});

const formatData = (data: FeatureFlagQuery): FeatureFlagDTO => ({
	id: uuidv4(),
	type: 'feature-flag',
	name: data.name,
	key: data.key,
	environmentValues: data.environmentValues.map(data => formatEnvironmentValue(data)),
});

const getData = async (preview: boolean, key: string): Promise<Result<FeatureFlagDTO>> => {
	const data = await request<Query>({query, variables: {key}, preview});

	if (data.featureFlag === null) {
		return failure('Feature flag not found', {key});
	}

	return success(formatData(data.featureFlag));
};

export default getData;

export {
	fields,
	query,
	formatEnvironmentValue,
	formatData,
};

export type {
	EnvironmentValue,
	EnvironmentValueQuery,
	FeatureFlagDTO,
	FeatureFlagQuery,
	Query,
};
