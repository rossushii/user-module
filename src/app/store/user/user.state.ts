import { createEntityAdapter } from "@ngrx/entity";
import { UserModel, Users } from "../model/user";

export const UserAdapter = createEntityAdapter<Users>();

export const UserState: UserModel = UserAdapter.getInitialState({
    isDuplicate: false,
    menulist:[],
    roles:[],
    userinfo:{
        id: 0,
        username: '',
        firstName: '',
        middleName:'',
        lastName: '',
        email: '',
        birthdate: '',
        interests: [], 
        status: true,
        role: ''
    }
});