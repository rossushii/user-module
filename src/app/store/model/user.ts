import { EntityState } from "@ngrx/entity";

export interface Users {
    id: number;
    username: string;
    firstName: string;
    middleName: string;
    lastName: string;
    password: string;
    email: string;
    birthdate: string;
    interests: string[];
    mobilenumber: string;
    role: string;
    status: boolean;
    dateCreated: string;
    dateUpdated: string;
  }
  export interface UserCred {
    username: string;
    password: string;
  }
  export interface UserInfo {
    id: number;
    username: string;
    firstName: string;
    middleName: string;
    lastName: string;
    email: string;
    birthdate: string;
    interests: string[];
    mobilenumber: string;
    role: string;
    status: boolean;
    dateCreated: string;
    dateUpdated: string;
  }
export interface UserModel extends EntityState<Users>{
    userinfo:UserInfo
 }

 export interface ForgotPasswordFormData {
    username: string;
    email: string;
    mobileNumber: string;
  }

  export interface UserProfile {
    id: number;
    username: string;
    firstName: string;
    middleName?: string;
    lastName: string;
    email: string;
    birthdate: string;
    interests: string[];
  }