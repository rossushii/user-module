import { Component, OnInit } from '@angular/core';
import { UserService } from '../../service/user.service';
import { UserInfo } from '../../store/model/user';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss'
})
export class ProfileComponent implements OnInit{
  userProfile: UserInfo = {
    id: 0,
    username: '',
    firstName: '',
    middleName: '',
    lastName: '',
    email: '',
    birthdate: '',
    interests: [],
    mobilenumber: '',
    role: '',
    status: false,
    dateCreated: '',
    dateUpdated: ''
  }; 
  editMode = false;
  editedInterests: string[] = [];
  newInterest = '';

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.userProfile = this.userService.Getuserdatafromstorage() || {};
    console.log(this.userProfile)
  }

  toggleEditMode(): void {
    this.editMode = !this.editMode;
    if (this.editMode && this.editedInterests.length === 0) {
      // If edit mode is toggled on for the first time and editedInterests is empty,
      // initialize editedInterests with the existing interests
      this.editedInterests = [...this.userProfile?.interests || []];
      this.newInterest = '';
    } else if (!this.editMode) {
      // If edit mode is toggled off, reset editedInterests and newInterest
      this.editedInterests = [];
      this.newInterest = '';
    }
  }
  cancelEdit(): void {
    console.log(this.editedInterests)
    this.editMode = false;
  }

  addInterest(): void {
    if (this.newInterest.trim() !== '') {
      this.editedInterests.push(this.newInterest.trim());
      this.newInterest = '';
    }
  }

  saveProfile(): void {
    // Check if new interests have been added
    if (this.newInterest.trim() !== '') {
      this.editedInterests.push(this.newInterest.trim());
      this.newInterest = ''; // Clear the new interest input
    }
  
    // Remove the time portion from the birthdate
    if (this.userProfile.birthdate) {
      const birthdateDate = new Date(this.userProfile.birthdate);
      this.userProfile.birthdate = birthdateDate.toISOString().split('T')[0];
    }
  
    // Update profile data only if new interests were added
    if (this.editedInterests.length > 0) {
      const updatedProfile = { ...this.userProfile, interests: this.editedInterests };
      // Send updated profile data to the server
      this.userService.updateUserProfile(updatedProfile).subscribe(
        (data: UserInfo) => {
          if (data) {
            this.userProfile = data;
            this.editMode = false;
            this.userService.SetUserToLocalStorage(data);
            console.log(localStorage.getItem('userdata'));
          }
        },
        (error) => {
          console.error('Error updating user profile:', error);
        }
      );
    } else {
      // No new interests were added, simply exit edit mode
      this.editMode = false;
    }
  }
}