import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { catchError, exhaustMap, map, of, switchMap } from 'rxjs';
import { UserService } from "../../service/user.service";
import { showalert } from "../common/App.Action";
import { UserInfo } from "../model/user";
import { beginLogin, getusers, getuserssuccess } from "./user.actions";



@Injectable()
export class UserEffect {
    constructor(private action$: Actions, private service: UserService, private route: Router) {

    }
    _userlogin = createEffect(() =>
        this.action$.pipe(
            ofType(beginLogin),
            switchMap((action) => {
                return this.service.UserLogin(action.usercred).pipe(
                    switchMap((data: UserInfo[]) => {
                        if (data.length > 0) {
                            const _userdata = data[0];
                            console.log('this:',data);
                            if (_userdata.status === true) {
                                this.service.SetUserToLocalStorage(_userdata);
                                console.log(localStorage.getItem('userdata'))
                                console.log('logged')
                                this.route.navigate([''])
                                return of(showalert({ message: 'Login success.', resulttype: 'pass' }))
                            } else {
                                console.log('not log')
                                return of(showalert({ message: 'InActive User.', resulttype: 'fail' }))
                            }
                        } else {
                            console.log('failed')
                            return of(showalert({ message: 'Login Failed: Invalid credentials.', resulttype: 'fail' }))
                        }


                    }),
                    catchError((_error) => of(showalert({ message: 'Login Failed due to :.' + _error.message, resulttype: 'fail' })))
                )
            })
        )
    )

    _getallusers = createEffect(() =>
        this.action$.pipe(
            ofType(getusers),
            exhaustMap((action) => {
                return this.service.GetAllUsers().pipe(
                    map((data) => {
                        return getuserssuccess({ userlist: data })
                    }),
                    catchError((_error) => of(showalert({ message: 'Failed to fetch user list', resulttype: 'fail' })))
                )
            })
        )
    )
}