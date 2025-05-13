/* eslint-disable import-x/no-nodejs-modules */
import {readFileSync} from 'node:fs';
import {join} from 'node:path';
import {pathsToModuleNameMapper} from 'ts-jest';
import type {MapLike} from 'typescript';

// eslint-disable-next-line @typescript-eslint/naming-convention
const {compilerOptions} = JSON.parse(
   readFileSync(join(__dirname, 'tsconfig.json'), 'utf-8'),
) as {
   compilerOptions: {
      paths: MapLike<string[]>;
   };
};

// eslint-disable-next-line import-x/no-anonymous-default-export
export default {
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
