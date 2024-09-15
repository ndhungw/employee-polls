/** @type {import('ts-jest').JestConfigWithTsJest} **/
export default {
  transform: {
    "^.+\\.tsx?$": "ts-jest", // Use ts-jest to handle .ts and .tsx files
  },
  preset: "ts-jest",
  testEnvironment: "jsdom",
  setupFilesAfterEnv: ["@testing-library/jest-dom"],
  globals: {
    "ts-jest": {
      tsconfig: "tsconfig.app.json", // Point to your app-specific tsconfig
    },
  },
  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/src/$1", // Path alias resolution for Jest
  },
  moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json", "node"],
};
