import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from 'src/app/models/User';
import { ElectronService } from 'src/app/services/electron.service';
import { UserService } from '../../../services/user.service';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss']
})
export class EditComponent implements OnInit {

  user?: User;
  form!: FormGroup;

  constructor(
    private userService: UserService,
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private router: Router,
    private electronService: ElectronService
  ) {}

  ngOnInit(): void {

    this.form = this.fb.group({
      name: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email, Validators.pattern('[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+.[a-zA-Z]{2,63}$')]],
      role_id: [2, [Validators.required]],
      branch_id: [1, [Validators.required]],
    });
    
    let id = this.route.snapshot.paramMap.get('id');

    if (id) {
      this.userService.find(id).subscribe({
        next: (user: User) => {
          this.user = user;
          this.form.controls['name'].setValue(user.name);
          this.form.controls['email'].setValue(user.email);
        }
      });
    }
  }

  update() {
    this.userService.update(this.user?.id, this.form.value)
    .subscribe({
      next: () => {
        this.electronService.alert('Actualizado', 'Se ha actualizado el usuario');
        setTimeout(() => {
          this.router.navigateByUrl('/users');
        }, 3000);
      }
    });
  }

  get name() {
    return this.form.get('name');
  }

  get email() {
    return this.form.get('email');
  }
}
