# Infos About The Installation Of Electron

When installing `electron` package, it will download a compressed pack, `electron-v13.1.7-win32-x64.zip`, directly from Github by its own download tool [electron/get](https://github.com/electron/get). It may take a long time if you do not have a fast network connection to Github.

Fortunately, the download tool `electron/get` will check its cache before downloading. So you could download the compressed pack from Github manually, then copy it to where the cache files placed.

You have this steps to do:
1. Download [electron-v13.1.7-win32-x64.zip](https://github.com/electron/electron/releases/download/v13.1.7/electron-v13.1.7-win32-x64.zip) from Github.
2. Open `File Explorer` at `%localappdata%`, create `electron/Cache` folder.
3. Create `c02b94db45d0f83639398d95d22e41e09fd3474003678b9f728c6d3f2a93193c` folder, and then copy the zip file into it.
    - The folder name `c02b94db45d0f83639398d95d22e41e09fd3474003678b9f728c6d3f2a93193c` is compressed from `https://github.com/electron/electron/releases/download/v13.1.7` by SHA256.
4. Now you can `npm ci` in this project, `electron/get` will find the existing zip file and use it to install electron.
