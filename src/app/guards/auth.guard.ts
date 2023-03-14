import { Injectable } from '@angular/core';
import { CanLoad, Router, CanActivate } from '@angular/router';
import { StorageService } from '../services/storage.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanLoad, CanActivate {
  constructor(
    private router: Router,
    private storage: StorageService
  ) { }

  async canLoad(): Promise<boolean> {
    const token = await this.storage.get('token');

    if (token && token != '') {
      return true;
    } else {
      this.router.navigateByUrl('/login', { replaceUrl: true });
      return false;
    }
  }

  async canActivate(): Promise<boolean> {
    return await this.canLoad();
  }
}