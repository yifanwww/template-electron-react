# Electron Installation

When installing `electron` package, it will download a compressed pack, `electron-v15.0.0-win32-x64.zip`, directly from Github by its own download tool [electron/get]. It may take a long time if you do not have a fast network connection to Github.

Fortunately, the download tool [electron/get] will check its cache before downloading. So you could download the compressed pack from Github manually, then copy it to where the cache files placed.

You have this steps to do:
1. Download [electron-v15.0.0-win32-x64.zip] from Github.
2. Open `File Explorer` at `%localappdata%`, create `electron/Cache` folder.
3. Create `0b214443fcaae05825742123b5df90209f4768ce9080e655555b8e0caa139dbc` folder, and then copy the zip file into it.
    - The folder name `0b214443fcaae05825742123b5df90209f4768ce9080e655555b8e0caa139dbc` is compressed from `https://github.com/electron/electron/releases/download/v15.0.0` by SHA256.
4. Now you can `npm ci` in this project, [electron/get] will find the existing zip file and use it to install electron.

<!-- link list -->

[electron/get]: https://github.com/electron/get
[electron-v15.0.0-win32-x64.zip]: https://github.com/electron/electron/releases/download/v15.0.0/electron-v15.0.0-win32-x64.zip
