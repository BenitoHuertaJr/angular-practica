import { Injectable } from '@angular/core';
import { BrowserWindow, IpcRenderer, MessageBoxOptions, dialog as ElectronDialog } from 'electron';
import { ElectronService as NgxElectronService } from 'ngx-electron';
import { of, Observable, from } from 'rxjs';
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

  async confirm(title: string, message: string): Promise<boolean> {

    let confirmation: boolean = false;

    if (this.isElectronApp()) {

      let alertConfirm = await confirm(`${title}\n${message}`);

      if (alertConfirm == true) {
         confirmation = true;
      }
    } else {

      await Swal.fire({
        title: title,
        text: message,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Si',
        cancelButtonText: 'Cancelar'
      }).then((result) => {
        if (result.isConfirmed) {
          confirmation = true;
        }
      });
    }

    return confirmation;
  }

  // showErrorBox(title: string, content: string): void {
  //   let dialog = this.electronService.remote.dialog;
  //   dialog.showErrorBox(title, content);
  // }
}
