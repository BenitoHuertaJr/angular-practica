import { Injectable } from '@angular/core';
import { CanActivate, CanLoad, Router } from '@angular/router';
import { StorageService } from '../services/storage.service';

@Injectable({
  providedIn: 'root'
})
export class IntroGuard implements CanLoad, CanActivate {

  constructor(
    private router: Router,
    private storage: StorageService
  ) {}

  async canLoad(): Promise<boolean> {
    const store = await this.storage.get('store');
    if (store && store != '') {
      return true;
    } else {
      this.router.navigateByUrl('/intro', { replaceUrl: true });
      return false;
    }
  }

  async canActivate(): Promise<boolean> {
    return await this.canLoad();
  }
}
