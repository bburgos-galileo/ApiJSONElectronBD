const { ipcRenderer, contextBridge, ipcMain } = require('electron')

contextBridge.exposeInMainWorld(
    'comunicacion',
    {
        consultar: (filtro) => ipcRenderer.send('consultar', filtro)
        ,
        datos: (callback) => ipcRenderer.on('datos', callback)
        ,
        grabar: (params) => ipcRenderer.send('iu-agregar', params)
        ,

    }
)