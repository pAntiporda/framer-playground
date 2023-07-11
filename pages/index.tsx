import type {GetStaticProps} from 'next';
import Head from 'next/head';
import Link from 'next/link';
import {renderMetaTags} from 'react-datocms';
import {ChevronRightIcon, CommandLineIcon} from '@heroicons/react/24/solid';
import {getHomeData} from '@app/data';
import type {HomeDTO} from '@app/data/home';
import {revalidateSuccess} from '@app/library';
import {Card, Container, Heading, Region} from '@app/components';
import {generateDatoTestImage, notNil} from '@growthops/ext-ts';
import {Vercel} from '@app/components/svg';
import {useCallback, useEffect, useRef, useState} from 'react';
import {useScroll, motion, useTransform, MotionConfig} from 'framer-motion';

type IndexProperties = {
	data: HomeDTO;
};

const classes = {
	root: 'flex items-center justify-center h-screen bg-gray-900 relative',
	main: 'text-center relative',
	heading: 'flex items-center justify-center space-x-2 text-gray-200 text-5xl font-medium',
	introduction: 'mt-4 text-gray-500 font-bold',
	showcaseLink: `
		inline-flex
		items-center
		shadow-lg
		text-sm
		font-bold
		rounded-full
		text-green-400
		relative
		overflow-hidden
	`,
};

const buttonVariants = {
	hover: {
		width: '100%',
	},
};

const labelContainerVariants = {
	hover: {
		x: 16,
	},
};

const buttonLabelVariants = {
	hover: {
		color: '#000',
		transition: {
			duration: 0.8,
		},
	},
};

const sidebarVariants = {
	open: (height = 1000) => ({
		clipPath: `circle(${height * 2 + 100}px at 40px 40px)`,
		transition: {
			type: 'spring',
			stiffness: 20,
			restDelta: 2,
		},
	}),
	closed: {
		clipPath: 'circle(30px at 40px 40px)',
		transition: {
			delay: 0.5,
			type: 'spring',
			stiffness: 400,
			damping: 40,
		},
	},
};

const navContainerVariants = {
	open: {
		transition: {staggerChildren: 0.07, delayChildren: 0.2},
	},
	closed: {
		transition: {staggerChildren: 0.05, staggerDirection: -1},
	},
};

const navItemVariants = {
	open: {
		y: 0,
		opacity: 1,
		transition: {
			y: {stiffness: 1000, velocity: -100},
		},
	},
	closed: {
		y: 50,
		opacity: 0,
		transition: {
			y: {stiffness: 1000},
		},
	},
};

// const transition = {duration: 4, yoyo: Number.POSITIVE_INFINITY, ease: 'easeInOut'};

