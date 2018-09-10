<h1 align="center">
  <img src="http://www.infantv.com.br/infantv/wp-content/uploads/2016/07/antom2.jpg" />
  <br/>
  Formicarium
</h1>

- CLI
- Electron UI
- Common

# Setup
On the project root:
```
yarn install
```

# Developing
Everything is watched/hot reloaded. You don't need to worry about anything
## CLI
```
cd packages/cli
yarn link
```

## UI
```
cd packages/ui
yarn dev:electron
```
On another shell:
```
yarn start:electron
```

Or you can develop for browser:
```
yarn dev:browser
```
This will automatically open your browser

## Publishing
On the monorepo root:
```
yarn publish-all
```
This command uses lerna to publish all the packages in the monorepo
For each package, it will look to the commits since the last publish and determine how to bump (major, minor, patch) based on the commit messages, following `conventional commits`.
Then, it will automatically bump and publish the necessary packages.

Lerna will also figure out how to bump package dependencies inside the monorepo
For example, if the `common` version has been bumped, it will bump it on all packages that depend on it (and bump the packages themselves as well).


## Building
To build all packages, run this on the monorepo root:
```
yarn run build
```
To build a specific package, cd into the package folder and run:
```
yarn run build
```
or
```
yarn run build:watcch
```

## Cleaning
To clean all packages, run this on the monorepo root:
```
yarn run clean
```
To clean a specific package, cd into the package folder and run:
```
yarn run clean
```

## Testing
To run tests for all packages, run this on the monorepo root:
```
yarn run test
```

To run test for a specific package, cd into the package folder and run:
```
yarn run test
```
or
```
yarn run test:watch
```

## Common
Just add code there and import it on any other package/app.
If this package/app lives inside the monorepo (just like `UI` and `CLI`), you will always get the latest code version on your imports.

## Tools
Anything installed here will be available for the other packages inside the monorepo. Good things to be here:
compilers (typescript), test runners (jest), linters (tslint), semantic-versioning stuff, etc.
