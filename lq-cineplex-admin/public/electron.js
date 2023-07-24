const electron = require('electron');

const app = electron.app;
const BrowserWindow = electron.BrowserWindow;
const path = require('path');
const isDev = require('electron-is-dev');

let win; // khai báo biên win dùng để tạo lên một cửa sổ window của app

// Hàm tạo cửa sổ app
function createWindow() {
    win = new BrowserWindow({
        width: 800,
        height: 600,
    });

    win.loadURL(isDev ? 'http://localhost:3000/login' : `file://${path.join(__dirname, '../build/index.html')}`);

    win.maximize();

    win.webContents.openDevTools();

    // khi close thì ta xóa cửa sổ đi
    win.on('close', function () {
        win = null;
    });
}

// lắng nghe khi app sẵn sàng thì sẽ khởi tạo cửa sổ app
app.on('ready', createWindow);

// Khi close thì quit khỏi app
app.on('window-all-closed', function () {
    app.quit();
});

app.on('activate', function () {
    if (win == null) {
        createWindow();
    }
});
