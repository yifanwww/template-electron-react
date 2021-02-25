# Infos About The Installation Of Electron

When installing `electron` package, it will download a compressed pack, `electron-v11.2.1-win32-x64.zip`, directly from Github by its own download tool [electron/get](https://github.com/electron/get). It may take a long time if you do not have a fast network connection to Github.

Fortunately, the download tool `electron/get` will check its cache before downloading. So you could download the compressed pack from Github manually, then copy it to where the cache files placed.

You have this steps to do:
1. Download [electron-v11.2.1-win32-x64.zip](https://github.com/electron/electron/releases/download/v11.2.1/electron-v11.2.1-win32-x64.zip) from Github.
2. Open `File Explorer` at `%localappdata%`, create `electron/Cache` folder.
3. Create `8929302e09b6a213ccd7c6f1e48fb14c4053144515fdb12d25ad645abcb59af2` folder, and then copy the zip file into it.
4. Now you can `npm ci` in this project, `electron/get` will find the existing zip file and use it to install electron.
