import { Component } from '@angular/core';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {


  // logout() {
  //   this.authService.logout().subscribe({
  //     next: (res) => {
  //       this.electronService.send('unmaximize-main-window');
  //       this.router.navigateByUrl('/login', { replaceUrl: true });
  //     }
  //   });
  // }
}
