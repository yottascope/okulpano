const { app, BrowserWindow, ipcMain, Menu, powerSaveBlocker } = require('electron');
const path = require('path');

let mainWin;

// Only one instance on the board
if (!app.requestSingleInstanceLock()) {
  app.quit();
} else {
  app.on('second-instance', () => {
    if (mainWin) {
      if (mainWin.isMinimized()) mainWin.restore();
      mainWin.focus();
    }
  });
}

function createWindow() {
  Menu.setApplicationMenu(null); // removes default shortcuts like Ctrl+R and Ctrl+Shift+I

  mainWin = new BrowserWindow({
    title: 'Okul Pano 1',
    icon: path.join(__dirname, 'icon.png'),
    width: 1280,
    height: 720,
    fullscreen: true,
    autoHideMenuBar: true,
    backgroundColor: '#070b14',
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      contextIsolation: true,
      nodeIntegration: false,
      devTools: false
    }
  });

  mainWin.loadFile(path.join(__dirname, 'index.html'));

  // Never navigate away or open new windows
  mainWin.webContents.setWindowOpenHandler(() => ({ action: 'deny' }));
  mainWin.webContents.on('will-navigate', (e) => e.preventDefault());

  // Recover if the renderer crashes
  mainWin.webContents.on('render-process-gone', () => mainWin.reload());

  // Keep the screen awake
  powerSaveBlocker.start('prevent-display-sleep');
}

ipcMain.on('window-toggle', () => {
  if (!mainWin) return;
  if (mainWin.isFullScreen()) {
    mainWin.setFullScreen(false);
    mainWin.maximize();
  } else if (mainWin.isMaximized()) {
    mainWin.unmaximize();
  } else {
    mainWin.setFullScreen(true);
  }
});

ipcMain.on('window-quit', () => app.quit());

app.whenReady().then(createWindow);
app.on('window-all-closed', () => app.quit());