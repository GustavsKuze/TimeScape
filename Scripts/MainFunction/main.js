const { app, BrowserWindow, ipcMain, dialog, shell } = require('electron');
const path = require('path');

let mainWindow;

// <> Smooth Resize <>
function smoothResizeWindow(windowInstance, targetWidth, targetHeight) {
    // control variables
    const delay = 10;
    const stepSize = 10;

    // function for each step
    const animateResize = () => {
        const currentBounds = windowInstance.getBounds();
        const currentWidth = currentBounds.width;
        const currentHeight = currentBounds.height;
        const currentX = currentBounds.x;
        const currentY = currentBounds.y;

        // Calc diff
        const diffXSize = targetWidth - currentWidth;
        const diffYSize = targetHeight - currentHeight;

        // check for size and if target reached
        if (Math.abs(diffXSize) <= stepSize && Math.abs(diffYSize) <= stepSize) {
            // under step size fix
            const finalX = currentX - Math.floor((diffXSize) / 2);
            const finalY = currentY - Math.floor((diffYSize) / 2);
            windowInstance.setBounds({
                x: finalX,
                y: finalY,
                width: targetWidth,
                height: targetHeight
            }, true);

            return;
        }

        // Calc
        let deltaXSize = 0;
        if (diffXSize !== 0) {
            deltaXSize = Math.sign(diffXSize) * Math.min(stepSize, Math.abs(diffXSize));
        }

        let deltaYSize = 0;
        if (diffYSize !== 0) {
            deltaYSize = Math.sign(diffYSize) * Math.min(stepSize, Math.abs(diffYSize));
        }

        const nextWidth = currentWidth + deltaXSize;
        const nextHeight = currentHeight + deltaYSize;

        // Centered resize fix
        const offsetX = Math.floor(deltaXSize / 2);
        const offsetY = Math.floor(deltaYSize / 2);

        const nextXPos = currentX - offsetX;
        const nextYPos = currentY - offsetY;

        // 4. Apply the new bounds
        windowInstance.setBounds({
            x: nextXPos,
            y: nextYPos,
            width: nextWidth,
            height: nextHeight
        }, true);

        // Next frame
        setTimeout(animateResize, delay);
    };

    // Start the animation
    animateResize();
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