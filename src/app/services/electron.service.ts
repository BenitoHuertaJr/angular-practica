import { Injectable } from '@angular/core';
import { BrowserWindow, IpcRenderer, MessageBoxOptions, dialog as ElectronDialog } from 'electron';
import { ElectronService as NgxElectronService } from 'ngx-electron';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ElectronService {

  ipcRender!: IpcRenderer;

  constructor(
    private electronService: NgxElectronService
  ) {
    if (this.electronService.isElectronApp) {
      this.ipcRender = this.electronService.ipcRenderer;
    }
  }

  isElectronApp(): boolean {
    return this.electronService.isElectronApp;
  }

  send(channel: string, ...args: any[]): void {
    if (this.isElectronApp()) {
      this.ipcRender.send(channel, args);
    }
  }

  on(channel: string, listener: Function): void {
    this.ipcRender.on(channel, (evt, args) => listener(evt, args));
  }

  showMessageBox(options: MessageBoxOptions) {

    this.send('showMessageBox', options);
    this.on('showMessageBoxResult', (res: Electron.MessageBoxReturnValue) => {
      console.log('result', res)
    });
  }

  // showErrorBox(title: string, content: string): void {
  //   let dialog = this.electronService.remote.dialog;
  //   dialog.showErrorBox(title, content);
  // }
}
