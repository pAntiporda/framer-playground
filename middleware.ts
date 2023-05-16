import {NextResponse} from 'next/server';
import type {NextRequest} from 'next/server';
import type {RedirectResponseData} from '@app/pages/api/redirects/[...segments]';

const middleware = async (request: NextRequest): Promise<NextResponse> => {
	const urlParts = request.url.split('/').filter(Boolean);

	if (urlParts.length < 2) {
		return NextResponse.next();
	}

	const appURL = `${urlParts[0]}//${urlParts[1]}`;
	const segments = urlParts.slice(2).join('/');

	const redirectResponse = await fetch(`${appURL}/api/redirects/${segments}`);

	if (redirectResponse.status !== 200) {
		return NextResponse.next();
	}

	const redirect = await redirectResponse.json() as RedirectResponseData;

	if (redirect.type === 'MISS') {
		return NextResponse.next();
	}

	return NextResponse.redirect(
		new URL(redirect.data.newUrl, appURL),
		redirect.data.permanent ? 308 : 307,
	);
};

const config = {
	matcher: '/:path*',
};

export {
	middleware,
	config,
};
