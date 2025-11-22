const { contextBridge, ipcRenderer } = require('electron');
const path = require('path');

// File Explorer
contextBridge.exposeInMainWorld('electronAPI', {
  openFileDialog: () => ipcRenderer.invoke('open-file-dialog'),
  openPathInExplorer: (path) => ipcRenderer.send('open-path-in-explorer', path),
  resolvePath: (...segments) => path.join(__dirname, ...segments),
});
