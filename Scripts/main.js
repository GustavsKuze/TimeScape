const { app, BrowserWindow, ipcMain, dialog, shell } = require('electron');
const path = require('path');

function createWindow() {
    const mainWindow = new BrowserWindow({
        width: 700,
        height: 450,

        frame: true,

        webPreferences: {
            preload: path.join(__dirname, 'preload.js'),
            contextIsolation: true,
            nodeIntegration: false,
            sandbox: false,
            enableRemoteModule: false,
        },

        menu: null,
        resizable: false,
        title: "TimeScape",
        icon: path.join(__dirname, '..', 'Assets', 'icon.ico'),
    });

    mainWindow.loadFile(path.join(__dirname, 'MainWindow', 'index.html'));

    mainWindow.webContents.executeJavaScript(`document.body.style.overflow = 'hidden';`);
}

app.whenReady().then(createWindow);

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') app.quit();
});

app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
});

// Chose Path file expolore
ipcMain.handle('open-file-dialog', async () => {
  const { canceled, filePaths } = await dialog.showOpenDialog({
    properties: ['openFile']
  });
  if (canceled || filePaths.length === 0) return null;
  return filePaths[0];
});

// Open Path file expolore
ipcMain.on('open-path-in-explorer', (event, path) => {
  shell.openPath(path); // Opens folder or file in system file explorer
});