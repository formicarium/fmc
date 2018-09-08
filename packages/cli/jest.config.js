module.exports = {
  "roots": [
    "<rootDir>/src"
  ],
  "transform": {
    "^.+\\.tsx?$": "ts-jest"
  },
  "testRegex": "(/__tests__/.*|(\\.|/)(test|spec))\\.tsx?$",
  "moduleFileExtensions": [
    "ts",
    "tsx",
    "js",
    "jsx",
    "json",
    "node"
  ],
  "moduleNameMapper": {
    "commands/(.*)": "<rootDir>/src/commands/$1",
    "controllers/(.*)": "<rootDir>/src/controllers/$1"
  }
}

// module.exports = {
//   "roots": [
//     "<rootDir>/src"
//   ],
//   "transform": {
//     "^.+\\.tsx?$": "ts-jest"
//   },
//   "testRegex": "(/__tests__/.*|(\\.|/)(test|spec))\\.tsx?$",
//   "moduleFileExtensions": [
//     "ts",
//     "tsx",
//     "js",
//     "jsx",
//     "json",
//     "node"
//   ],

// }