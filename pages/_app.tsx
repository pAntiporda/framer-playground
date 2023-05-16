import {useEffect} from 'react';
import type {AppProps} from 'next/app';
import {initializeGTM} from '@app/integrations/google-tag-manager';
// import {LDClientProvider} from '@app/integrations/launchdarkly-client';
import {PreviewMode, ProgressBar} from '@app/components';
import '@app/public/app.css';

const MyApp = ({Component, pageProps}: AppProps): JSX.Element => {
	useEffect(() => {
		initializeGTM();
	}, []);

	return (
		// Enable the LDClientProvider only when client-side LD flags are required.
		// For the majority of use cases, you should utilise server-side flags.
		// <LDClientProvider>
		<ProgressBar>
			<Component {...pageProps}/>
			<PreviewMode disableUrl="/api/preview-mode/disable"/>
		</ProgressBar>
		// </LDClientProvider>
	);
};

export default MyApp;
