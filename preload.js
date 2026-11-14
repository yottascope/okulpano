const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('electronAPI', {
  toggleWindow: () => ipcRenderer.send('window-toggle'),
  quitApp: () => ipcRenderer.send('window-quit')
});