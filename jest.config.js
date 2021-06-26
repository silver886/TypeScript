module.exports = {
    testEnvironment: 'node',
    roots: [
        '<rootDir>/dist/test', // Use lib for npm package.
    ],
    testMatch: [
        '**/*.test.js',
    ],
};
