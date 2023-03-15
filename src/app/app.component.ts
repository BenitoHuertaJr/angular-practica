import { Component, OnInit, ViewChild } from '@angular/core';
import { BreakpointObserver } from '@angular/cdk/layout';
import { MatSidenav } from '@angular/material/sidenav';
import { delay, filter } from 'rxjs/operators';
import { ActivatedRoute, NavigationEnd, NavigationStart, Router } from '@angular/router';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { User } from './models/User';
import { AuthenticationService } from './services/authentication.service';
import { ElectronService } from './services/electron.service';

@UntilDestroy()
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  @ViewChild(MatSidenav)
  sidenav!: MatSidenav;
  user?: User | null;

  currentUrl: string = '';

  constructor(
    private observer: BreakpointObserver,
    private router: Router,
    private authService: AuthenticationService,
    private electronService: ElectronService
  ) { }

  ngOnInit(): void {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationStart) {
        this.routerChange(event.url);
      }
    });
  }

  routerChange(url: string) {
    this.currentUrl = url;
    this.getUser();
    this.detectChanges();
  }

  getUser() {
    this.authService.getUser().then((user: User) => {
      this.user = user;
    });
  }

  ngAfterViewInit() {
    this.detectChanges();
  }

  detectChanges() {
    this.observer
      .observe(['(max-width: 800px)'])
      .pipe(delay(1), untilDestroyed(this))
      .subscribe((res) => {

        if (this.sidenav) {
          if (res.matches) {
            this.sidenav.mode = 'over';
            this.sidenav.close();
          } else {
            this.sidenav.mode = 'side';
            this.sidenav.open();
          }
        }

      });

    this.router.events
      .pipe(
        untilDestroyed(this),
        filter((e) => e instanceof NavigationEnd)
      )
      .subscribe(() => {
        if (this.sidenav && this.sidenav.mode === 'over') {
          this.sidenav.close();
        }
      });
  }

  logout(): void {
    let text = "Are you sure you want to logout?";
    if (confirm(text) == true) {

      this.authService.logout().subscribe({
        next: (res) => {
          this.user = null;
          this.electronService.send('unmaximize-main-window');
          this.router.navigateByUrl('/login', { replaceUrl: true });
        }
      });
    }
  }
}