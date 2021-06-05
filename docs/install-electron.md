# Infos About The Installation Of Electron

When installing `electron` package, it will download a compressed pack, `electron-v13.1.1-win32-x64.zip`, directly from Github by its own download tool [electron/get](https://github.com/electron/get). It may take a long time if you do not have a fast network connection to Github.

Fortunately, the download tool `electron/get` will check its cache before downloading. So you could download the compressed pack from Github manually, then copy it to where the cache files placed.

You have this steps to do:
1. Download [electron-v13.1.1-win32-x64.zip](https://github.com/electron/electron/releases/download/v13.1.1/electron-v13.1.1-win32-x64.zip) from Github.
2. Open `File Explorer` at `%localappdata%`, create `electron/Cache` folder.
3. Create `d00be1088fe5e6ed9b00c12fdee88e7f10c518fa5e963c0ded7fefc76ab51218` folder, and then copy the zip file into it.
    - The folder name `d00be1088fe5e6ed9b00c12fdee88e7f10c518fa5e963c0ded7fefc76ab51218` is compressed from `https://github.com/electron/electron/releases/download/v13.1.1` by SHA256.
4. Now you can `npm ci` in this project, `electron/get` will find the existing zip file and use it to install electron.
