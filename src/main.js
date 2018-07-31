const electron = require('electron');
var fileWatcher = require("chokidar");
const app = electron.app;
const BrowserWindow = electron.BrowserWindow;


const path = require('path');
const url = require('url');
let mainWindow;

function createWindow() {
    mainWindow = new BrowserWindow({ width: 800, height: 600 });

    /*     const startUrl = process.env.ELECTRON_START_URL || url.format({
            pathname: path.join(__dirname, '/../build/index.html'),
            protocol: 'file:',
            slashes: true
        }); */
    mainWindow.loadURL('http://localhost:3000');

    mainWindow.webContents.openDevTools();

    mainWindow.on('closed', function () {
        mainWindow = null
    })
}

app.on('ready', createWindow);

app.on('window-all-closed', function () {
    if (process.platform !== 'darwin') {
        app.quit()
    }
});

app.on('activate', function () {
    if (mainWindow === null) {
        createWindow()
    }
});

var { dialog } = electron;

function StartWatcher(path) {
    var chokidar = require("chokidar");

    var watcher = chokidar.watch(path, {
        ignored: /[\/\\]\./,
        persistent: true
    });

    function onWatcherReady() {
        console.info('From here can you check for real changes, the initial scan has been completed.');
    }
    // Declare the listeners of the watcher
    watcher
        .on('add', function (path) {
            console.log('File', path, 'has been added');
        })
        .on('error', function (error) {
            console.log('Error happened', error);
        })
        .on('ready', onWatcherReady)
        .on('raw', function (event, path, details) {
            // This event should be triggered everytime something happens.
            console.log('Raw event info:', event, path, details);
        });
}

StartWatcher("C:/Users/Marti/Desktop/FHIR")

