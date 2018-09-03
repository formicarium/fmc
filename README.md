<h1 align="center">
  <img src="http://www.infantv.com.br/infantv/wp-content/uploads/2016/07/antom2.jpg" height="300"/>
  <br/>
  Formicarium frontend monorepo
</h1>

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

## Common
Just add code there and import it on any other package/app.
If this package/app lives inside the monorepo (just like `UI` and `CLI`), you will always get the latest code version on your imports.

## Tools
Anything installed here will be available for the other packages inside the monorepo. Good things to be here:
compilers (typescript), test runners (jest), linters (tslint), semantic-versioning stuff, etc.
