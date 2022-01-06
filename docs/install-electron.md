# Electron Installation

When installing `electron` package, it will download a compressed pack, `electron-v16.0.6-win32-x64.zip`, directly from Github by its own download tool [electron/get]. It may take a long time if you do not have a fast network connection to Github.

Fortunately, the download tool [electron/get] will check its cache before downloading. So you could download the compressed pack from Github manually, then copy it to where the cache files placed.

You have this steps to do:
1. Download [electron-v16.0.6-win32-x64.zip] from Github.
2. Open `File Explorer` at `%localappdata%`, create `electron/Cache` folder.
3. Create `1f0e4061907b5ddfb6cfd0c61a58e1b935726811f3c1729d5570077930dbf40d` folder, and then copy the zip file into it.
    - The folder name `1f0e4061907b5ddfb6cfd0c61a58e1b935726811f3c1729d5570077930dbf40d` is compressed from `https://github.com/electron/electron/releases/download/v16.0.6` by SHA256.
4. Now you can `npm ci` in this project, [electron/get] will find the existing zip file and use it to install electron.

<!-- link list -->

[electron/get]: https://github.com/electron/get
[electron-v16.0.6-win32-x64.zip]: https://github.com/electron/electron/releases/download/v16.0.6/electron-v16.0.6-win32-x64.zip
