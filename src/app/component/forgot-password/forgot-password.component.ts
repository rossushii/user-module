import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { forgotPassword } from '../../store/user/user.actions';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrl: './forgot-password.component.scss'
})
export class ForgotPasswordComponent {
  forgotPasswordForm: FormGroup;

  constructor(private fb: FormBuilder, private store: Store) {
    this.forgotPasswordForm = this.fb.group({
      username: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      mobileNumber: ['', Validators.required]
    });
  }

  onSubmit(): void {
    if (this.forgotPasswordForm.valid) {
      const formData = this.forgotPasswordForm.value;
      this.store.dispatch(forgotPassword({ formData }));
    }
  }
}