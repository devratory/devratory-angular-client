import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '@ekhmoi/angular-sdk';
import { switchMap } from 'rxjs/operators';
import { ProjectService } from '../../project/state';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  loginForm = this.fb.group({
    email: ['', Validators.required],
    password: ['', Validators.required],
  });

  registerForm = this.fb.group({
    profile: this.fb.group({
      firstName: ['Jason', [Validators.required]],
      lastName: ['Mamoa', []],
      avatar: [null, []],
      speaks: [[], []],
      dob: [null, []],
      weight: [null],
      height: [null],
      gender: ['private'],
      about: [],
    }),
  });

  constructor(
    private auth: AuthService,
    private fb: FormBuilder,
    private router: Router,
    private projectService: ProjectService
  ) {}

  ngOnInit(): void {}

  login() {
    this.auth.login(this.loginForm.value).subscribe(this.goToProject);
  }

  goToProject = () =>
    this.projectService.getAll().subscribe((projects) => {
      this.router.navigate(['/project', projects?.length ? projects[0].id : null].filter((a) => !!a));
    });

  register() {
    this.auth
      .register({ ...this.registerForm.getRawValue(), ...this.loginForm.getRawValue() })
      .pipe(switchMap(() => this.auth.login(this.loginForm.value)))
      .subscribe(this.goToProject);
  }
}
