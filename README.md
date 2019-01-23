<h1 align="center">
  <img src="http://www.infantv.com.br/infantv/wp-content/uploads/2016/07/antom2.jpg" />
  <br/>
  Formicarium
</h1>

- CLI
- Electron UI
- Common

# Installing

To install the Formicarium CLI (fmc) just run:

```
yarn global add @formicarium/cli
```

or

```
npm install -g @formicarium/cli
```

# Development Setup
On the monorepo root:
```
yarn install
```

## Developing
On the monorepo root:
```
yarn build:watch
```
This will watch all the packages that need to be built while developing and build them on every file change

## CLI
```
cd packages/cli
yarn link
```
This will make `fmc` bin available for you and changes on the source code will be reflected automatically

## UI
```
cd packages/ui
yarn serve:electron
```
This will open a HMR server that will serve the assets to Electron in dev mode

On another shell:
```
yarn dev:electron
```
This will compile the electron development bin and open it for you, pointing to the development server

## Publishing
On the monorepo root:
```
yarn publish-all
```
This command uses lerna to publish all the packages in the monorepo.

For each package, it will look to the commits since the last publish and determine how to bump (major, minor, patch) based on the commit messages, following `conventional commits`.

Then, it will automatically bump and publish the necessary packages.

Lerna will also figure out how to bump package dependencies inside the monorepo.

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

If this package/app lives inside the monorepo (just like `UI` and `CLI`), you will always get the latest code version on your imports. (as long as you keep `yarn build:watch` running)

## Tools
Anything installed here will be available for the other packages inside the monorepo.

Good things to be here:
compilers (typescript), test runners (jest), linters (tslint), semantic-versioning stuff, etc.
