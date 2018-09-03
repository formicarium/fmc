# frontend-monorepo
CLI + Electron + Common + Tools

# Setup
On the project root:
```
yarn install
```

# Developing
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

## Common
Just add code there and import it on any other package/app.
If this package/app lives inside the monorepo (just like `UI` and `CLI`), you will always get the last version on your imports.

## Tools
Anything installed here will be available for the other packages inside the monorepo. Good things to be here:
compilers (typescript), test runners (jest), linters (tslint), semantic-versioning stuff, etc.
