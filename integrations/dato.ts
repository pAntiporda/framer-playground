import {notNil} from '@growthops/ext-ts';
import {GraphQLClient} from 'graphql-request';

type DatoRequest = {
	query: string;
	variables?: Record<string, unknown>;
	preview?: boolean;
};

const request = async <T>({query, variables, preview = false}: DatoRequest): Promise<T | void> => {
	const endpoint = process.env.VERCEL_ENV === 'preview' || process.env.NODE_ENV === 'development' || preview
		? 'https://graphql.datocms.com/preview'
		: 'https://graphql.datocms.com/';

	if (notNil(process.env.DATO_CMS_TOKEN)) {
		const client = new GraphQLClient(endpoint, {
			headers: {
				authorization: `Bearer ${process.env.DATO_CMS_TOKEN}`,
			},
		});

		return client.request<T>(query, variables);
	}
};

export default request;
