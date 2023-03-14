import { Injectable } from '@angular/core';
import { map, switchMap } from 'rxjs/operators';
import { from, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { HttpService } from './http.service';
import { Auth } from '../models/Auth';
import { User } from '../models/User';
import { StorageService } from './storage.service';
@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  apiBaseUrl = environment.apiBaseUrl;

  constructor(
    private http: HttpService,
    private storage: StorageService
  ) { }

  login(credentials: { email: string; password: string }): Observable<any> {
    return this.http.post('login', credentials).pipe(
      map((data: any) => data),
      switchMap((data: Auth) => {

        this.storage.set('user', JSON.stringify(data.user));
        this.storage.set('configuration', JSON.stringify(data.configuration));
        this.storage.set('permissions', JSON.stringify(data.permissions));
        this.storage.set('token', data.token);

        return from(Promise.resolve('Success'));
      }),
    );
  }

  logout(): Observable<any> {
    return this.http.post('logout').pipe(
      map((_data: any) => {
      }),
      switchMap((_data) => {
        this.storage.clear();
        return from(Promise.resolve('Success'));
      })
    );
  }

  async getToken(): Promise<string>{
    let token = String(this.storage.get('user'));
    return token;
  }

  async getUser(): Promise<User> {
    let user!: User;
    let stringUser = String(this.storage.get('user'));
    user = JSON.parse(stringUser);

    return user;
  }


  async getUserPermissions(): Promise<string[]> {

    let permissions: string[] = [];
    let stringPermissions = String(this.storage.get('permissions'));

    permissions = JSON.parse(stringPermissions);
    return permissions;
  }

  passwordResetRequest(body: { email: string }): Observable<any> {
    return this.http.post('password/email', body);
  }
}