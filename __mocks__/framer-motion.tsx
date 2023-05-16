import {forwardRef} from 'react';
import filterInvalidDOMProps from 'filter-invalid-dom-props';

const motion = {
	// eslint-disable-next-line react/display-name
	div: forwardRef<HTMLDivElement, React.ComponentPropsWithoutRef<'div'>>((properties: React.ComponentPropsWithoutRef<'div'>, reference): JSX.Element => {
		return (
			<div ref={reference} {...filterInvalidDOMProps(properties)}>
				{properties.children}
			</div>
		);
	}),
	// eslint-disable-next-line react/display-name
	span: forwardRef<HTMLSpanElement, React.ComponentPropsWithoutRef<'span'>>((properties: React.ComponentPropsWithoutRef<'span'>, reference): JSX.Element => {
		return (
			<span ref={reference} {...filterInvalidDOMProps(properties)}>
				{properties.children}
			</span>
		);
	}),
	// eslint-disable-next-line react/display-name
	button: forwardRef<HTMLButtonElement, React.ComponentPropsWithoutRef<'button'>>((properties: React.ComponentPropsWithoutRef<'button'>, reference): JSX.Element => {
		return (
			// eslint-disable-next-line react/button-has-type
			<button ref={reference} {...filterInvalidDOMProps(properties)}>
				{properties.children}
			</button>
		);
	}),
	// eslint-disable-next-line react/display-name
	iframe: forwardRef<HTMLIFrameElement, React.ComponentPropsWithoutRef<'iframe'>>((properties: React.ComponentPropsWithoutRef<'iframe'>, reference): JSX.Element => {
		return (
			// eslint-disable-next-line jsx-a11y/iframe-has-title
			<iframe ref={reference} {...filterInvalidDOMProps(properties)}>
				{properties.children}
			</iframe>
		);
	}),
	// eslint-disable-next-line react/display-name
	a: forwardRef<HTMLAnchorElement, React.ComponentPropsWithoutRef<'a'>>((properties: React.ComponentPropsWithoutRef<'a'>, reference): JSX.Element => {
		return (
			// eslint-disable-next-line react/jsx-no-target-blank, jsx-a11y/anchor-has-content
			<a ref={reference} {...filterInvalidDOMProps(properties)}>
				{properties.children}
			</a>
		);
	}),
	// eslint-disable-next-line react/display-name
	label: forwardRef<HTMLLabelElement, React.ComponentPropsWithoutRef<'label'>>((properties: React.ComponentPropsWithoutRef<'label'>, reference): JSX.Element => {
		return (
			// eslint-disable-next-line jsx-a11y/label-has-associated-control
			<label ref={reference} {...filterInvalidDOMProps(properties)}>
				{properties.children}
			</label>
		);
	}),
	// eslint-disable-next-line react/display-name
	hr: forwardRef<HTMLHRElement, React.ComponentPropsWithoutRef<'hr'>>((properties: React.ComponentPropsWithoutRef<'hr'>, reference): JSX.Element => {
		return (
			<hr ref={reference} {...filterInvalidDOMProps(properties)}/>
		);
	}),
	// eslint-disable-next-line react/display-name
	li: forwardRef<HTMLLIElement, React.ComponentPropsWithoutRef<'li'>>((properties: React.ComponentPropsWithoutRef<'li'>, reference): JSX.Element => {
		return (
			<li ref={reference} {...filterInvalidDOMProps(properties)}>
				{properties.children}
			</li>
		);
	}),
	// eslint-disable-next-line react/display-name
	nav: forwardRef<HTMLDivElement, React.ComponentPropsWithoutRef<'nav'>>((properties: React.ComponentPropsWithoutRef<'nav'>, reference): JSX.Element => {
		return (
			<nav ref={reference} {...filterInvalidDOMProps(properties)}>
				{properties.children}
			</nav>
		);
	}),
};

const AnimatePresence = (): JSX.Element => {
	return (
		<div>
			{/*  */}
		</div>
	);
};

type Scroll = {
	onChange: (callback: unknown) => () => void;
	get: () => number;
	getPrevious: () => number;
};

type UseScroll = {
	scrollY: Scroll;
	scrollX: Scroll;
};

const useScroll = (): UseScroll => {
	const scroll: Scroll = {
		// eslint-disable-next-line @typescript-eslint/no-empty-function, unicorn/consistent-function-scoping
		onChange: (_callback: unknown) => () => {},
		get: () => 0,
		getPrevious: () => 0,
	};

	return {
		scrollY: scroll,
		scrollX: scroll,
	};
};

const useTransform = (_value: unknown, _input: unknown, _output: unknown, _options: Record<string, unknown>): number => {
	return 0;
};

export {
	motion,
	useScroll,
	useTransform,
	AnimatePresence,
};
