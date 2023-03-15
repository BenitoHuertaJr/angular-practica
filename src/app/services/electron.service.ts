import { Injectable } from '@angular/core';
import { BrowserWindow, IpcRenderer, MessageBoxOptions, dialog as ElectronDialog } from 'electron';
import { ElectronService as NgxElectronService } from 'ngx-electron';
import { of } from 'rxjs';
import Swal, { SweetAlertOptions } from 'sweetalert2';

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

    if (this.isElectronApp()) {
      this.send('showMessageBox', options);
    } else {
      Swal.fire({
        title: options.title,
        text: options.message
      });
    }
  
  }

  // showErrorBox(title: string, content: string): void {
  //   let dialog = this.electronService.remote.dialog;
  //   dialog.showErrorBox(title, content);
  // }
}
