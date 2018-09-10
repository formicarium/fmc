const Bundler = require('parcel-bundler');
const Path = require('path');
const app = require('express')();

// Entrypoint file location
// const file = [
//   Path.join(__dirname, '../src/index.html'),
//   Path.join(__dirname, '../../common/src/index.ts'),
// ]
const file = Path.join(__dirname, '../src/index.html')

// Bundler options
const options = {
  outDir: './build', // The out directory to put the build files in, defaults to dist
  outFile: 'index.html', // The name of the outputFile
  // publicUrl: './ui', // The url to server on, defaults to dist
  watch: true, // whether to watch the files and rebuild them on change, defaults to process.env.NODE_ENV !== 'production'
  cache: false, // Enabled or disables caching, defaults to true
  cacheDir: '.cache', // The directory cache gets put in, defaults to .cache
  contentHash: false, // Disable content hash from being included on the filename
  minify: false, // Minify files, enabled if process.env.NODE_ENV === 'production'
  scopeHoist: false, // turn on experimental scope hoisting/tree shaking flag, for smaller production bundles
  target: 'electron', // browser/node/electron, defaults to browser
  https: false, // Serve files over https or http, defaults to false
  logLevel: 3, // 3 = log everything, 2 = log warnings & errors, 1 = log errors
  hmr: true, //Enable or disable HMR while watching
  hmrPort: 0, // The port the HMR socket runs on, defaults to a random free port (0 in node.js resolves to a random free port)
  sourceMaps: true, // Enable or disable sourcemaps, defaults to enabled (not supported in minified builds yet)
  source: true,
  hmrHostname: '', // A hostname for hot module reload, default to ''
  detailedReport: false // Prints a detailed report of the bundles, assets, filesizes and times, defaults to false, reports are only printed if watch is disabled
};

async function runBundle() {
  // Initializes a bundler using the entrypoint location and options provided
  const bundler = new Bundler(file, options);

  // Let express use the bundler middleware, this will let Parcel handle every request over your express server
  app.use(bundler.middleware());
  // console.log(app)
  app.listen(1235);
  
  // Run the bundler, this returns the main bundle
  // Use the events if you're using watch mode as this promise will only trigger once and not for every rebuild
  const bundle = await bundler.bundle();
}

runBundle();