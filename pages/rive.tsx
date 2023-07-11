import {useRive, useStateMachineInput} from '@rive-app/react-canvas';
import {Container, Region} from '@app/components';
import {useMotionValueEvent, useScroll} from 'framer-motion';
import {notNil} from '@growthops/ext-ts';

const RivePage = (): JSX.Element => {
	const {scrollYProgress} = useScroll();

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

	const growthInput = useStateMachineInput(tree, 'State Machine 1', 'input');

	useMotionValueEvent(scrollYProgress, 'change', (latest) => {
		if (notNil(growthInput) && notNil(tree)) {
			growthInput.value = latest * 100;
		}
	});

	return (
		<main className="bg-gray-900 min-h-screen text-white py-32 relative">
			<div className="fixed inset-0 flex flex-col justify-end">
				<div className="w-1/4 h-full">
					<TreeComponent/>
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
