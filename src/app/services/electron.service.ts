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

  async confirm(title: string, message: string): Promise<boolean> {

    let confirmation: boolean = false;

    if (this.isElectronApp()) {

      return new Promise(resolve => {
        this.send('showConfirmBox', { title, message, buttons: ['Si', 'No'] });
        this.on('showConfirmBoxResponse', (_event: any, result: any) => {
          resolve(result);
        });
      });

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

  alert(title: string, message: string): void {
    if (this.isElectronApp()) {

      this.send('showMessageBox', {
        title,
        message
      });

    } else {
      Swal.fire({
        title: title,
        text: message,
        icon: 'info',
        showCancelButton: false,
        confirmButtonText: 'Ok',
      });
    }
  }

  error(message: string): void {
    if (this.isElectronApp()) {
      this.send('showMessageBox', {
        title: '¡Ups! Algo salió mal',
        message,
        type: 'error'
      });
    } else {
      Swal.fire({
        title: '¡Oops! Algo salió mal',
        text: message,
        icon: 'error',
        showCancelButton: false,
        confirmButtonText: 'Ok',
      });
    }
  }
}
