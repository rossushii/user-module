import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { UserCred } from '../../store/model/user';
import { beginLogin } from '../../store/user/user.actions';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent implements OnInit {

  constructor(private builder: FormBuilder, private store: Store, private router:Router) {

  }
  ngOnInit(): void {
   localStorage.clear();
   console.log(localStorage.getItem('userdata'))
  }

  loginform = this.builder.group({
    username: this.builder.control('', Validators.required),
    password: this.builder.control('', Validators.required)
  })

  Proceedlogin() {
    console.log('login clicked')
    if (this.loginform.valid) {
      const _obj: UserCred = {
        username: this.loginform.value.username as string,
        password: this.loginform.value.password as string
      }
      console.log('login clicked')
      console.log(_obj)
      this.store.dispatch(beginLogin({ usercred: _obj }))
    }
  }

  resetlogin() {
    this.loginform.reset();
  }
  navigateToForgotPassword() {
    this.router.navigate(['forgotpassword']);
  }
}

