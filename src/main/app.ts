import { app, BrowserWindow } from "electron";

import { CreateWindow } from "./Window";

// This method will be called when Electron has finished initialization and is ready to create
// browser windows.
app.on("ready", CreateWindow);

app.on("window-all-closed", () => {
    // On macOS, most applications and their menu bars will key activated unless users use
    // `cmd + Q` to quit.
    if (process.platform !== "darwin")
        app.quit();
});

app.on("activate", () => {
    // On macOS, usually applications will re-create new windows if single click the dock icon when
    // no other windows opened.
    if (BrowserWindow.getAllWindows().length === 0)
        CreateWindow();
});
