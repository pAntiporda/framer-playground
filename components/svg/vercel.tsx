const Vercel = ({className}: {className?: string}): JSX.Element => (
	<svg
		className={className}
		shapeRendering="geometricPrecision"
		stroke="currentColor"
		strokeLinecap="round"
		strokeLinejoin="round"
		strokeWidth="1.5"
		viewBox="0 0 24 24"
	>
		<path clipRule="evenodd" d="M12 3 2 19h20L12 3Z" strokeWidth="1.5"/>
	</svg>
);

export default Vercel;
