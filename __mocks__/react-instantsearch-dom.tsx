/* eslint-disable react/display-name */
const InstantSearch = ({children}: {children: unknown}): typeof children => children;
const Configure = ({children}: {children: unknown}): typeof children => children;
const Snippet = ({children}: {children: unknown}): typeof children => children;

const connectSearchBox = () => (): JSX.Element => <div/>;
const connectStateResults = () => (): JSX.Element => <div/>;
const connectInfiniteHits = () => (): JSX.Element => <div/>;

connectSearchBox.displayName = 'connectSearchBox';
connectStateResults.displayName = 'connectStateResults';
connectInfiniteHits.displayName = 'connectInfiniteHits';

export {
	InstantSearch,
	Configure,
	Snippet,
	connectSearchBox,
	connectStateResults,
	connectInfiniteHits,
};
