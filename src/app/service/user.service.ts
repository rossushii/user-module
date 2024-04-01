import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError } from 'rxjs';
import { ForgotPasswordFormData, UserCred, UserInfo, Users } from '../store/model/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) {

  }

  APIBaseUrl = 'http://localhost:3000/user'

  UserLogin(userdata: UserCred): Observable<UserInfo[]> {
    return this.http.get<UserInfo[]>(this.APIBaseUrl + '?username=' + userdata.username + '&password=' + userdata.password);
  }

  forgotPassword(formData: ForgotPasswordFormData): Observable<UserInfo[]> {
    const { username, email, mobileNumber } = formData;
    const url = `${this.APIBaseUrl}?username=${username}&email=${email}&mobilenumber=${mobileNumber}`;
    return this.http.get<UserInfo[]>(url).pipe(
      catchError(error => {
        console.error('Failed to retrieve password:', error);
        return []; // Return empty array if there's an error
      })
    );
  }

  GetAllUsers(): Observable<Users[]> {
    return this.http.get<Users[]>(this.APIBaseUrl);
  }

  SetUserToLocalStorage(userdata: UserInfo) {
    localStorage.setItem('userdata', JSON.stringify(userdata))
  }

  updateUserProfile(updatedProfile: Partial<UserInfo>): Observable<UserInfo> {
    if (updatedProfile.id === undefined) {
      throw new Error('User ID is required for updating profile');
    }
    const url = `${this.APIBaseUrl}/${updatedProfile.id}`; 
    return this.http.put<UserInfo>(url, updatedProfile as UserInfo).pipe(
      catchError(error => {
        console.error('Failed to update user profile:', error);
        throw error; 
      })
    );
  }

  Getuserdatafromstorage() {
    let _obj: UserInfo = {
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
    if (localStorage.getItem('userdata') != null) {
      let jsonstring = localStorage.getItem('userdata') as string;
      _obj = JSON.parse(jsonstring);
      return _obj;
    } else {
      return _obj;
    }

  }
}
