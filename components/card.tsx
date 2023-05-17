import {useMemo} from 'react';
import type {ResponsiveImageType} from 'react-datocms';
import {Image} from 'react-datocms';
import {isNil} from 'remeda';
import {collapse} from '@growthops/ext-ts';
import {Heading, Text} from '@app/components';
import {MotionConfig, motion} from 'framer-motion';

type CardProperties = {
	image: ResponsiveImageType;
	heading: string;
	content: string;
	isFramed?: boolean;
	hasAutoHeight?: boolean;
	meta?: JSX.Element;
};

const contentVariants = {
	hover: {
		x: '3%',
		y: '-3%',
	},
};

const generateRootClasses = (isFramed: boolean): string => `
	h-full
	flex
	flex-col
	relative
	rounded-2xl
	${isFramed ? 'shadow-lg' : ''}
`;

const generateBodyClasses = (isFramed: boolean): string => `
	flex
	flex-col
	flex-grow
	bg-white
	rounded-b-2xl
	${isFramed ? 'px-4 pb-3' : ''}
`;

const generateMetaClasses = (hasAutoHeight: boolean): string => `
	pt-6
	${hasAutoHeight ? 'mt-auto' : ''}
`;

const generateImageClasses = (isFramed: boolean): string => `
	w-full
	${isFramed ? '' : 'rounded-2xl shadow-lg'}
`;

const Card = ({image, heading, content, meta, isFramed = false, hasAutoHeight = false}: CardProperties): JSX.Element => {
	const classes = useMemo(() => ({
		root: collapse(generateRootClasses(isFramed)),
		image: collapse(generateImageClasses(isFramed)),
		body: collapse(generateBodyClasses(isFramed)),
		heading: 'mt-4',
		content: 'mt-2',
		meta: collapse(generateMetaClasses(hasAutoHeight)),
	}), [isFramed, hasAutoHeight]);

	return (
		<MotionConfig transition={{duration: 0.4, type: 'tween'}}>
			<motion.article
				className={classes.root}
				whileHover="hover"
			>
				<div className="bg-black absolute inset-0 rounded-2xl"/>
				<motion.div variants={contentVariants} className="relative">
					<div className="rounded-t-2xl overflow-hidden">
						<Image className={classes.image} data={image}/>
					</div>
					<div className={classes.body}>
						<Heading className={classes.heading} label={heading} variant="heading-four"/>
						<Text className={classes.content} variant="text-regular">{content}</Text>
						{!isNil(meta) && (
							<div className={classes.meta}>
								{meta}
							</div>
						)}
					</div>
				</motion.div>
			</motion.article>
		</MotionConfig>
	);
};

export default Card;

export type {
	CardProperties as CardProps,
};
