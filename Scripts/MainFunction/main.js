const { app, BrowserWindow, ipcMain, dialog, shell } = require('electron');
const path = require('path');

let mainWindow;

// <> Smooth Resize <>
function smoothResizeWindow(windowInstance, x, y) {
    const delay = 1;
    const stepSize = 3;

    // Get Size
    const currentBounds = windowInstance.getBounds();
    const currentXSize = currentBounds.width;
    const currentYSize = currentBounds.height;
    const currentXPos = currentBounds.x;
    const currentYPos = currentBounds.y;

    // Anti start error
    if (startX === x && startY === y) {
        return;
    }

    // Calc
    let deltaXSize = 0;
    let deltaYSize = 0;
    let nextXSize = currentXSize;
    let nextYSize = currentYSize;

    if (diffXSize !== 0) {
        // Calculate the step for width
        deltaXSize = Math.sign(diffXSize) * Math.min(stepSize, Math.abs(diffXSize));
        nextXSize = currentXSize + deltaXSize;
    }

    if (diffYSize !== 0) {
        // Calculate the step for height
        deltaYSize = Math.sign(diffYSize) * Math.min(stepSize, Math.abs(diffYSize));
        nextYSize = currentYSize + deltaYSize;
    }

    // Window Pos
    const offsetX = Math.floor(deltaXSize / 2);
    const offsetY = Math.floor(deltaYSize / 2);

    const nextXPos = currentXPos - offsetX;
    const nextYPos = currentYPos - offsetY;

    // Adust Window
    windowInstance.setBounds({
        x: nextXPos,
        y: nextYPos,
        width: nextXSize,
        height: nextYSize
    }, true)

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
            preload: path.join(__dirname, 'remoteFunctions.js'),
            contextIsolation: true,
            nodeIntegration: false,
            sandbox: false,
            enableRemoteModule: false,
        },

        menu: null,
        resizable: true,
        title: "TimeScape",
        icon: path.join(__dirname, '..', '..', 'Assets', 'icon.ico'),
    });

    mainWindow.loadFile('index.html');

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