import { createEntityAdapter } from "@ngrx/entity";
import { UserModel, Users } from "../model/user";

export const UserAdapter = createEntityAdapter<Users>();

export const UserState: UserModel = UserAdapter.getInitialState({
    userinfo:{
        id: 0,
      username: '',
      firstName: '',
      middleName: '',
      lastName: '',
      email: '',
      birthdate: '',
      interests: [],
      status: false,
      role: '',
      mobilenumber: '',
      dateCreated: '',
      dateUpdated: ''
    }
});
