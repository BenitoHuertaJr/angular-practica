import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { ElectronService } from 'src/app/services/electron.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  loginForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private authService: AuthenticationService,
    private router: Router,
    private electronService: ElectronService
  ) {}

  ngOnInit() {
    this.loginForm = this.fb.group({
      email: ['huertajosebenito@gmail.com', [Validators.required, Validators.email, Validators.pattern('[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+.[a-zA-Z]{2,63}$')]],
      password: ['aec34a1881', [Validators.required, Validators.minLength(6)]]
    });
  }

  login() {
    this.authService.login(this.loginForm.value).subscribe({
      next: (_res: any) => {
        this.electronService.send('maximize-main-window');
        this.router.navigateByUrl('/home', { replaceUrl: true });
      }
    });
  }

  presentModalForgotPassword() {
    // TODO
  }

  get email() {
    return this.loginForm.get('email');
  }

  get password() {
    return this.loginForm.get('password');
  }
}
