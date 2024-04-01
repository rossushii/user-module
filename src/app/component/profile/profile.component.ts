import { Component, OnInit } from '@angular/core';
import { UserService } from '../../service/user.service';
import { UserInfo } from '../../store/model/user';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss'
})
export class ProfileComponent implements OnInit{
  userProfile: UserInfo | null = null; // Initialize userProfile as null
  editMode: boolean = false;
  editedInterests: string[] = [];
  newInterest: string = '';
  constructor(private userService: UserService) {}

  ngOnInit(): void {
    // Fetch user data from the service (assuming you have a method to get user data)
    this.userProfile = this.userService.Getuserdatafromstorage(); // Implement this method in your UserService
  }

  editProfile(): void {
    this.editMode = true;
    console.log(this.editMode);
    if (this.userProfile !== null) {
        this.editedInterests = [...this.userProfile.interests]; // Copy interests to editedInterests
    } else {
        console.error('User profile is null');
    }
}
  addInterest(): void {
    if (this.newInterest.trim() !== '') {
      this.editedInterests.push(this.newInterest.trim());
      console.log(this.userProfile)
      this.newInterest = ''; // Clear the input field after adding interest
    }
  }

  saveProfile(): void {
    // Send updated profile data to the server
    const updatedProfile = { ...this.userProfile, interests: this.editedInterests };
    this.userService.updateUserProfile(updatedProfile).subscribe(
      (data: UserInfo) => {
        // Update userProfile with the response data
        if (data) {
          this.userProfile = data;
          this.editMode = false;
          this.userService.SetUserToLocalStorage(data)
        }
      },
      (error) => {
        console.error('Error updating user profile:', error);
      }
    );
  }
}
