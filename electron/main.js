// Modules to control application life and create native browser window
const { app, BrowserWindow, Menu, ipcMain, ipcRenderer, dialog, remote } = require("electron");
const path = require("path");
const { is } = require('electron-util');
const menu = require('./menu');

let mainWindow = null;

ipcMain.on('maximize-main-window', () => {
    mainWindow.maximize();
});

ipcMain.on('unmaximize-main-window', () => {
    mainWindow.unmaximize();
});

ipcMain.on('showMessageBox', (event, options) => {
    dialog.showMessageBox(mainWindow, options[0]);
});

ipcMain.on('showConfirmBox', (event, options) => {
    dialog.showMessageBox(mainWindow, {
        type: 'warning',
        title: options[0].title,
        message: options[0].message,
        buttons: options[0].buttons
    }).then((result) => {

        if (result.response !== 0) {
            event.sender.send('showConfirmBoxResponse', false);
            return;
        }

        if (result.response === 0) {
            event.sender.send('showConfirmBoxResponse', true);
        }
    });
});

function createWindow() {

    const splashWindow = new BrowserWindow({
        width: 400,
        height: 400,
        minWidth: 400,
        minHeight: 400,
        maxHeight: 400,
        maxWidth: 400,
        frame: false,
        show: false
    });

    splashWindow.loadFile(path.join(__dirname, 'splash.html'));
    splashWindow.center();

    splashWindow.once('ready-to-show', () => {
        splashWindow.show();
    });

    // Create the browser window.
    mainWindow = new BrowserWindow({
        width: 500,
        height: 600,
        minWidth: 500,
        minHeight: 600,
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false
        },
        show: false
    });

    // and load the index.html of the app.
    mainWindow.loadFile(path.join(__dirname, '..', 'dist', 'index.html'));

    // Open the DevTools.
    if (is.development) {
        mainWindow.webContents.openDevTools();
    }

    mainWindow.once('ready-to-show', () => {
        splashWindow.destroy();
        mainWindow.show();
    });

}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {

    Menu.setApplicationMenu(menu);
    createWindow();

    app.on("activate", function() {
        // On macOS it's common to re-create a window in the app when the
        // dock icon is clicked and there are no other windows open.
        if (BrowserWindow.getAllWindows().length === 0) createWindow();
    });
});

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on("window-all-closed", function() {
    if (!is.macos) app.quit();
});

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.