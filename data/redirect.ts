import {v4 as uuidv4} from 'uuid';
import request from '@app/integrations/dato';
import type {DTO} from './dto';

type RedirectDTO = DTO & {
	oldUrl: string;
	newUrl: string;
	permanent: boolean;
};

type RedirectQuery = {
	oldUrl: string;
	newUrl: string;
	permanent: boolean;
};

type Query = {
	redirect: RedirectQuery | null;
};

type QueryRegexes = {
	allRedirects: RedirectQuery[];
};

const fields = `
	newUrl
	oldUrl
	permanent
`;

const query = `
	query($oldUrl: String!) {
		redirect(filter: {oldUrl: {eq: $oldUrl}}) {
			${fields}
		}
	}
`;

const queryRegexes = `
	query {
		allRedirects(filter: {useRegexPattern: {eq: "true"}}) {
			${fields}
		}
	}
`;

const formatData = (data: RedirectQuery): RedirectDTO => ({
	id: uuidv4(),
	type: 'redirect',
	oldUrl: data.oldUrl,
	newUrl: data.newUrl,
	permanent: data.permanent,
});

const getData = async (preview: boolean, oldUrl: string): Promise<RedirectDTO | undefined> => {
	const data = await request<Query>({query, variables: {oldUrl}, preview});

	if (data.redirect === null) {
		return undefined;
	}

	return formatData(data.redirect);
};

const getDataRegexes = async (preview: boolean): Promise<RedirectDTO[]> => {
	const data = await request<QueryRegexes>({query: queryRegexes, preview});

	return data.allRedirects.map(redirect => formatData(redirect));
};

export {
	formatData,
	getData,
	getDataRegexes,
};

export type {
	RedirectDTO,
	RedirectQuery,
	Query,
	QueryRegexes,
};
