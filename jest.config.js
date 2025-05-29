/** @type {import('ts-jest').JestConfigWithTsJest} **/
module.exports = {
  transform: {
    "^.+\.tsx?$": ["ts-jest",{}],
  },

  extensionsToTreatAsEsm: ['.ts', '.tsx'],
  testPathIgnorePatterns: [
    '<rootDir>/.npm_cache/',
    '<rootDir>/node_modules/',
    '<rootDir>/packages/',
  ],
  roots: ['./'],
  maxWorkers: 1,

  testEnvironment: "node",

  // Coverage settings.
  collectCoverage: true,
  coverageReporters: ['lcov', 'text-summary', 'html'],
  // Note: patterns use micromatch syntax: https://github.com/micromatch/micromatch
  // This tool was helpful when writing these: https://globster.xyz/
  collectCoverageFrom: [
    // Collect coverage from all TS & TSX files.
    'src/**/*.ts',
    'src/**/*.tsx',
    '!src/scripts/**',
  ],
};