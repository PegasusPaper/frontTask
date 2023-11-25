import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GlobalModule } from '../../../global/global.module';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../../../global/services/user.service';
import { HttpClientModule } from '@angular/common/http';
import { Router } from '@angular/router';
import { saveLocalStorage } from '../../../global/helpers/utils';
import { error } from 'console';

@Component({
  selector: 'app-signup',
  standalone: true,
  providers: [UserService],
  imports: [CommonModule, GlobalModule, HttpClientModule],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.scss',
})
export class SignupComponent {
  public myForm: FormGroup = this.fb.group({
    user: ['', [Validators.required, Validators.minLength(3)]],
    name: ['', [Validators.required, Validators.minLength(3)]],
    email: [
      '',
      [Validators.required, Validators.minLength(3), Validators.email],
    ],
    lastname: ['', [Validators.required, Validators.minLength(3)]],
    password: ['', [Validators.required, Validators.minLength(7)]],
  });

  constructor(
    private fb: FormBuilder,
    private userservices: UserService,
    private router: Router
  ) {}

  username: any;
  message: string = '';

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
    this.userservices.register(this.myForm.value).subscribe({
      next: (token) => {
        saveLocalStorage('token', token);
        this.router.navigate(['/auth/login']);
      },
      error: (error) => {
        this.message = 'The username or email was taken';
      },
    });
  }
}
