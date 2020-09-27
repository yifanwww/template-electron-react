# @Electron

This module contains the following sub modules now:
- Ipc Wrapper

Some sub modules is being planned:
- Frameless Window

## Ipc Wrapper

In this module, I write two simple wrappers of `ipcMain` and `ipcRenderer`:
- [IpcMainWrapper](./IpcWrapper/IpcMainWrapper.ts#L3)
- [IpcRendererWrapper](./IpcWrapper/IpcRendererWrapper.ts#L3)

And write `BaseIpcMain` and `BaseIpcRenderer` for the common part of the connections between every renderer process and the main process:
- [BaseIpcMainClass](./IpcWrapper/BaseIpcMain.ts#L6)
- [BaseIpcMain](./IpcWrapper/BaseIpcMain.ts#L39)
- [BaseIpcRendererClass](./IpcWrapper/BaseIpcRenderer.ts#L7)
- [BaseIpcRenderer](./IpcWrapper/BaseIpcRenderer.ts#L40)

This base ipc provide some methods to support the basic ipc connections, for example, transfering the size of client area when the window has been resized. In the feture there will be more methods to support Frameless window.

To custom a certain-window-only ipc, you can create `xxxWindowIpcMainClass` and `xxxWindowIpcRendererClass` by inheriting `BaseIpcMainClass` and `BaseIpcRendererClass`, and instance their global const instances `xxxWindowIpcMain` and `xxxWindowIpcRenderer`.
