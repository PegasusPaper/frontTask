import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

import { UserService } from '../../../global/services/user.service';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from '../../../global/interfaces/user.interfaces';
import { HttpClientModule } from '@angular/common/http';
import { GlobalModule } from '../../../global/global.module';
import { Menu } from '../../../global/interfaces/menu.interface';
import { TaskService } from '../../../global/services/task.service';
import { switchMap } from 'rxjs';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  standalone: true,
  imports: [
    FormComponent,
    CommonModule,
    ReactiveFormsModule,
    HttpClientModule,
    GlobalModule,
  ],
  providers: [UserService, TaskService],
  styleUrl: './form.component.scss',
})
export class FormComponent implements OnInit {
  message: string = '';
  id: string | null = '';
  title: string = 'Create Task';
  users: User[] = [];
  status: Menu[] = [
    {
      title: 'backlog',
      value: 'backLog',
    },
    {
      title: 'in progress',
      value: 'in_progress',
    },
    {
      title: 'completed',
      value: 'completed',
    },
    {
      title: 'standby',
      value: 'stand_by',
    },
  ];

  public myForm: FormGroup = this.fb.group({
    name: ['', [Validators.required, Validators.minLength(3)]],
    status: ['', [Validators.required]],
    owner: ['', [Validators.required, Validators.minLength(7)]],
    assigned: ['', [Validators.required, Validators.minLength(7)]],
    due_date: ['', [Validators.required, Validators.minLength(3)]],
    description: ['', [Validators.required, Validators.minLength(15)]],
  });

  constructor(
    private userservices: UserService,
    private taskservices: TaskService,
    private activatedRoute: ActivatedRoute,
    private fb: FormBuilder,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.id = this.activatedRoute.snapshot.paramMap.get('id');

    this.userservices.getUsers().subscribe((user) => {
      this.users = user;
    });

    if (this.id) {
      this.taskservices.getTask(this.id).subscribe((task) => {
        if (!task) {
          this.router.navigate(['/dashboard']);
        }
        this.title = 'update task';
        this.myForm.reset(task);
      });
    }
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

  onSubmit() {
    if (this.myForm.invalid) {
      this.myForm.markAllAsTouched();
      return;
    }

    if (!this.id) {
      this.taskservices.createTask(this.myForm.value).subscribe({
        next: () => {
          this.router.navigate(['/dashboard']);
        },
        error: (error) => {
          this.message = 'please valid the fields';
        },
      });
    } else {
      this.taskservices.updateTask(this.myForm.value, this.id).subscribe({
        next: () => {
          this.router.navigate(['/dashboard']);
        },
        error: (error) => {
          this.message = 'please valid the fields';
        },
      });
    }
  }
}
