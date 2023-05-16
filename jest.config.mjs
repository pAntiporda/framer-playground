import nextJest from 'next/jest.js';

const createJestConfig = nextJest({
	dir: './',
});

/** @type {import('jest').Config} */
const config = {
	setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
	testEnvironment: 'jest-environment-jsdom',
	collectCoverageFrom: [
		'components/**/{!(types|index),}.ts',
		'components/**/*.tsx',
		'components/**/*.js',
	],
};

export default createJestConfig(config);
