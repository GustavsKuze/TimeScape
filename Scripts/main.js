const { app, BrowserWindow, ipcMain, dialog, shell } = require('electron');
const path = require('path');

let mainWindow;

// Previous Functions
function smoothResizeWindow(windowInstance, x, y) {
    const delay = 1;
    const stepSize = 3;

    const [startX, startY] = windowInstance.getSize();

    // Anti start error
    if (startX === x && startY === y) {
        return;
    }

    // Calc
    const diffX = x - startX;
    const diffY = y - startY;

    let nextX = startX
    if (diffX !== 0) {
        const stepX = Math.sign(diffX) * Math.min(stepSize, Math.abs(diffX));
        nextX = startX + stepX;
    }

    let nextY = startY
    if (diffY !== 0) {
        const stepY = Math.sign(diffY) * Math.min(stepSize, Math.abs(diffY));
        nextY = startY + stepY;
    }

    // Adust Window
    windowInstance.setSize(nextX, nextY, true);
    windowInstance.center();

    windowInstance.webContents.send('update-current-size', nextX, nextY);
    setTimeout(() => smoothResizeWindow(windowInstance, x, y), delay)

}

// Create Window
function createMainWindow() {
    mainWindow = new BrowserWindow({
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

    mainWindow.loadFile(path.join(__dirname, 'mainWindow', 'index.html'));

    mainWindow.webContents.executeJavaScript(`document.body.style.overflow = 'hidden';`);
}

app.whenReady().then(createMainWindow);

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') app.quit();
});

app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) createMainWindow();
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

// Resize Window
ipcMain.on('resize-window', (event, width, height) => {
        const windowToResize = BrowserWindow.fromWebContents(event.sender);
        if (windowToResize) {
            smoothResizeWindow(windowToResize, width, height);
        }
});