const Index = ({data}: IndexProperties): JSX.Element => {
	const heroReference = useRef(null);
	const {scrollYProgress: heroScrollYProgress} = useScroll({target: heroReference, offset: ['start start', 'end start']});
	const {scrollYProgress: windowScrollYProgress} = useScroll();
	const y = useTransform(heroScrollYProgress, [0, 1], ['0%', '100%']);
	const [isOpen, setIsOpen] = useState(false);
	const [height, setHeight] = useState<number>();

	const handleToggleNav = useCallback(() => {
		setIsOpen(current => !current);
	}, []);

	useEffect(() => {
		if (notNil(window)) {
			setHeight(window.innerHeight);
		}
	}, []);

	return (
		<div className="relative">
			<motion.nav
				initial={false}
				animate={isOpen ? 'open' : 'closed'}
				custom={notNil(height) ? height : undefined}
			>
				<motion.div className="fixed inset-0 bg-white" variants={sidebarVariants}/>
				<motion.ul className="absolute" variants={navContainerVariants}>
					<motion.li variants={navItemVariants}><Heading variant="heading-one" label="Test One"/></motion.li>
					<motion.li variants={navItemVariants}><Heading variant="heading-one" label="Test Two"/></motion.li>
					<motion.li variants={navItemVariants}><Heading variant="heading-one" label="Test Three"/></motion.li>
				</motion.ul>
				<button type="button" className="" onClick={handleToggleNav}>
					<svg width="23" height="23" viewBox="0 0 23 23">
						<motion.path
							fill="transparent"
							strokeWidth="3"
							stroke="hsl(0, 0%, 18%)"
							strokeLinecap="round"
							variants={{
								closed: {d: 'M 2 2.5 L 20 2.5'},
								open: {d: 'M 3 16.5 L 17 2.5'},
							}}
						/>
						<motion.path
							fill="transparent"
							strokeWidth="3"
							stroke="hsl(0, 0%, 18%)"
							strokeLinecap="round"
							d="M 2 9.423 L 20 9.423"
							variants={{
								closed: {opacity: 1},
								open: {opacity: 0},
							}}
							transition={{duration: 0.1}}
						/>
						<motion.path
							fill="transparent"
							strokeWidth="3"
							stroke="hsl(0, 0%, 18%)"
							strokeLinecap="round"
							variants={{
								closed: {d: 'M 2 16.346 L 20 16.346'},
								open: {d: 'M 3 2.5 L 17 16.346'},
							}}
						/>
					</svg>
				</button>
			</motion.nav>
			<motion.div style={{scaleY: windowScrollYProgress}} className="fixed z-40 top-0 left-0 bottom-0 w-4 bg-white origin-top-left"/>
			<div className="absolute top-0 bottom-0 z-40 py-16">
				<motion.svg
					viewBox="0 0 133 1369"
					fill="none"
					xmlns="http://www.w3.org/2000/svg"
					className="h-full"
				>
					<motion.path
						d="M30.7544 2.49414C30.7544 19.1318 33.6156 36.5953 33.6156 53.9972C33.6156 69.6339 27.8931 84.2427 27.8931 98.347C27.8931 106.261 22.1705 113.033 22.1705 121.237C22.1705 128.636 20.4029 137.884 19.1503 145.399C16.9068 158.86 10.7254 175.097 10.7254 188.477C10.7254 204.788 5.00285 220.519 5.00285 237.119C5.00285 254.817 5.00285 272.514 5.00285 290.212C5.00285 307.803 5.00285 325.395 5.00285 342.986C5.00285 364.024 30.572 374.305 46.6504 381.614C61.0725 388.169 93.7025 383.134 93.7025 363.015C93.7025 348.079 80.5067 330.569 67.951 323.593C59.5247 318.912 53.4756 317.794 44.4249 315.009C31.1293 310.919 35.0398 319.031 30.1185 325.183C21.0771 336.485 18.2361 356.634 12.156 370.01C0.763829 395.073 -8.08355 439.585 22.1705 458.073C29.4366 462.514 35.8683 473.997 42.1995 480.328C48.1757 486.304 58.8997 494.298 62.2284 501.787C65.7931 509.808 75.4729 520.451 80.9857 527.539C88.1996 536.814 90.772 547.123 94.3384 558.218C100.535 577.497 95.4159 607.766 82.2574 623.392C71.446 636.23 50.4724 650.187 32.185 646.123C-10.666 636.601 14.1376 562.345 59.3672 582.698C77.1431 590.697 102.286 596.513 102.286 620.531C102.286 652.685 90.7021 684.641 84.9597 716.224C81.8235 733.474 74.4341 752.028 67.3152 768.045C63.5205 776.583 62.4617 785.507 60.003 795.069C56.4222 808.994 47.3472 822.728 45.2197 836.557C43.7863 845.874 39.6105 862.677 35.0463 870.893C28.2052 883.207 30.7544 902.786 30.7544 916.514C30.7544 946.764 25.4496 974.76 52.055 992.497C65.1842 1001.25 68.9942 997.246 70.1764 1013.8C70.4859 1018.13 65.9585 1043.71 70.8123 1044C77.9379 1044.42 86.1513 1047.15 91.4771 1051.95C99.0968 1058.81 106.532 1058.42 113.731 1065.62C128.686 1080.57 130.899 1079.73 130.899 1101.07C130.899 1128.44 111.61 1133.27 89.5696 1141.28C55.5944 1153.64 27.1653 1165.16 19.9451 1204.87C13.3353 1241.22 23.9658 1282.37 43.6301 1312.96C51.8284 1325.71 66.1609 1352.84 56.5059 1367.32"
						stroke="white"
						strokeWidth="3"
						strokeLinecap="round"
						style={{pathLength: windowScrollYProgress}}
					/>
				</motion.svg>
				<motion.div
					className="w-14 h-14 rounded-xl absolute bg-white"
					style={{offsetPath: 'path("M30.7544 2.49414C30.7544 19.1318 33.6156 36.5953 33.6156 53.9972C33.6156 69.6339 27.8931 84.2427 27.8931 98.347C27.8931 106.261 22.1705 113.033 22.1705 121.237C22.1705 128.636 20.4029 137.884 19.1503 145.399C16.9068 158.86 10.7254 175.097 10.7254 188.477C10.7254 204.788 5.00285 220.519 5.00285 237.119C5.00285 254.817 5.00285 272.514 5.00285 290.212C5.00285 307.803 5.00285 325.395 5.00285 342.986C5.00285 364.024 30.572 374.305 46.6504 381.614C61.0725 388.169 93.7025 383.134 93.7025 363.015C93.7025 348.079 80.5067 330.569 67.951 323.593C59.5247 318.912 53.4756 317.794 44.4249 315.009C31.1293 310.919 35.0398 319.031 30.1185 325.183C21.0771 336.485 18.2361 356.634 12.156 370.01C0.763829 395.073 -8.08355 439.585 22.1705 458.073C29.4366 462.514 35.8683 473.997 42.1995 480.328C48.1757 486.304 58.8997 494.298 62.2284 501.787C65.7931 509.808 75.4729 520.451 80.9857 527.539C88.1996 536.814 90.772 547.123 94.3384 558.218C100.535 577.497 95.4159 607.766 82.2574 623.392C71.446 636.23 50.4724 650.187 32.185 646.123C-10.666 636.601 14.1376 562.345 59.3672 582.698C77.1431 590.697 102.286 596.513 102.286 620.531C102.286 652.685 90.7021 684.641 84.9597 716.224C81.8235 733.474 74.4341 752.028 67.3152 768.045C63.5205 776.583 62.4617 785.507 60.003 795.069C56.4222 808.994 47.3472 822.728 45.2197 836.557C43.7863 845.874 39.6105 862.677 35.0463 870.893C28.2052 883.207 30.7544 902.786 30.7544 916.514C30.7544 946.764 25.4496 974.76 52.055 992.497C65.1842 1001.25 68.9942 997.246 70.1764 1013.8C70.4859 1018.13 65.9585 1043.71 70.8123 1044C77.9379 1044.42 86.1513 1047.15 91.4771 1051.95C99.0968 1058.81 106.532 1058.42 113.731 1065.62C128.686 1080.57 130.899 1079.73 130.899 1101.07C130.899 1128.44 111.61 1133.27 89.5696 1141.28C55.5944 1153.64 27.1653 1165.16 19.9451 1204.87C13.3353 1241.22 23.9658 1282.37 43.6301 1312.96C51.8284 1325.71 66.1609 1352.84 56.5059 1367.32")'}}
				/>
			</div>
			<div ref={heroReference} className={classes.root}>
				<div className="absolute inset-0 flex justify-center items-start">
					<motion.div style={{y}} className="ml-auto h-1/2 w-1/2">
						<Vercel className="text-white stroke-current w-full h-full"/>
					</motion.div>
				</div>
				<Head>{renderMetaTags(data.seo)}</Head>
				<main className={classes.main}>
					<h1 className={classes.heading}>
						<CommandLineIcon className="animate-pulse w-12"/>
						<span>{data.heading}</span>
					</h1>
					<p className={classes.introduction}>{data.introduction}</p>
					<div className="flex flex-col mt-6 gap-y-6">
						<Link legacyBehavior href="/build/showcase">
							<a>
								<MotionConfig transition={{duration: 0.4, type: 'tween'}}>
									<motion.div whileHover="hover" className={classes.showcaseLink}>
										<motion.span variants={buttonVariants} className="absolute top-0 right-4 bottom-0 bg-white rounded-full rounded-r-none"/>
										<motion.span variants={labelContainerVariants} className="relative inline-block mr-4">
											<motion.span variants={buttonLabelVariants}>
												{data.viewShowcaseLabel}
											</motion.span>
										</motion.span>
										<span className="relative bg-white rounded-full p-2.5 text-gray-700">
											<ChevronRightIcon className="w-5"/>
										</span>
									</motion.div>
								</MotionConfig>
							</a>
						</Link>
						<Link legacyBehavior href="/rive">
							<a>
								<MotionConfig transition={{duration: 0.4, type: 'tween'}}>
									<motion.div whileHover="hover" className={classes.showcaseLink}>
										<motion.span variants={buttonVariants} className="absolute top-0 right-4 bottom-0 bg-white rounded-full rounded-r-none"/>
										<motion.span variants={labelContainerVariants} className="relative inline-block mr-4">
											<motion.span variants={buttonLabelVariants}>
											Rive playground
											</motion.span>
										</motion.span>
										<span className="relative bg-white rounded-full p-2.5 text-gray-700">
											<ChevronRightIcon className="w-5"/>
										</span>
									</motion.div>
								</MotionConfig>
							</a>
						</Link>
					</div>
				</main>
			</div>
			<Region hasTopMargin={false} className="bg-neutral-700 pt-16 relative">
				<Container>
					<div className="grid grid-cols-3 gap-8">
						{[1, 2, 3, 4, 5, 6].map(item => (
							<Link key={item} href="/">
								<Card
									isFramed
									image={generateDatoTestImage(600, 'display', 1025)}
									heading={`Test ${item}`}
									content="Lorem ipsum dolor sit amet consectetur adipiscing elit aenean sociis magnis, tempus euismod et volutpat bibendum sodales dapibus tristique eget inceptos, magna aliquam accumsan himenaeos dui erat eleifend nibh laoreet."
								/>
							</Link>
						))}
					</div>
				</Container>
			</Region>
			{/* Framer Sample */}
			{/* <Region hasTopMargin={false} className="bg-black pt-16">
				<div className="relative">
					<svg xmlns="http://www.w3.org/2000/svg" width="451" height="437">
						<motion.path
							d="M 239 17 C 142 17 48.5 103 48.5 213.5 C 48.5 324 126 408 244 408 C 362 408 412 319 412 213.5 C 412 108 334 68.5 244 68.5 C 154 68.5 102.68 135.079 99 213.5 C 95.32 291.921 157 350 231 345.5 C 305 341 357.5 290 357.5 219.5 C 357.5 149 314 121 244 121 C 174 121 151.5 167 151.5 213.5 C 151.5 260 176 286.5 224.5 286.5 C 273 286.5 296.5 253 296.5 218.5 C 296.5 184 270 177 244 177 C 218 177 197 198 197 218.5 C 197 239 206 250.5 225.5 250.5 C 245 250.5 253 242 253 218.5"
							fill="transparent"
							strokeWidth="12"
							stroke="rgba(255, 255, 255, 0.69)"
							strokeLinecap="round"
							initial={{pathLength: 0}}
							animate={{pathLength: 1}}
							transition={transition}
						/>
					</svg>
					<motion.div
						className="w-14 h-14 rounded-xl absolute bg-white top-0 left-0"
						initial={{offsetDistance: '0%', scale: 2.5}}
						animate={{offsetDistance: '100%', scale: 1}}
						transition={transition}
						style={{offsetPath: 'path("M 239 17 C 142 17 48.5 103 48.5 213.5 C 48.5 324 126 408 244 408 C 362 408 412 319 412 213.5 C 412 108 334 68.5 244 68.5 C 154 68.5 102.68 135.079 99 213.5 C 95.32 291.921 157 350 231 345.5 C 305 341 357.5 290 357.5 219.5 C 357.5 149 314 121 244 121 C 174 121 151.5 167 151.5 213.5 C 151.5 260 176 286.5 224.5 286.5 C 273 286.5 296.5 253 296.5 218.5 C 296.5 184 270 177 244 177 C 218 177 197 198 197 218.5 C 197 239 206 250.5 225.5 250.5 C 245 250.5 253 242 253 218.5")'}}
					/>
				</div>
			</Region> */}
		</div>
	);
};

const getStaticProps: GetStaticProps = async () => revalidateSuccess({
	data: await getHomeData(),
});

export {
	getStaticProps,
};

export default Index;
