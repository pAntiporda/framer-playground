import {useRive, useStateMachineInput} from '@rive-app/react-canvas';
import {Container, Region} from '@app/components';
import {useInView, useMotionValueEvent, useScroll} from 'framer-motion';
import {notNil} from '@growthops/ext-ts';
import {useEffect, useRef} from 'react';

const RivePage = (): JSX.Element => {
	const {scrollYProgress} = useScroll();
	const rocketTriggerReference = useRef(null);
	const isTriggerInView = useInView(rocketTriggerReference);

	const {rive: tree, RiveComponent: TreeComponent} = useRive({
		src: 'rive/tree_demo.riv',
		stateMachines: 'State Machine 1',
		autoplay: true,
	});

	const {RiveComponent: SkullFaceComponent} = useRive({
		src: 'rive/skullface.riv',
		stateMachines: 'State Machine [Skully]',
		autoplay: true,
	});

	const {rive: rocket, RiveComponent: RocketComponent} = useRive({
		src: 'rive/rocket.riv',
		stateMachines: 'Rocket',
		autoplay: true,
	});

	const growthInput = useStateMachineInput(tree, 'State Machine 1', 'input');
	const rocketTrigger = useStateMachineInput(rocket, 'Rocket', 'trigger');
	const isRocketTakingOff = useStateMachineInput(rocket, 'Rocket', 'takeoff');

	useMotionValueEvent(scrollYProgress, 'change', (latest) => {
		if (notNil(growthInput) && notNil(tree)) {
			growthInput.value = latest * 100;
		}
	});

	useEffect(() => {
		if (rocketTrigger === null) {
			return;
		}

		rocketTrigger.fire();
	}, [rocketTrigger]);

	useEffect(() => {
		if (rocketTrigger === null || isRocketTakingOff === null) {
			return;
		}

		isRocketTakingOff.value = isTriggerInView;
	}, [rocketTrigger, isRocketTakingOff, isTriggerInView]);

	return (
		<main className="bg-gray-900 min-h-screen text-white py-32 relative">
			<div className="fixed inset-0 flex justify-between">
				<div className="w-1/4 h-full">
					<TreeComponent/>
				</div>
				<div className="w-1/5 h-1/2">
					<RocketComponent/>
				</div>
			</div>
			<div className="relative z-10">
				<Region hasTopMargin={false}>
					<Container>
						<div className="bg-purple-600 w-full h-96"/>
					</Container>
				</Region>
				<Region>
					<Container>
						<div className="bg-pink-600 w-full h-96"/>
					</Container>
				</Region>
				<Region>
					<Container>
						<div className="bg-rose-600 w-full h-96"/>
					</Container>
				</Region>
				<Region>
					<Container>
						<div ref={rocketTriggerReference} className="bg-lime-600 w-full h-screen flex items-center justify-center">
							<p className="text-5xl font-semibold">LIFT OFF!</p>
						</div>
					</Container>
				</Region>
				<Region>
					<Container>
						<div className="bg-indigo-600 w-full h-96"/>
					</Container>
				</Region>
				<Region>
					<Container>
						<div className="bg-sky-600 w-full h-96"/>
					</Container>
				</Region>
				<Region>
					<Container>
						<div className="bg-teal-600 w-full h-96"/>
					</Container>
				</Region>
				<Region>
					<div className="w-full h-full min-h-screen relative">
						<div className="absolute inset-0">
							<SkullFaceComponent/>
						</div>
					</div>
				</Region>
			</div>
		</main>
	);
};

export default RivePage;
