import type {NextApiRequest, NextApiResponse} from 'next';
import type {RedirectDTO} from '@app/data/redirect';
import {getRedirectData, getRedirectRegexesData} from '@app/data';

type RedirectResponseData = {
	type: 'HIT';
	data: RedirectDTO;
} | {
	type: 'MISS';
};

const sendResponse = <T>(response: NextApiResponse<T>, data: T): void => {
	response
		.setHeader('cache-control', `s-maxage=${process.env.REDIRECT_CACHE_TIME ?? '600'}, stale-while-revalidate=1`)
		.status(200)
		.json(data);
};

export default async function preview(request: NextApiRequest, response: NextApiResponse<RedirectResponseData>): Promise<void> {
	const query = request.query.segments as string[];
	const url = `/${query.join('/')}`;

	const redirect = await getRedirectData(request.preview ?? false, url);

	if (redirect !== undefined) {
		sendResponse(response, {type: 'HIT', data: redirect});

		return;
	}

	const redirectRegexes = await getRedirectRegexesData(request.preview ?? false);

	for (const redirectRegex of redirectRegexes) {
		// Automatically add ^ and $ to the final regex and remove ^ and $ from the oldUrl if they exist.
		const regex = new RegExp(`^${redirectRegex.oldUrl.replaceAll(/^\^|\$$/g, '')}$`);

		if (url.match(regex) !== null) {
			sendResponse(response, {type: 'HIT', data: redirectRegex});

			return;
		}
	}

	sendResponse(response, {type: 'MISS'});
}

export type {
	RedirectResponseData,
};
