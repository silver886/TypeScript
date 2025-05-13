/* eslint-disable import-x/no-commonjs, import-x/unambiguous */
// eslint-disable-next-line @typescript-eslint/naming-convention, @typescript-eslint/no-require-imports
const {pathsToModuleNameMapper} = require('ts-jest');
// eslint-disable-next-line @typescript-eslint/naming-convention, @typescript-eslint/no-require-imports, import-x/extensions
const {compilerOptions} = require('./tsconfig.json');

module.exports = {
   preset: 'ts-jest',
   moduleNameMapper: pathsToModuleNameMapper(compilerOptions.paths, {
      prefix: '<rootDir>/',
   }),
   testEnvironment: 'node',
   clearMocks: true,
   collectCoverage: true,
   coverageReporters: ['json', 'lcov', 'clover', 'cobertura', 'text'],
   coverageDirectory: 'jest-reports/cobertura',
   testRegex: [
      `${__dirname}(/src/(.*/)?__tests__/.*|/(test|src)/(.*/)?.*\\.(test|spec))\\.[jt]sx?$`,
   ],
   coveragePathIgnorePatterns: ['/node_modules/'],
   testPathIgnorePatterns: ['/node_modules/'],
   watchPathIgnorePatterns: ['/node_modules/'],
   reporters: [
      'default',
      [
         'jest-junit',
         {
            titleTemplate: '{filepath} / {title}',
            outputDirectory: 'jest-reports/junit',
         },
      ],
   ],
   setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
};
