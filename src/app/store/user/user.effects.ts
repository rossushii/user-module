import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { catchError, exhaustMap, map, of, switchMap } from 'rxjs';
import { UserService } from "../../service/user.service";
import { showalert } from "../common/App.Action";
import { Userinfo } from "../model/user";
import { beginLogin, duplicateUserSuccess, fetchmenu, getroles, getrolesuccess, getuserbycode, getuserbycodesuccess, getusers, getuserssuccess, updateuserrole } from "./user.actions";


@Injectable()
export class UserEffect {
    constructor(private action$: Actions, private service: UserService, private route: Router) {

    }
    _userlogin = createEffect(() =>
        this.action$.pipe(
            ofType(beginLogin),
            switchMap((action) => {
                return this.service.UserLogin(action.usercred).pipe(
                    switchMap((data: Userinfo[]) => {
                        if (data.length > 0) {
                            const _userdata = data[0];
                            console.log('this:',data);
                            if (_userdata.status === true) {
                                this.service.SetUserToLoaclStorage(_userdata);
                                console.log(localStorage.getItem('userdata'))
                                console.log('logged')
                                this.route.navigate([''])
                                return of(fetchmenu({ userrole: _userdata.role }),
                                    showalert({ message: 'Login success.', resulttype: 'pass' }))
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

    _getallRoles = createEffect(() =>
        this.action$.pipe(
            ofType(getroles),
            exhaustMap((action) => {
                return this.service.GetAllRoles().pipe(
                    map((data) => {
                        return getrolesuccess({ rolelist: data })
                    }),
                    catchError((_error) => of(showalert({ message: 'Failed to fetch role list', resulttype: 'fail' })))
                )
            })
        )
    )


    _getuserbycode = createEffect(() =>
        this.action$.pipe(
            ofType(getuserbycode),
            switchMap((action) => {
                return this.service.Duplicateusername(action.username).pipe(
                    switchMap((data) => {
                        if (data.length > 0) {
                            return of(getuserbycodesuccess({ userinfo: data[0] }))
                        } else {
                            return of(duplicateUserSuccess({ isduplicate: false }))
                        }

                    }),
                    catchError((_error) => of(showalert({ message: 'get userbycode Failed due to :.' + _error.message, resulttype: 'fail' })))
                )
            })
        )
    )

    _assignrole = createEffect(() =>
        this.action$.pipe(
            ofType(updateuserrole),
            switchMap((action) => {
                return this.service.UpdateUser(action.userid,action.userrole).pipe(
                    switchMap(() => {
                        return of(getusers(),showalert({ message: 'Updated successfully',resulttype:'pass' }))
                    }),
                    catchError((_error) => of(showalert({ message: 'get userbycode Failed due to :.' + _error.message, resulttype: 'fail' })))
                )
            })
        )
    )

}