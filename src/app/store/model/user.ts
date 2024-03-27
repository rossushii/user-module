import { EntityState } from "@ngrx/entity";

export interface Users {
    id: number;
    username: string;
    firstName: string;
    middleName: string | null;
    lastName: string;
    password: string;
    email: string;
    birthdate: string;
    interests: string[];
    status: boolean;
    role: string;
  }

export interface Usercred{
    username:string,
    password:string
}

export interface Userinfo{
    id: number;
    username: string;
    firstName: string;
    middleName: string | null;
    lastName: string;
    email: string;
    birthdate: string;
    interests: string[];
    status: boolean;
    role: string;
  }

export interface Roles{
    code:string,
    name:string
}

export interface Menus{
    code:string,
    name:string
}

export interface Roleaccess{
    role:string,
    menu:string
}

export interface UserModel extends EntityState<Users>{
   isDuplicate:boolean,
   menulist:Roleaccess[],
   roles:Roles[],
   userinfo:Userinfo
}