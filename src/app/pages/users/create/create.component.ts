import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ElectronService } from 'src/app/services/electron.service';
import { User } from '../../../models/User';
import { UserService } from '../../../services/user.service';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})
export class CreateComponent implements OnInit {

  form!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private electronService: ElectronService,
    private userService: UserService
  ) {}
  
  ngOnInit() {
    this.form = this.fb.group({
      name: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email, Validators.pattern('[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+.[a-zA-Z]{2,63}$')]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      password_confirmation: ['', [Validators.required, Validators.minLength(6)]],
      role_id: [2, [Validators.required]],
      branch_id: [1, [Validators.required]],
    });
  }

  store() {
    this.userService.create(this.form.value).subscribe({
      next: () => {
        this.electronService.alert('Creado', 'Se ha agregado un nuevo usuario');
        this.router.navigateByUrl('/users');
      }
    });
  }

  get name() {
    return this.form.get('name');
  }

  get email() {
    return this.form.get('email');
  }

  get password() {
    return this.form.get('password');
  }

  get password_confirmation() {
    return this.form.get('password_confirmation');
  }

  get role_id() {
    return this.form.get('role_id');
  }

  get branch_id() {
    return this.form.get('branch_id');
  }
}
