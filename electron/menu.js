const { is, appMenu, aboutMenuItem, openUrlMenuItem, openNewGitHubIssue, debugInfo } = require('electron-util');
const { app, Menu, shell, BrowserWindow } = require('electron');
const path = require('path');

const showPreferences = () => {

    console.log('Opening preferences...');


};

const helpSubmenu = [
    openUrlMenuItem({
        label: 'Sitio Web',
        url: 'https://bitbucket.org/BenHuerta/electron-template-vue-frame/src/main/'
    }),
    {
        label: 'Reportar un error',
        click() {

            const body = `
			<!-- Please succinctly describe your issue and steps to reproduce it. -->


			---

			${debugInfo()}`;

            openNewGitHubIssue({
                user: 'BenitoHuertaJr',
                repo: 'my-repo',
                body
            });

        }
    }
];

if (!is.macos) {
    helpSubmenu.push({
            type: 'separator'
        },
        aboutMenuItem({
            icon: path.join(__dirname, 'static', 'icon.png'),
            text: `Creada por Benito Huerta`
        })
    );
}

const debugSubmenu = [{
        label: 'Mostrar configuraciones',
        click() {
            console.log('Opening configurations...');
            //config.openInEditor();
        }
    },
    {
        label: 'Mostrar datos de la app',
        click() {
            shell.showItemInFolder(app.getPath('userData'));
        }
    },
    {
        type: 'separator'
    },
    {
        label: 'Eliminar configuraciones',
        click() {
            // config.clear();
            app.relaunch();
            app.quit();
        }
    },
    {
        label: 'Eliminar datos de la app',
        click() {
            shell.trashItem(app.getPath('userData'));
            app.relaunch();
        }
    }
];

const macosTemplate = [
    appMenu([{
        label: 'Preferencias',
        accelerator: 'Command+,',
        click() {
            showPreferences();
        }
    }]),
    {
        role: 'help',
        label: 'Ayuda',
        submenu: helpSubmenu
    }
];

// Linux and Windows
const otherTemplate = [{
        role: 'fileMenu',
        label: 'Archivo',
        submenu: [{
                label: 'Configuraciones',
                accelerator: 'Control+,',
                click() {
                    showPreferences();
                }
            },
            {
                type: 'separator'
            },
            {
                label: 'Salir',
                role: 'quit'
            }
        ]
    },
    {
        role: 'help',
        label: 'Ayuda',
        submenu: helpSubmenu
    }
];

const template = is.macos ? macosTemplate : otherTemplate;

if (is.development) {
    template.push({
        label: 'Depuración',
        submenu: debugSubmenu
    });
}

module.exports = Menu.buildFromTemplate(template);