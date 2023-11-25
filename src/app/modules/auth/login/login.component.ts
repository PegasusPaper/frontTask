import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GlobalModule } from '../../../global/global.module';
import { PrimeNGConfig } from 'primeng/api';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { saveLocalStorage } from '../../../global/helpers/utils';
import { UserService } from '../../../global/services/user.service';
import { Router } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-login',
  standalone: true,
  providers: [UserService],
  imports: [CommonModule, GlobalModule, HttpClientModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  public myForm: FormGroup = this.fb.group({
    email: ['', [Validators.required, Validators.minLength(3)]],
    password: ['', [Validators.required, Validators.minLength(7)]],
  });

  message: string = '';

  constructor(
    private primengConfig: PrimeNGConfig,
    private userservices: UserService,
    private fb: FormBuilder,
    private router: Router
  ) {}

  ngOnInit() {
    this.primengConfig.ripple = true;
  }

  isValidField(field: string): boolean | null {
    return (
      this.myForm.controls[field].errors && this.myForm.controls[field].touched
    );
  }

  getFieldError(field: string): string | null {
    if (!this.myForm.controls[field]) return null;
    const errors = this.myForm.controls[field].errors || {};

    for (const key of Object.keys(errors)) {
      switch (key) {
        case 'required':
          return 'The field is required';
        case 'minlength':
          return `Min ${errors['minlength'].requiredLength} caracters.`;
        case 'email':
          return 'Valid the email please';
      }
    }
    return null;
  }

  onSubmit(): void {
    if (this.myForm.invalid) {
      this.myForm.markAllAsTouched();
      return;
    }
    this.userservices.login(this.myForm.value).subscribe({
      next: (token) => {
        saveLocalStorage('token', token);
        this.router.navigate(['/dashboard']);
      },
      error: (error) => {
        this.message = 'please valid your credentials';
      },
    });
  }
}
