const { app, BrowserWindow, Menu, ipcMain } = require('electron');
const path = require('path');
const isDev = require('electron-is-dev');

let mainWindow;

function createWindow() {
  // Criar a janela principal do aplicativo
  mainWindow = new BrowserWindow({
    width: 1400,
    height: 900,
    minWidth: 1200,
    minHeight: 800,
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
      enableRemoteModule: false,
      webSecurity: true,
      preload: path.join(__dirname, 'preload.js')
    },
    icon: path.join(__dirname, 'icon.png'), // Adicione um ícone se quiser
    titleBarStyle: 'default',
    show: false,
    backgroundColor: '#111827' // Cor de fundo matching com o tema escuro
  });

  // Carregar a aplicação
  const startUrl = isDev 
    ? 'http://localhost:3000' 
    : `file://${path.join(__dirname, '../build/index.html')}`;
  
  mainWindow.loadURL(startUrl);

  // Mostrar a janela quando estiver pronta
  mainWindow.once('ready-to-show', () => {
    mainWindow.show();
    
    // Abrir DevTools apenas em desenvolvimento
    if (isDev) {
      mainWindow.webContents.openDevTools();
    }
  });

  // Configurar o menu da aplicação
  const template = [
    {
      label: 'Arquivo',
      submenu: [
        {
          label: 'Novo Pedido',
          accelerator: 'CmdOrCtrl+N',
          click: () => {
            mainWindow.webContents.send('menu-action', 'novo-pedido');
          }
        },
        {
          label: 'Novo Cliente',
          accelerator: 'CmdOrCtrl+Shift+N',
          click: () => {
            mainWindow.webContents.send('menu-action', 'novo-cliente');
          }
        },
        { type: 'separator' },
        {
          label: 'Sair',
          accelerator: process.platform === 'darwin' ? 'Cmd+Q' : 'Ctrl+Q',
          click: () => {
            app.quit();
          }
        }
      ]
    },
    {
      label: 'Navegação',
      submenu: [
        {
          label: 'Dashboard',
          accelerator: 'CmdOrCtrl+1',
          click: () => {
            mainWindow.webContents.send('menu-action', 'navigate-dashboard');
          }
        },
        {
          label: 'Pedidos',
          accelerator: 'CmdOrCtrl+2',
          click: () => {
            mainWindow.webContents.send('menu-action', 'navigate-pedidos');
          }
        },
        {
          label: 'Clientes',
          accelerator: 'CmdOrCtrl+3',
          click: () => {
            mainWindow.webContents.send('menu-action', 'navigate-clientes');
          }
        },
        {
          label: 'Financeiro',
          accelerator: 'CmdOrCtrl+4',
          click: () => {
            mainWindow.webContents.send('menu-action', 'navigate-financeiro');
          }
        },
        {
          label: 'Agenda',
          accelerator: 'CmdOrCtrl+5',
          click: () => {
            mainWindow.webContents.send('menu-action', 'navigate-agenda');
          }
        }
      ]
    },
    {
      label: 'Visualizar',
      submenu: [
        { role: 'reload', label: 'Recarregar' },
        { role: 'forceReload', label: 'Forçar Recarregamento' },
        { role: 'toggleDevTools', label: 'Ferramentas do Desenvolvedor' },
        { type: 'separator' },
        { role: 'resetZoom', label: 'Zoom Normal' },
        { role: 'zoomIn', label: 'Aumentar Zoom' },
        { role: 'zoomOut', label: 'Diminuir Zoom' },
        { type: 'separator' },
        { role: 'togglefullscreen', label: 'Tela Cheia' }
      ]
    },
    {
      label: 'Janela',
      submenu: [
        { role: 'minimize', label: 'Minimizar' },
        { role: 'close', label: 'Fechar' }
      ]
    },
    {
      label: 'Ajuda',
      submenu: [
        {
          label: 'Sobre o Ideal SilkScreen',
          click: () => {
            const { dialog } = require('electron');
            dialog.showMessageBox(mainWindow, {
              type: 'info',
              title: 'Sobre',
              message: 'Ideal SilkScreen',
              detail: 'Sistema de gestão para serigrafia e bordados\nVersão 1.0.0\n\nDesenvolvido para otimizar o gerenciamento de pedidos, clientes e financeiro.',
              buttons: ['OK']
            });
          }
        },
        {
          label: 'Suporte',
          click: () => {
            const { shell } = require('electron');
            shell.openExternal('mailto:contato@idealsilkscreen.com.br');
          }
        }
      ]
    }
  ];

  // Configurar menu no macOS
  if (process.platform === 'darwin') {
    template.unshift({
      label: app.getName(),
      submenu: [
        { role: 'about', label: 'Sobre ' + app.getName() },
        { type: 'separator' },
        { role: 'services', label: 'Serviços' },
        { type: 'separator' },
        { role: 'hide', label: 'Ocultar ' + app.getName() },
        { role: 'hideothers', label: 'Ocultar Outros' },
        { role: 'unhide', label: 'Mostrar Todos' },
        { type: 'separator' },
        { role: 'quit', label: 'Sair do ' + app.getName() }
      ]
    });
  }

  const menu = Menu.buildFromTemplate(template);
  Menu.setApplicationMenu(menu);

  // Manipular o fechamento da janela
  mainWindow.on('closed', () => {
    mainWindow = null;
  });

  // Prevenir a navegação para fora da aplicação
  mainWindow.webContents.on('will-navigate', (event, navigationUrl) => {
    const parsedUrl = new URL(navigationUrl);
    if (parsedUrl.origin !== 'http://localhost:3000' && parsedUrl.origin !== 'file://') {
      event.preventDefault();
    }
  });

  // Prevenir a abertura de novas janelas
  mainWindow.webContents.setWindowOpenHandler(({ url }) => {
    const { shell } = require('electron');
    shell.openExternal(url);
    return { action: 'deny' };
  });
}

// Este método será chamado quando o Electron terminar de inicializar
app.whenReady().then(createWindow);

// Sair quando todas as janelas estiverem fechadas
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});

// Configurações de segurança
app.on('web-contents-created', (event, contents) => {
  contents.on('new-window', (event, navigationUrl) => {
    event.preventDefault();
    const { shell } = require('electron');
    shell.openExternal(navigationUrl);
  });

  contents.on('will-navigate', (event, navigationUrl) => {
    const parsedUrl = new URL(navigationUrl);
    if (parsedUrl.origin !== 'http://localhost:3000' && parsedUrl.origin !== 'file://') {
      event.preventDefault();
    }
  });
});

// Configurar o protocolo de arquivo personalizado em produção
if (!isDev) {
  app.setAsDefaultProtocolClient('idealsilkscreen');
}

// IPC Handlers para comunicação com o renderer
ipcMain.handle('app-version', () => {
  return app.getVersion();
});

ipcMain.handle('app-name', () => {
  return app.getName();
});