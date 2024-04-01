import { createAction, props } from "@ngrx/store"
import { ForgotPasswordFormData, UserCred, Users } from "../model/user"

export const BEGIN_LOGIN='[auth] begin login'
export const GET_USERS='[user] get users'
export const GET_USER_SUCC='[user] get users succ'
export const FORGOT_PASSWORD='[Forgot Password] Forgot Password'
export const FORGOT_PASSWORD_SUCCESS='[Forgot Password] Forgot Password Success'
export const FORGOT_PASSWORD_FAILURE='[Forgot Password] Forgot Password Failure'

export const beginLogin=createAction(BEGIN_LOGIN,props<{usercred:UserCred}>())
export const getusers=createAction(GET_USERS)
export const getuserssuccess=createAction(GET_USER_SUCC,props<{userlist:Users[]}>())
export const forgotPassword = createAction(FORGOT_PASSWORD, props<{ formData: ForgotPasswordFormData }>());
export const forgotPasswordSuccess = createAction(FORGOT_PASSWORD_SUCCESS);
export const forgotPasswordFailure = createAction(FORGOT_PASSWORD_FAILURE, props<{ error: string }>());


export const updateUserInterests = createAction(
    '[User] Update User Interests',
    props<{ userId: number; updatedInterests: string[] }>()
  );