const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path')
const mysql = require('mysql2')

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'consulta'
})

let mainWindow;


function createWindow() {

    mainWindow = new BrowserWindow({
        width: 900,
        height: 600,
        title: 'Consulta de gatos JSON',
        webPreferences: {
            preload: path.join(app.getAppPath(), 'preload.js')
        }
    });

    mainWindow.loadFile("render.html");

    mainWindow.on('closed', () => {
        mainWindow = null
    })

}

app.whenReady().then(createWindow);

ipcMain.on('iu-agregar', async (event, arg) => {

    connection.promise().query('INSERT INTO resultado(id, url, tags, fecha_creacion, tipo, filtro) values(?,?,?,?,?,?)', [arg.id, arg.url, arg.tags.toString(), arg.create_at, arg.tipo, arg.filtro])
        .then(([results, fields]) => {
            console.log('grabo');
        })

});

ipcMain.on('consultar', async (event, filtro) => {

    let iTipo = filtro.tipo;
    let iFiltro = filtro.filtro;

    if (iTipo == '' && iFiltro == '') {
        connection.promise().query('SELECT * from resultado ORDER BY RAND() LIMIT 1')
            .then(([results, fields]) => {
                if (results[0]) {
                    mainWindow.webContents.send('datos', results[0]);
                }
            });
    } else if (iTipo != '' && iFiltro == '') {
        connection.promise().query('SELECT * from resultado WHERE tipo = ? ORDER BY RAND() LIMIT 1', [iTipo])
            .then(([results, fields]) => {
                if (results[0]) {
                    mainWindow.webContents.send('datos', results[0]);
                }
            });
    } else if (iTipo == '' && iFiltro != '') {
        connection.promise().query('SELECT * from resultado WHERE filtro = ? ORDER BY RAND() LIMIT 1', [iFiltro])
            .then(([results, fields]) => {
                if (results[0]) {
                    mainWindow.webContents.send('datos', results[0]);
                }
            });
    }

});
