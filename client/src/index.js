const { app, BrowserWindow } = require('electron')


const createWindow = () => {
    const win = new BrowserWindow({
      width: 1280,
      height: 720,
      // webPreferences: {
      //   // Set the CSP header here
      //   webSecurity: false, // for development purpose only
      //   contentSecurityPolicy: "default-src 'self'; connect-src http://127.0.0.1:8000/"
      // }
    })
  
    win.loadFile('./src/index.html')
}

app.whenReady().then(() => {
    createWindow()
})