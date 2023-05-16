import {v4 as uuidv4} from 'uuid';
import type {Result} from '@growthops/ext-ts';
import {failure, success} from '@growthops/ext-ts';
import request from '@app/integrations/dato';
import type {DTO} from './dto';

type EnvironmentProbability = {
	environment: string;
	probability: number;
};

type ABTestDTO = DTO & {
	name: string;
	key: string;
	cacheId: number;
	cacheLifetime: number;
	valueA: unknown;
	valueB: unknown;
	environmentProbabilities: EnvironmentProbability[];
};

type EnvironmentProbabilityQuery = {
	environment: string;
	probability: number;
};

type ABTestQuery = {
	name: string;
	key: string;
	cacheId: number;
	cacheLifetime: number;
	valueA: unknown;
	valueB: unknown;
	environmentProbabilities: EnvironmentProbabilityQuery[];
};

type Query = {
	abTest: ABTestQuery | null;
};

const fields = `
	name
	key
	cacheId
	cacheLifetime
	valueA
	valueB
	environmentProbabilities {
		environment
		probability
	}
`;

const query = `
	query ($key: String!) {
		abTest(filter: {key: {eq: $key}}) {
			${fields}
		}
	}
`;

const formatEnvironmentProbability = (data: EnvironmentProbabilityQuery): EnvironmentProbability => ({
	environment: data.environment,
	probability: data.probability,
});

const formatData = (data: ABTestQuery): ABTestDTO => ({
	id: uuidv4(),
	type: 'ab-test',
	name: data.name,
	key: data.key,
	cacheId: data.cacheId,
	cacheLifetime: data.cacheLifetime,
	valueA: data.valueA,
	valueB: data.valueB,
	environmentProbabilities: data.environmentProbabilities.map(data => formatEnvironmentProbability(data)),
});

const getData = async (preview: boolean, key: string): Promise<Result<ABTestDTO>> => {
	const data = await request<Query>({query, variables: {key}, preview});

	if (data.abTest === null) {
		return failure('AB test not found', {key});
	}

	return success(formatData(data.abTest));
};

export default getData;

export {
	fields,
	query,
	formatEnvironmentProbability,
	formatData,
};

export type {
	ABTestDTO,
	ABTestQuery,
	EnvironmentProbability,
	EnvironmentProbabilityQuery,
	Query,
};
