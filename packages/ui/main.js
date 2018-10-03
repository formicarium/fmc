// Basic init
const electron = require('electron');
const {app, BrowserWindow} = electron;
const path = require('path');
const url = require('url');

const {default: installExtension, REACT_DEVELOPER_TOOLS, APOLLO_DEVELOPER_TOOLS } = require('electron-devtools-installer');

const installAndLog = (extension) => installExtension(extension)
    .then((name) => console.log(`Added Extension:  ${name}`))
    .catch((err) => console.log('An error occurred: ', err))


// To avoid being garbage collected
let mainWindow;

app.on('ready', () => {
  installAndLog(REACT_DEVELOPER_TOOLS)
  .then(() => installAndLog(APOLLO_DEVELOPER_TOOLS))
  
  mainWindow = new BrowserWindow({
    width: 800, height: 600,
    webPreferences: {
      webSecurity: false,
    }
  });

  const startUrl = process.env.ELECTRON_START_URL || url.format({
    pathname: path.join(__dirname, './build/index.html'),
    protocol: 'file:',
    slashes: true
  });

  mainWindow.loadURL(startUrl);

  mainWindow.on('closed', function () {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    mainWindow = null;
  });

  mainWindow.webContents.openDevTools();
});

// Quit when all windows are closed.
app.on('window-all-closed', function () {
  // On OS X it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', function () {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (mainWindow === null) {
    createWindow();
  }
});