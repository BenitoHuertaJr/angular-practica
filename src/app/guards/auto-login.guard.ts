import { Injectable } from '@angular/core';
import { CanActivate, CanLoad, Router } from '@angular/router';
import { StorageService } from '../services/storage.service';

@Injectable({
  providedIn: 'root'
})
export class AutoLoginGuard implements CanLoad, CanActivate {

  constructor(
    private router: Router,
    private storage: StorageService
  ) {}

  async canLoad(): Promise<boolean> {
    const token = await this.storage.get('token');
    if (token && token != '') {
      this.router.navigateByUrl('/home', { replaceUrl: true });
      return false;
    } else {
      return true;
    }
  }

  async canActivate(): Promise<boolean> {
    return await this.canLoad();
  }
}
