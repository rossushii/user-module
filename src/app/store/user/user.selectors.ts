import { createFeatureSelector, createSelector } from "@ngrx/store";
import { UserModel } from "../model/user";
import { UserAdapter } from "./user.state";


const getUserState = createFeatureSelector<UserModel>('user');

const userselector = UserAdapter.getSelectors();
export const getuserlist = createSelector(getUserState, userselector.selectAll)

export const getUserbycode = createSelector(getUserState, (state) => state.userinfo);

export const selectUserInfo = createSelector(
  getUserState,
  (state: UserModel) => state.userinfo
);