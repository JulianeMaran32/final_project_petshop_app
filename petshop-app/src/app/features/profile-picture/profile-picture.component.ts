import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-profile-picture',
  standalone: true,
  imports: [],
  templateUrl: './profile-picture.component.html',
  styleUrl: './profile-picture.component.scss'
})
export class ProfilePictureComponent {

  @Input() userProfilePic!: string;
  @Input() petProfilePic!: string;

}
