const { contextBridge, ipcRenderer } = require('electron')

contextBridge.exposeInMainWorld('electronAPI', {
  exitProgram: () => ipcRenderer.send('exitProgram', {})
})