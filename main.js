// Modules to control application life and create native browser window
const {app, BrowserWindow} = require('electron')
const path = require('path')

function createWindow () {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js')
    }
  })

  // Open a web page in the window
  // mainWindow.loadURL('https://github.com')

  // Print a log
  //const contents = mainWindow.webContents
  // console.log(contents)

  // and load the index.html of the app.
  mainWindow.loadFile('index.html')

  // Open the DevTools.
  // mainWindow.webContents.openDevTools()
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {
  createWindow()
  
  app.on('activate', function () {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') app.quit()
})

// En Windows 10, se debe instalar un acceso directo a tu app en el menú de
// inicio con la ID del modelo de usuario de la aplicación. Esto puede ser anulado
// durante el desarrollo, por lo que añadir node_modules\electron\dist\electron.exe
// a su Menú Inicio también hace el truco . Navegue al archivo en Explorer, haga clic
// derecho y "Anclar para iniciar el menú". Luego necesitará añadir la línea
// app.setAppUserModelId(process.execPath) a su proceso principal para ver las notificaciones.
app.setAppUserModelId(process.execPath)

// const { getDoNotDisturb } from 'electron-notification-state'
// On Windows, logs `true` if "quiet hours" are enabled
// On macOS, logs `true` if "do not disturb" is enabled
// console.log(getDoNotDisturb());


// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.
const { Notification } = require('electron')

const NOTIFICATION_TITLE = 'Basic Notification'
const NOTIFICATION_BODY = 'Notification from the Main process'

function showNotification () {
  new Notification({ title: NOTIFICATION_TITLE, body: NOTIFICATION_BODY }).show()
}

app.whenReady().then(createWindow).then(showNotification)