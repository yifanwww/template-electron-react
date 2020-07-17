// According to https://medium.com/@kitze/%EF%B8%8F-from-react-to-an-electron-app-ready-for-production-a0468ecb1da3
// This Electron entry file `app.js` is placed into the `public` folder, so it can get copied to
// the `build` folder as it is.

const path = require('path');
const { app, BrowserWindow } = require('electron');
const isDevMode = require('electron-is-dev');

let window = null;

function CreateWindow() {
    window = new BrowserWindow({
        width: 1280,
        height: 720,
        webPreferences: {
            enableRemoteModule: true,
            nodeIntegration: true
        }
    });

    if (!isDevMode)
        window.loadFile(path.join(__dirname, '../build/index.html'));
    else {
        window.loadURL('http://localhost:3000/');
        window.openDevTools();
    }

    window.once('closed', () => window = null);
}

// This method will be called when Electron has finished initialization and is ready to create
// browser windows.
app.on('ready', CreateWindow);

app.on('window-all-closed', () => {
    // On macOS, most applications and their menu bars will key activated unless users use
    // `cmd + Q` to quit.
    if (process.platform !== 'darwin')
        app.quit();
});

app.on('activate', () => {
    // On macOS, usually applications will re-create new windows if single click the dock icon when
    // no other windows opened.
    if (BrowserWindow.getAllWindows().length === 0)
        CreateWindow();
});
