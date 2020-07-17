const { app, BrowserWindow, ipcMain } = require('electron')
const path = require('path')

let window = null;

app.once('ready', () => {
    window = new BrowserWindow({
        width: 1280,
        height: 720,
        webPreferences: {
            enableRemoteModule: true,
            nodeIntegration: true
        }
    });

    const devMode = process.env.ENV === 'development';

    if (!devMode)
        window.loadFile(path.join(__dirname, 'build/index.html'));
    else {
        window.loadURL('http://localhost:3000/');
        window.openDevTools();
    }

    window.once('closed', () => window = null);
});

app.on('window-all-closed', () => { app.quit(); });
