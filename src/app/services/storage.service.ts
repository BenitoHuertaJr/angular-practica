import { Injectable } from '@angular/core';
import * as ElectronStore from 'electron-store';
import { ElectronService } from 'ngx-electron';

@Injectable({
  providedIn: 'root'
})
export class StorageService {
  private store!: ElectronStore;
  constructor(
    private electronService: ElectronService
  ) {
    if (window.require) {
      try {
        const storeClass = window.require("electron-store");
        this.store = new storeClass();
      } catch (e) {
        throw e;
      }
    } else {
      console.warn("electron-store was not loaded");
    }
  }

  get(key: string): any {

    let value: any = null;

    if (this.electronService.isElectronApp) {
      value = this.store.get(key);
    } else {
      value = localStorage.getItem(key);
    }

    return value;
  }

  set(key: string, value: any): void {
    if (this.electronService.isElectronApp) {
      this.store.set(key, value);
    } else {
      localStorage.setItem(key, value);
    }
  }

  remove(key: string): void {
    if (this.electronService.isElectronApp) {
      this.store.delete(key);
    } else {
      localStorage.removeItem(key);
    }
  }

  clear(): void {
    if (this.electronService.isElectronApp) {
      this.store.clear();
    } else {
      localStorage.clear();
    }
  }
}